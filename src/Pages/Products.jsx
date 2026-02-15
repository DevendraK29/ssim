import { useEffect, useState } from "react";
import "../styles/Products.css";

function Products() {
  // These will come from DB later
  const [categories, setCategories] = useState([]);   // { id, name }
  const [products, setProducts] = useState([]);       // { id, name, category_id, category_name, price, qty, supplier_name }
  
  // Form state (DB fields)
  const [form, setForm] = useState({
    name: "",
    category_id: "",
    price: "",
    qty: "",
    supplier_name: "",
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // 🔹 Fetch categories + products from backend (later replace URLs)
  useEffect(() => {
    // TODO: Replace with real API calls
    // fetch("/api/categories").then(res => res.json()).then(data => setCategories(data));
    // fetch("/api/products").then(res => res.json()).then(data => setProducts(data));

    // TEMP demo data
    const demoCategories = [
      { id: 1, name: "Books" },
      { id: 2, name: "Writing" },
      { id: 3, name: "Art" },
      { id: 4, name: "Office" },
    ];

    const demoProducts = [
      { id: 1, name: "Notebook", category_id: 1, category_name: "Books", price: 50, qty: 100, supplier_name: "ABC Traders" },
      { id: 2, name: "Pen", category_id: 2, category_name: "Writing", price: 10, qty: 300, supplier_name: "XYZ Stationers" },
    ];

    setCategories(demoCategories);
    setProducts(demoProducts);

    if (demoCategories.length > 0) {
      setForm((f) => ({ ...f, category_id: demoCategories[0].id }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add product (later: POST to backend)
  const addProduct = () => {
    if (!form.name || !form.category_id || !form.price || !form.qty || !form.supplier_name) {
      alert("Fill all fields");
      return;
    }

    const selectedCategory = categories.find(c => c.id === Number(form.category_id));

    const newProduct = {
      id: Date.now(), // DB will generate this later
      name: form.name,
      category_id: Number(form.category_id),
      category_name: selectedCategory ? selectedCategory.name : "",
      price: Number(form.price),
      qty: Number(form.qty),
      supplier_name: form.supplier_name,
    };

    // Later replace with API call, then refetch
    setProducts([...products, newProduct]);

    setForm({
      name: "",
      category_id: categories.length ? categories[0].id : "",
      price: "",
      qty: "",
      supplier_name: "",
    });
  };

  // 🔹 Delete product (later: DELETE API call)
  const deleteProduct = (id) => {
    // Later: call backend, then refetch
    setProducts(products.filter((p) => p.id !== id));
  };

  // Sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const getArrow = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="products-page">
      <h2>Products</h2>

      {/* Add Product */}
      <div className="form-box">
        <h3>Add Product</h3>

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        {/* Category from DB */}
        <select name="category_id" value={form.category_id} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          name="price"
          type="number"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="qty"
          type="number"
          placeholder="Quantity"
          value={form.qty}
          onChange={handleChange}
        />

        <input
          name="supplier_name"
          placeholder="Supplier"
          value={form.supplier_name}
          onChange={handleChange}
        />

        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* Product List */}
      <div className="table-box">
        <h3>Product List</h3>
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort("name")}>Name{getArrow("name")}</th>
              <th onClick={() => requestSort("category_name")}>Category{getArrow("category_name")}</th>
              <th onClick={() => requestSort("price")}>Price{getArrow("price")}</th>
              <th onClick={() => requestSort("qty")}>Qty{getArrow("qty")}</th>
              <th>Supplier</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category_name}</td>
                <td>₹{p.price}</td>
                <td>{p.qty}</td>
                <td>{p.supplier_name}</td>
                <td>
                  <button className="delete" onClick={() => deleteProduct(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;

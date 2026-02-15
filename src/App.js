import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Products from './Pages/Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

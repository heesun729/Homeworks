import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Cart from './components/Cart';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Products />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    fetchProducts,
    selectFilteredProducts,
    setCategory,
} from '../features/products/productsSlice';
import { AppDispatch } from '../app/store';

function Products() {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectFilteredProducts);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleCategoryChange = (category: string) => {
        dispatch(setCategory(category));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center my-8">Products</h1>
            <div className="flex justify-center space-x-8 mb-10">
                <button
                    onClick={() => handleCategoryChange('all')}
                    className="flex-1 border-2 border-stone-500 hover:bg-stone-500 hover:text-white text-stone-500 font-bold py-2 rounded"
                >
                    모두
                </button>
                <button
                    onClick={() => handleCategoryChange('electronics')}
                    className="flex-1 border-2 border-stone-500 hover:bg-stone-500 hover:text-white text-stone-500 font-bold py-2 rounded"
                >
                    전자기기
                </button>
                <button
                    onClick={() => handleCategoryChange('jewelery')}
                    className="flex-1 border-2 border-stone-500 hover:bg-stone-500 hover:text-white text-stone-500 font-bold py-2 rounded"
                >
                    쥬얼리
                </button>
                <button
                    onClick={() => handleCategoryChange("men's clothing")}
                    className="flex-1 border-2 border-stone-500 hover:bg-stone-500 hover:text-white text-stone-500 font-bold py-2 rounded"
                >
                    남성의류
                </button>
                <button
                    onClick={() => handleCategoryChange("women's clothing")}
                    className="flex-1 border-2 border-stone-500 hover:bg-stone-500 hover:text-white text-stone-500 font-bold py-2 rounded"
                >
                    여성의류
                </button>
            </div>
            <div className="mb-4 text-base text-stone-500">Showing: {products.length} items</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className="flex flex-col items-center border p-4 rounded-lg shadow-lg"
                    >
                        <div
                            key={product.id}
                            className="flex flex-col items-center border p-4 rounded-lg shadow-lg"
                        >
                            <div className="h-56 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full object-cover object-center "
                                />
                            </div>
                            <div className="p-4 flex-1 w-full">
                                <h2 className="text-lg text-stone-800 font-bold text-center truncate">
                                    {product.title}
                                </h2>
                                <p className="text-gray-700 text-center">
                                    ${product.price.toFixed(2)}
                                </p>
                                <button className="mt-4 bg-stone-200 hover:bg-stone-300 py-2 px-4 rounded w-full">
                                    장바구니에 담기
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Products;

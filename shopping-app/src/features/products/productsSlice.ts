import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductsState {
    products: Product[];
    selectedCategory: string;
}

const initialState: ProductsState = {
    products: [],
    selectedCategory: 'all',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export const { setCategory } = productsSlice.actions;

export const selectFilteredProducts = (state: RootState) =>
    state.products.products.filter((product) => {
        return state.products.selectedCategory === 'all'
            ? true
            : product.category === state.products.selectedCategory;
    });

export const selectCategory = (state: RootState) => state.products.selectedCategory;

export default productsSlice.reducer;

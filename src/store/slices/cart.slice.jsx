import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';


export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
      setCart : (state, action) => {
        return action.payload
      }
    }
})

export const cartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        
        .finally(() => dispatch(setIsLoading(false)));
}


export const createCartThunk = (products) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/cart",products, getConfig())
    .then(() => dispatch(cartThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const checkoutCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;

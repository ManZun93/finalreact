import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from "axios"
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload
    }
  }
})

export const getProductsThunk = () => dispatch => {
  dispatch(setIsLoading(true));
  axios.get("https://e-commerce-api.academlo.tech/api/v1/products")
    .then(res => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)))
}

export const filterProductsThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}





export const filterNameProductThunk = (inputSearch) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${inputSearch}`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
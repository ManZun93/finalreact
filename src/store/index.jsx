import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import  productsSlice  from './slices/products.slice'

export default configureStore({
    reducer: {
      products : productsSlice,
      isLoading: isLoadingSlice,
    }
})

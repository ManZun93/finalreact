import { configureStore } from '@reduxjs/toolkit'
import isLoadingSlice from './slices/isLoading.slice'
import  productsSlice  from './slices/products.slice'
import  purchasesSlice  from './slices/purchases.slice'

export default configureStore({
    reducer: {
      products : productsSlice,
      isLoading: isLoadingSlice,
      purchases: purchasesSlice
    }
})

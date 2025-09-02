import { createSlice } from "@reduxjs/toolkit"


// Helper function to find item index in cart
const findItemIndex  = (cartItems,product) =>{
    return cartItems.findIndex((item:any) => item.id === product.id && JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes))
}



const initialState = {
    cartItems:[],
    totalAmount:0,
    totalQuantity:0,
    loading:false,
    error:null
}


export const cartSlice = createSlice({

    name:"cart",
    initialState,
    reducers:{
        
    }


})

export const {increment} = cartSlice.actions

export default cartSlice.reducer
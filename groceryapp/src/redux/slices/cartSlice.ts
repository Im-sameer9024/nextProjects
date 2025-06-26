import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartItems:{},
    totalAmount:0,
    totalQuantity:0
}


export const cartSlice = createSlice({

    name:"cart",
    initialState,
    reducers:{
        increment:(state) =>{
            state.totalAmount +=1
        }
    }


})

export const {increment} = cartSlice.actions

export default cartSlice.reducer
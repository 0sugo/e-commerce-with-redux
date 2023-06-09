import { createSlice ,createAsyncThunk}  from "@reduxjs/toolkit";
import cartItems from '../../cartItems';
import axios from "axios";
  
const initialState ={
    cartItems:[],
    amount:4,
    total:0,
    isLoading:true,
}
const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems',async (thunkAPI)=>{
     try {
        const response = await axios(url)
        return response.data;
     
    } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong')
   }
})
const cartSlice = createSlice({
   name:'cart',
   initialState,
   reducers:{
    clearCart:(state)=>{
        state.cartItems=[];
       },
    removeItems:(state,action)=>{
        console.log(action)
        const itemId = action.payload;
        state.cartItems = cartItems.filter((item)=>
            item.id!==itemId
        )
    }, 
    increase :(state,{payload})=>{
        const cartItem = state.cartItems.find((item)=>
            item.id === payload.id)
            cartItem.amount=cartItem.amount +1
    
    },
    decrease :(state,{payload})=>{
        const cartItem = state.cartItems.find((item)=>
            item.id === payload.id)
            cartItem.amount=cartItem.amount -1
    
    },
    calculateTotals: (state) => {
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
          amount += item.amount;
          total += item.amount * item.price;
        });
        state.amount = amount;
        state.total = total;
      },
},
extraReducers:{
    [getCartItems.pending]:(state)=>{
        state.isLoading=true;
    },
    [getCartItems.fulfilled]:(state,action)=>{
        state.cartItems=action.payload;
        state.isLoading=false;
    },
    [getCartItems.rejected]:(state,action)=>{
        state.isLoading=false;
    },
}
});
export const{clearCart , removeItems ,increase ,decrease , calculateTotals} = cartSlice.actions
export  default cartSlice.reducer;
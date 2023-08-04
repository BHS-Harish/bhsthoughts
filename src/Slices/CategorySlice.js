import { createSlice } from "@reduxjs/toolkit";
const CategorySlice=createSlice({
    name:"Category",
    initialState:{
        categories:[]
    },
    reducers:{
        updateCategories(state,action){
            return{
                ...state,
                categories:action.payload
            }
        }
    }
})
export const {updateCategories}=CategorySlice.actions;
export default CategorySlice.reducer
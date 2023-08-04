import {createSlice} from '@reduxjs/toolkit';
const BlogSlice=createSlice({
    name:"Blogs",
    initialState:{
        blogs:[],
        blogsByCategory:[]
    },
    reducers:{
        updateBlogs(state,action){
            return{
                ...state,
                blogs:action.payload
            }
        },
        updateBlogsByCategory(state,action){
            return{
                ...state,
                blogsByCategory:action.payload
            }
        }
    }
})
export const{updateBlogs,updateBlogsByCategory}=BlogSlice.actions;
export default BlogSlice.reducer;
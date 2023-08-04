import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { updateBlogs ,updateBlogsByCategory} from '../Slices/BlogSlice';
import underscore from 'underscore';
export const getBlogs = async (dispatch) => {
    try {
        const q = query(collection(db, "blogs"))
        const blogs = await getDocs(q);
        if (blogs.docs.length !== 0) {
            var blogPosts = []
            blogs.forEach((doc) => {
                blogPosts.push(doc.data())
            })
            var result=underscore.sortBy(blogPosts,'publishedDate')
            var categories=result.map((blog)=>{
                return blog.category
            })
            categories=Array.from(new Set(categories))
            var blogsByCategory={}
            categories.forEach((blogCategory)=>[
                blogsByCategory={...blogsByCategory,[blogCategory]:result.filter((blog)=>{
                    return blog.category===blogCategory
                })}
            ])
            dispatch(updateBlogs(result))
            dispatch(updateBlogsByCategory(blogsByCategory))
        }
    } catch (error) {
        console.log(error)
    }
}
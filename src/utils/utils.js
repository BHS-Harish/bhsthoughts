import { collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { updateBlogs, updateBlogsByCategory } from '../Slices/BlogSlice';
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
            var result = underscore.sortBy(blogPosts, 'publishedDate')
            var categories = result.map((blog) => {
                return blog.category
            })
            categories = Array.from(new Set(categories))
            var blogsByCategory = {}
            categories.forEach((blogCategory) => [
                blogsByCategory = {
                    ...blogsByCategory, [blogCategory]: result.filter((blog) => {
                        return blog.category === blogCategory
                    })
                }
            ])
            dispatch(updateBlogs(result))
            dispatch(updateBlogsByCategory(blogsByCategory))
        }
    } catch (error) {
        console.log(error)
    }
}

export const addComment = async (blogPath, comment, dispatch) => {
    try {
        const q = query(collection(db, "blogs"), where("blogPath", "==", blogPath))
        const result = await getDocs(q)
        var docRef = ""
        var blog = {}
        var comments = []
        if (result.docs.length !== 0) {
            result.forEach((doc) => {
                docRef = doc.ref.id
                blog = doc.data()
                comments = blog.comments || []
            })
            comments.unshift(comment)
            blog = { ...blog, comments: comments }
            const ref = doc(db, "blogs", docRef);
            await updateDoc(ref, {
                comments: comments
            }).then(() => {
                getBlogs(dispatch)
                return true
            })
        }
    } catch (error) {
        return false
    }
}

export const deleteComment = async (blogPath, comments, dispatch) => {
    try {
        const q = query(collection(db, "blogs"), where("blogPath", "==", blogPath))
        const result = await getDocs(q)
        var docRef = ""
        if (result.docs.length !== 0) {
            result.forEach((doc) => {
                docRef = doc.ref.id
            })
            const ref = doc(db, "blogs", docRef);
            await updateDoc(ref, {
                comments: comments
            }).then(() => {
                getBlogs(dispatch)
                return true
            })
        }
    } catch (error) {
        return false
    }
}

export const updateViews = async (blogPath, dispatch) => {
    try {
        const q = query(collection(db, "blogs"), where("blogPath", "==", blogPath))
        const result = await getDocs(q)
        var docRef = ""
        var blog = {}
        var views = 0
        if (result.docs.length !== 0) {
            result.forEach((doc) => {
                docRef = doc.ref.id
                blog = doc.data()
                views = blog.views || 0
            })
            views+=1
            const ref = doc(db, "blogs", docRef);
            await updateDoc(ref, {
                views: views
            }).then(() => {
                getBlogs(dispatch)
                return true
            })
        }
    } catch (error) {
        return false
    }
}
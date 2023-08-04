import {db} from '../firebaseConfig';
import {updateCategories} from '../Slices/CategorySlice';
import {getBlogs} from '../utils/utils';
import {query,collection, getDocs, addDoc,updateDoc,doc,where,deleteDoc} from 'firebase/firestore';
export const getCategories=async(dispatch)=>{
    try{
        const q=query(collection(db,"categories"))
        const categories=await getDocs(q);
        if(categories.docs.length!==0){
            categories.forEach((doc)=>{
                dispatch(updateCategories(doc.data().categoryName))
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

export const publishBlog=async(blog,dispatch)=>{
    try{
        await addDoc(collection(db,"blogs"),blog).then(()=>{
            getBlogs(dispatch)
            return true
        })
    }
    catch(err){
        console.log(err);
        return false 
    }
}
export const imgToBase64 = (file,callback) => {
    var reader = new FileReader();
    reader.onloadend = function () {
       callback(reader.result)
    };
    reader.readAsDataURL(file);
}
export const updateCategory=async(categories,dispatch)=>{
    try {
        const categoryRef=doc(db,"categories","HrHQcqUgecce8xjeEdP2");
        await updateDoc(categoryRef,{
            categoryName:categories
        }).then(()=>{
            getCategories(dispatch)
            return true
        })
    } catch (error) {
        console.log(error)
        return false
    }
}
export const deleteBlog=async(blogPath,dispatch)=>{
    try {
        const q=query(collection(db,"blogs"),where("blogPath","==",blogPath))
        const result=await getDocs(q);
        if(result.docs.length!==0){
            let docRef="";
            result.forEach((doc)=>{
                docRef=doc.ref.id;
            })
            await deleteDoc(doc(db,"blogs",docRef)).then(()=>{
                getBlogs(dispatch)
                return true
            })
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
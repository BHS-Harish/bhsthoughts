import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {useSearchParams} from 'react-router-dom'
import { Spin, Result, Button, Row, Col, Input, message } from "antd";
import { getCategories } from '../utils/adminUtils';
import { getBlogs, addComment,deleteComment,updateViews } from "../utils/utils";
import { useSelector, useDispatch } from 'react-redux';
import { AiFillHome } from 'react-icons/ai';
import { FaShareFromSquare } from 'react-icons/fa6';
const { TextArea } = Input
function Blog() {
    const [blog, setBlog] = useState();
    const blogs = useSelector((state) => state.Blogs.blogs);
    const[viewsAdded,setViewsAdded]=useState(false)
    const [comment, setComment] = useState("")
    const { blogname } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [searchParams]=useSearchParams()
    const[isAdmin,setIsAdmin]=useState(false)

    useEffect(() => {
        if (blogs.length === 0) {
            getBlogs(dispatch)
            getCategories(dispatch)
        }
        if(searchParams.get("adminpreview")?.toString()=="true")
            setIsAdmin(true)
        // eslint-disable-next-line
    }, [dispatch])
    useEffect(() => {
        setBlog((blogs.filter((value) => value.blogPath === blogname.toLowerCase()))[0])
        // eslint-disable-next-line
    }, [blogs])
    useEffect(()=>{
        if(blog&&!isAdmin&&!viewsAdded){
            updateViews(blog?.blogPath,dispatch)
            setViewsAdded(true)
        }
            
    },[blog])
    async function shareBlog() {
        const shareData = {
            title: blog.title,
            text: `Read this blog written by ${blog.author.name} on BHS Thoughts`,
            url: window.location.href,
        };
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log(err)
        };
    }
    const handleAddComment = () => {
        if (comment.trim()) {
            if (addComment(blog?.blogPath, comment, dispatch))
                message.success("Comment added")
            else
                message.error("Something went wrong")
        }
        else
            message.error("Please add comment")
    }
    const handleDeleteComment=(index)=>{
        let comments=[...blog?.comments]
        comments.splice(index,1)
        if(deleteComment(blog?.blogPath,comments,dispatch))
            message.success("Comment deleted")
        else
            message.error("Comment not deleted")
    }
    return (
        <>
            {contextHolder}
            {
                blogs.length > 0 ?
                    <>
                        {
                            blog ?
                                <Row>
                                    <Col span={20} offset={2} className="mt-4 mb-2 d-flex justify-content-end">
                                        <Button type="link" size="large" icon={<AiFillHome />} className="d-flex align-items-center" onClick={() => { navigate('/') }}>Home</Button>
                                    </Col>
                                    <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>
                                        <img src={blog?.bannerUrl} alt={blog?.title} className="border mt-3 rounded" style={{ width: "100%" }} />
                                    </Col>
                                    <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>
                                        <h1 className="my-4 calibri fw-bold txt-primary" style={{ fontSize: "40px" }}>{blog?.title}</h1>
                                    </Col>
                                    <Col className="d-flex align-items-center justify-content-end" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>
                                        <img src={blog?.author.imgUrl} alt={blog?.author.name} style={{ width: "35px", borderRadius: "50%" }} className="me-3" />
                                        <p className="fs-6 fw-bold my-0 me-2">Thoughts of : {blog?.author.name}</p>
                                    </Col>
                                    <Col span={20} offset={2} className="d-flex justify-content-center">
                                        <Button className="mt-4" size="large" type="link" icon={<FaShareFromSquare />} onClick={shareBlog}>Share with others</Button>
                                    </Col>
                                    <Col className="my-4 px-1" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>
                                        {
                                            blog.textBox && blog.textBox.map((text, index) => {
                                                return (
                                                    <p key={index} className="fs-5 font-primary my-4" style={{ wordWrap: "break-word", textAlign: "justify" }}>{text.content}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col className="d-flex flex-column align-items-center mb-5" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>
                                        {
                                            blog.images && blog.images.map((image, index) => {
                                                return (
                                                    <img src={image} alt={blog?.title + index} key={index} className="w-75 my-3 p-2 border rounded" />
                                                )
                                            })
                                        }
                                    </Col>
                                    {
                                        blog?.videoUrl && blog?.videoUrl != "" ?
                                            <Col className="mb-5 mt-3" xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>
                                                <iframe style={{ width: "100%", height: "auto", aspectRatio: "16/9" }} src={`https://youtube.com/embed/${blog?.videoUrl.substring(17)}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
                                            </Col>
                                            :
                                            ""
                                    }
                                    <Col className="border-top py-5" span={22} offset={1}>
                                        <div className="w-100">
                                            <h4 className="font-primary">Comments<span className="calibri fs-5 fw-bold"> ({blog?.comments?.length || 0})</span></h4>
                                        </div>
                                        <form className="w-100">
                                            <TextArea rows={3} placeholder="Add your comments here..." size="large" className="my-3" value={comment} onChange={(e) => {
                                                setComment(e.target.value)
                                            }} required></TextArea>
                                            <div className="d-flex justify-content-end">
                                                <Button type="primary" onClick={handleAddComment}>Comment</Button>
                                            </div>
                                        </form>
                                        <div className="mt-5">
                                            {
                                                blog?.comments && blog?.comments?.map((cmd, index) => {
                                                    return (
                                                        <div className="w-100 py-4 border-top comment-container" key={index}>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <img src="https://avatar.iran.liara.run/public" width={"40"} height={"40"} alt="avatar" />
                                                                    <h5 className="ms-4 fs-5 font-primary my-0 text-primary fw-bold">Anonymous</h5>
                                                                </div>
                                                                {
                                                                    isAdmin?
                                                                    <button className="btn btn-danger btn-sm" onClick={()=>{handleDeleteComment(index)}}>Delete</button>:
                                                                    ""
                                                                }
                                                            </div>
                                                            <p className="w-100 text-justify font-primary fs-5 mt-3">{cmd}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                :
                                <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                                    <Result status={404} title={"Content unavailable"} subTitle={"The resource you are looking is not found"} extra={<Button type="primary" onClick={() => { navigate('/') }}>Back to home</Button>} />
                                </div>
                        }
                    </>
                    :
                    <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                        <Spin size="large" />
                    </div>
            }
        </>
    )
}
export default Blog;
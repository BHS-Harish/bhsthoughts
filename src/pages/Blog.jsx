import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Spin, Result, Button, Row, Col } from "antd";
import { getCategories } from '../utils/adminUtils';
import { getBlogs } from "../utils/utils";
import { useSelector, useDispatch } from 'react-redux';
import { AiFillHome } from 'react-icons/ai';
import { FaShareFromSquare } from 'react-icons/fa6';
function Blog() {
    const [blog, setBlog] = useState();
    const blogs = useSelector((state) => state.Blogs.blogs);
    const { blogname } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (blogs.length === 0) {
            getBlogs(dispatch)
            getCategories(dispatch)
        }
        // eslint-disable-next-line
    }, [dispatch])
    useEffect(() => {
        setBlog((blogs.filter((value) => value.blogPath === blogname.toLowerCase()))[0])
        // eslint-disable-next-line
    }, [blogs])
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
    return (
        <>
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
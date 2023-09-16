import React, { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import { getCategories } from '../utils/adminUtils';
import { getBlogs } from "../utils/utils";
import BlogListView from '../components/BlogListView';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Result, Spin, Button } from "antd";
import {AiFillHome} from 'react-icons/ai';
function Blogs() {
    const blogs = useSelector((state) => state.Blogs.blogs);
    const blogsByCategory = useSelector((state) => state.Blogs.blogsByCategory);
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams?.get('category')?.toLowerCase().replace("%20"," ")
    const availableCategories = Object.keys(blogsByCategory);
    const [blogPost, setBlogPost] = useState(blogs)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    useEffect(() => {
        if (availableCategories.includes(category?.charAt(0).toUpperCase() + category?.slice(1).toLowerCase()))
            setBlogPost(blogsByCategory[(category?.charAt(0).toUpperCase() + category?.slice(1).toLowerCase())])
        else {
            if (category === "all")
                setBlogPost(blogs)
            else
                setBlogPost([])
        }
        // eslint-disable-next-line
    }, [blogs])
    useEffect(() => {
        if (blogs.length === 0) {
            console.log("Hello")
            getCategories(dispatch)
            getBlogs(dispatch)
        }
        console.log(category)
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {
                blogs.length === 0 ?
                    <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                        <Spin size="large" />
                    </div>
                    :
                    <>
                        <NavBar />
                        {
                            blogPost.length > 0 ?
                                <Row>
                                    <Col span={20} offset={2} className="mt-4 mb-4 d-flex justify-content-end">
                                        <Button type="link" size="large" icon={<AiFillHome/>} className="d-flex align-items-center" onClick={()=>{navigate('/')}}>Home</Button>
                                    </Col>
                                    <Col span={24} className="mb-3">
                                        <h3 className="font-primary text-center">Searches by ' <span>{category}</span> '</h3>
                                    </Col>
                                    <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="mb-5 d-flex justify-content-center flex-wrap">
                                        {
                                            blogPost && blogPost.map((blog, index) => {
                                                return (
                                                    <BlogListView blogData={blog} key={index} />
                                                )
                                            })
                                        }
                                    </Col>
                                </Row> :
                                <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                                    <Result status={404} title={"Content unavailable"} subTitle={"The resource you are looking is not found"} />
                                </div>
                        }
                    </>
            }

        </>
    )
}
export default Blogs;
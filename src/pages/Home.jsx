import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import ListView from "../components/ListView";
import { Row, Col, Tag, Spin } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCategories } from '../utils/adminUtils';
import { getBlogs } from '../utils/utils';
import banner from '../assets/banner.png';
import logo from '../assets/logo.png';
function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (blogs.length === 0) {
            getCategories(dispatch)
            getBlogs(dispatch)
        }
    }, [dispatch])
    const blogs = useSelector((state) => state.Blogs.blogs);
    const blogsByCategory = useSelector((state) => state.Blogs.blogsByCategory);
    const categories = Object.keys(blogsByCategory);
    return (
        <>
            {
                blogs.length > 0 && blogsByCategory && categories ?
                    <>
                        <NavBar />
                        <Row className="w-100 overflow-hidden">
                            <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="my-3 mt-5 mb-5">
                                <img className="rounded-5" src={banner} alt="banner-img" style={{ width: "100%", height: "auto" }} />
                            </Col>
                        </Row>
                        <ListView title={"Latest Blogs"} path={"/blogs?category=all"} data={blogs.slice(0, 3)} />
                        {
                            // eslint-disable-next-line
                            categories && categories.map((category, index) => {
                                if (blogsByCategory[category].length > 2)
                                    return <ListView title={category} path={`/blogs?category=${category.toLowerCase()}`} data={blogsByCategory[category].slice(0, 3)} key={index} />
                            })
                        }
                        <h1 className="font-primary text-center pb-4">Search by category</h1>
                        <Row className="w-100 overflow-hidden">
                            <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="mb-5 d-flex flex-wrap justify-content-center">
                                {
                                    categories && categories.map((cat, index) => {
                                        return (
                                            <Tag color="geekblue" style={{ fontSize: "15px" }} key={index} className="px-3 py-2 m-2 pointer" onClick={() => {
                                                navigate(`/blogs?category=${cat.toLowerCase()}`)
                                            }}>{cat}</Tag>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                        <Row className="bg-primary w-100 overflow-hidden" style={{ borderTop: "15px solid #FFEE78" }}>
                            <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 10 }} lg={{ span: 10 }} xl={{ span: 10 }}>
                                <img src={logo} alt="footer-logo" style={{ width: "200px" }} className="py-4 mx-3" />
                            </Col>
                            <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 10, offset: 4 }} lg={{ span: 10, offset: 4 }} xl={{ span: 10, offset: 4 }} className="py-5 mx-5">
                                <h6 className="txt-secondary segoe">To know who is BHS..?</h6>
                                <a href="https://balaharisankar.netlify.app" rel="noreferrer" target="_blank" className="text-white fs-5 text-decoration-none font-primary">Balaharisankar</a>
                            </Col>
                            <Col span={24}>
                                <p style={{ fontSize: "12px" }} className="text-white text-center">Copyright &copy; {new Date().getFullYear()} BHS THOUGHTS All Rights Reserved</p>
                            </Col>
                        </Row>
                    </>
                    :
                    <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                        <Spin size="large" />
                    </div>
            }
        </>

    )
}
export default Home;
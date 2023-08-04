import React, { useEffect } from "react";
import logo from '../assets/logo.png';
import { Row, Col, Avatar, Popover, Button, message, Spin } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getCategories } from '../utils/adminUtils';
import { updateLoggedOut } from '../Slices/AuthSlice';
import { getBlogs } from '../utils/utils';
import AddNewBlog from "../components/AddNewBlog";
import AdminHome from "../components/AdminHome";
import { HiLogout } from 'react-icons/hi';
function Admin() {
    const user = useSelector((state) => state.Auth.authenticatedUser)
    const blogs = useSelector((state) => state.Blogs.blogs);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (blogs.length === 0) {
            getCategories(dispatch)
            getBlogs(dispatch)
        }
    }, [dispatch])
    return (
        <>
            {
                blogs && blogs.length > 0 ?
                    <>
                        <Row>
                            <Col span={24} className="back-primary px-3 py-4 d-flex align-items-center justify-content-between">
                                <img src={logo} alt="bhs-thoughts-logo" style={{ width: "180px" }} onClick={() => { navigate('/') }} />
                                <Popover placement="bottomRight" title={user.name} content={<Button type="primary" icon={<HiLogout />} className="d-flex justify-centent-center  align-items-center" onClick={() => {
                                    dispatch(updateLoggedOut())
                                    message.success("Logout successfully")
                                    navigate('/')
                                }}>Logout</Button>}>
                                    <Avatar src={user.imgUrl} size={50} className="me-2" />
                                </Popover>
                            </Col>
                        </Row>
                        <Routes>
                            <Route path="/newblog" element={<AddNewBlog />} />
                            <Route path="/" element={<AdminHome />} />
                        </Routes>
                    </>
                    :
                    <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                        <Spin size="large" />
                    </div>
            }
        </>

    )
}
export default Admin;
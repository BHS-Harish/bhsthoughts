import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { updateCategory,deleteBlog } from '../utils/adminUtils';
import { Row, Col, Button, Table, Tag, Space, Divider, Input, message } from 'antd';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
function AdminHome() {
    const categories = useSelector((state) => state.Category.categories);
    const blogs = useSelector((state) => state.Blogs.blogs);
    const [newCategory, setNewCategory] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        let filterData=blogs.map((blog)=>{
            return {title:blog.title,category:blog.category,date:blog.publishedDate,action:blog.blogPath}
        })
        setDataSource(filterData)
    }, [blogs])
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <Tag color="geekblue">{text}</Tag>
        },
        {
            title: 'Published on',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            render: (text) => (
                <Space value="middle">
                    <a href={`/blog/${text}`} rel="noreferrer" target={"_blank"} className="text-decoration-none mr-2">
                        Preview
                    </a>
                    <Button type="link" danger  size="small" className="d-flex align-items-center justify-content-center" onClick={()=>{
                        if(deleteBlog(text,dispatch))
                            message.success("Blog deleted")
                        else
                            message.error("Blog deletion failed")
                    }}>Delete</Button>
                </Space>
            )
        }
    ]
    return (
        <>
            <Row>
                <Col span={22} offset={1} className="my-5 d-flex justify-content-end">
                    <Button type="primary" shape="round" size="large" icon={<BiSolidMessageSquareAdd />} className="d-flex align-items-center" onClick={() => {
                        navigate('/author/newblog')
                    }}>Write new blog</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="border" style={{ overflowX: "auto" }}>
                    <Table columns={columns} dataSource={dataSource} style={{ minWidth: "800px" }} rowKey={"title"}/>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="my-4 rounded border pb-4 px-3 mb-5">
                    <Divider>Available Categories</Divider>
                    <Space size={"middle"} className="d-flex flex-wrap">
                        {
                            categories.map((value, index) => {
                                return <Tag color="blue" key={index} className="mt-2" onDoubleClick={()=>{
                                    var oldArray=[...categories];
                                    oldArray.splice(index,1)
                                    updateCategory(oldArray,dispatch)
                                }}>{value}</Tag>
                            })
                        }
                    </Space>
                    <form className="mt-4 d-flex" onSubmit={(e) => {
                        e.preventDefault()
                        const newcat = newCategory.charAt(0).toUpperCase() + newCategory.slice(1).toLowerCase();
                        if (updateCategory([...categories, newcat], dispatch))
                            message.success("New category added")
                        else
                            message.error("Category adding failed")
                        setNewCategory("")

                    }}>
                        <Input type="text" size="small" placeholder="Add new category" className="me-2" onChange={(e) => {
                            setNewCategory(e.target.value)
                        }} value={newCategory} required />
                        <Button type="primary" size="small" htmlType="submit">Add category</Button>
                    </form>
                </Col>
            </Row>
        </>
    )
}
export default AdminHome;
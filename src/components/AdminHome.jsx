import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { updateCategory, deleteBlog } from '../utils/adminUtils';
import { Row, Col, Button, Table, Tag, Space, Divider, Input, message, Typography } from 'antd';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import _ from "underscore";
import { Pie } from 'react-chartjs-2'

Chart.register(CategoryScale)
function AdminHome() {
    const categories = useSelector((state) => state.Category.categories);
    const blogs = useSelector((state) => state.Blogs.blogs);
    const [newCategory, setNewCategory] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState([])
    const [totalViews, setTotalViews] = useState(0)
    const [byCategory, setByCategory] = useState({})
    const [pieChartData, setPieChartData] = useState({
        labels: ["113", "116"],
        datasets: [{
            label: 'Views by category',
            data: [80, 20],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    })
    useEffect(() => {
        setByCategory({})
        let filterData = blogs?.map((blog) => {
            return { title: blog.title, category: blog.category, date: blog.publishedDate, action: blog.blogPath, views: blog?.views ? blog.views : 0 }
        })
        setDataSource(filterData)
        setByCategory(_.groupBy(blogs, "category"))
        setTotalViews(blogs.reduce((total, obj) => obj.views + total, 0))
    }, [blogs])
    useEffect(() => {
        let res = {}
        Object.keys(byCategory)?.map((category) => {
            res = { ...res, [category.toString()]: byCategory[category].reduce((total, obj) => obj.views + total, 0) }
        })
        setPieChartData({
            labels: Object.keys(res),
            datasets: [{
                label: 'Views by category',
                data: Object?.values(res),
                hoverOffset: 4,
                backgroundColor: Object.keys(res).map((key) => {
                    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
                }),
            }],
        })
    }, [byCategory])
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
        }, {
            title: "Views",
            dataIndex: "views",
            key: "views"
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
                    <a href={`/blog/${text}?adminpreview=true`} rel="noreferrer" target={"_blank"} className="text-decoration-none mr-2">
                        Preview
                    </a>
                    <Button type="link" danger size="small" className="d-flex align-items-center justify-content-center" onClick={() => {
                        if (deleteBlog(text, dispatch))
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
                    <Table columns={columns} dataSource={dataSource} style={{ minWidth: "900px" }} rowKey={"title"} />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="my-4 rounded border pb-4 px-3 mb-5">
                    <Divider>Available Categories</Divider>
                    <Space size={"middle"} className="d-flex flex-wrap">
                        {
                            categories.map((value, index) => {
                                return <Tag color="blue" key={index} className="mt-2" onDoubleClick={() => {
                                    var oldArray = [...categories];
                                    oldArray.splice(index, 1)
                                    updateCategory(oldArray, dispatch)
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
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>
                    <Typography.Title level={3}>Total Views : {totalViews}</Typography.Title>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="my-4 rounded border py-4 px-3 mb-5 flex-column">
                    <Typography.Title level={4}>Views By Category</Typography.Title>
                    {
                        pieChartData != {} ?
                            <div style={{ width: "300px" }}>
                                <Pie data={pieChartData} />
                            </div> :
                            "No data available"
                    }
                </Col>
            </Row>
        </>
    )
}
export default AdminHome;
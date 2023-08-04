import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Row, Col, Typography, Input, Button, Select, message } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { imgToBase64,publishBlog } from '../utils/adminUtils';
import { IoIosAddCircle } from 'react-icons/io';
import { BiSolidSend, BiReset } from 'react-icons/bi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
const { Title } = Typography;
const { TextArea } = Input;
function AddNewBlog() {
    const [newBlog, setNewBlog] = useState({ textBox: [{ content: "" }], images: [] });
    const getCategory = useSelector((state) => state.Category.categories)
    const author=useSelector((state)=>state.Auth.authenticatedUser);
    const navigate = useNavigate()
    const dispatch=useDispatch()
    async function handlePublish(){
        const{name,imgUrl}=author;
        const date=new Date();
        const currentDate=date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
        const blogPath=((newBlog.title).split(" ").join("-").toLowerCase())
        if(publishBlog({...newBlog,author:{name,imgUrl},publishedDate:currentDate,blogPath:blogPath},dispatch)){
            message.success("Blog published")
            setTimeout(()=>{
                navigate('/author/');
            },1000)
        }
        else
            message.error("Blog publising failed");
    }
    return (
        <>
            <Row >
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="mt-4  mb-3 d-flex justify-content-end">
                    <Button type="link" size="large" icon={<BiReset style={{ color: "white" }} />} className="d-flex align-items-center me-3" onClick={() => {
                        navigate('/author')
                    }}>Back</Button>
                </Col>
            </Row>
            <Row>
                <Col span={22} offset={1} className="my-3">
                    <Title level={2} className="txt-primary text-center">Write new thoughts</Title>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>
                    <Input type="text" size="large" title="Blog Title" placeholder="Title" autoFocus onChange={(e) => {
                        setNewBlog({ ...newBlog, title: e.target.value })
                    }} value={newBlog.title} required />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="mt-4">
                    <Select placeholder="Select your category" style={{ width: "100%" }} size="large" options={
                        getCategory.map((value)=>{
                            return ({value,label:value})
                        })
                    } onChange={(value)=>{
                        setNewBlog({...newBlog,category:value})
                    }} />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="mt-4">
                    <input type="file" id="bannerImg" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                        imgToBase64(e.target.files[0], (res) => {
                            setNewBlog({ ...newBlog, bannerUrl: res })
                        })
                    }} />
                    <label htmlFor="bannerImg" className="btn btn-primary d-flex justify-content-center align-items-center">
                        <AiOutlineCloudUpload />
                        <span className="mx-2">Banner Image</span>
                    </label>
                    {
                        newBlog.bannerUrl ?
                            <img src={newBlog.bannerUrl} alt="banner" className="border mt-4 p-2 rounded" style={{ width: "100%", height: "auto" }} /> :
                            ""
                    }
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="mt-5 d-flex justify-content-end">
                    <Button type="primary" size="normal" shape="round" icon={<IoIosAddCircle />} className="d-flex align-items-center" onClick={() => {
                        setNewBlog({ ...newBlog, textBox: [...newBlog.textBox, { content: "" }] });
                    }}>Add TextBox</Button>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="mt-3" id="blogForm">
                    {
                        newBlog.textBox.map((value, index) => {
                            return (
                                <TextArea rows={4} placeholder="Write your thoughts here..." size="large" className="my-3" value={newBlog.textBox[index].content} key={index} onChange={(e) => {
                                    let textBoxes = newBlog.textBox;
                                    textBoxes[index].content = e.target.value
                                    setNewBlog({ ...newBlog, textBox: textBoxes })
                                }} />
                            )
                        })
                    }
                </Col>
            </Row>
            <Row >
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="mt-4 mb-5">
                    <input type="file" id="images" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => {
                        imgToBase64(e.target.files[0], (res) => {
                            setNewBlog({ ...newBlog, images: [...newBlog.images, res] })
                        })
                    }} />
                    <label htmlFor="images" className="btn btn-primary d-flex justify-content-center align-items-center">
                        <AiOutlineCloudUpload />
                        <span className="mx-2">Upload images</span>
                    </label>
                    <div className="d-flex flex-wrap align-items-center">
                        {
                            newBlog.images ?
                                newBlog.images.map((value, index) => {
                                    return (
                                        <img src={value} key={index} alt="blog-img" className="border my-3 mx-1 p-2 rounded" style={{ width: "280px", height: "auto" }} />
                                    )
                                }) :
                                ""
                        }
                    </div>
                </Col>
            </Row>
            <Row >
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="mt-4">
                    <Input type="url" size="large" title="Youtube video url" placeholder="Video Url" onChange={(e) => {
                        setNewBlog({ ...newBlog, videoUrl: e.target.value })
                    }} value={newBlog.videoUrl} />
                </Col>
            </Row>
            <Row >
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className="my-5 d-flex justify-content-end">
                    <Button type="primary" danger size="large" icon={<BiReset style={{ color: "white" }} />} className="d-flex align-items-center me-3" onClick={() => {
                        window.location.reload(true)
                    }}>Reset</Button>
                    <Button type="primary" size="large" icon={<BiSolidSend />} className="d-flex align-items-center" onClick={()=>{
                        handlePublish()
                    }}>Publish</Button>
                </Col>
            </Row>
        </>
    )
}
export default AddNewBlog;
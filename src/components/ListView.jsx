import React from 'react';
import { Row, Col } from 'antd';
import BlogListView from './BlogListView';
import { useNavigate } from 'react-router-dom';
function ListView({ title, path, data }) {
    const navigate = useNavigate()
    return (
        <>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }} className=' overflow-hidden'>
                    <Row>
                        <Col span={24} className='d-flex justify-content-between align-items-center my-3'>
                            <h1 className='font-primary my-2'>{title}</h1>
                            <h6 className='calibri fw-bold pointer my-0' onClick={() => {
                                navigate(path)
                            }}>SEE ALL</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className='mb-5 d-flex w-100 list-view-container'>
                            {
                                data&&data.map((blog,index)=>{
                                    return(
                                        <BlogListView blogData={blog} key={index}/>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default ListView;
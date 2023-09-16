import React from "react";
import { Tag } from 'antd';
import { BsCalendarDateFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
function BlogListView({ blogData }) {
    const navigate = useNavigate()
    return (
        <div className='blog-container border rounded d-flex flex-column pointer mx-3 my-3 justify-content-between' style={{ minWidth: "300px", maxWidth: "300px", height: "auto" }} onClick={() => {
            navigate(`/blog/${blogData?.blogPath}`)
        }}>
            <div className="w-100 text-center">
                <img src={blogData?.bannerUrl} alt='banner-img' style={{ width: "90%", height: "auto" }} className='border rounded mt-3 align-self-center' />
                <h4 className='my-3 mx-3 font-primary txt-primary text-start'>{blogData?.title}</h4>
            </div>
            <div className="w-100">
                <div className='d-flex align-items-center justify-content-end my-2'>
                    <img src={blogData?.author?.imgUrl} alt={blogData?.author.name} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                    <h6 className='font-primary txt-primary my-0 me-3 ms-2'>{blogData?.author.name}</h6>
                </div>
                <div className='d-flex justify-content-center align-items-center mt-2 mb-4'>
                    <Tag color='#5463FF' className='px-3'>{blogData?.category}</Tag>
                    <Tag color='#5463FF' className='d-flex align-items-center px-3'><BsCalendarDateFill className='me-1' />{blogData?.publishedDate}</Tag>
                </div>
            </div>
        </div>
    )
}
export default BlogListView;
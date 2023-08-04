import React, { useState } from "react";
import { Row, Col, Modal, Input ,message} from 'antd';
import {db} from '../firebaseConfig';
import {collection,getDocs,where,query} from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {updateLoggedIn} from '../Slices/AuthSlice';
import { BiLogInCircle } from 'react-icons/bi';
import logo from '../assets/logo.png';
function NavBar() {
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);
    const [userData, setUserData] = useState({});
    // eslint-disable-next-line
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch=useDispatch()
    const navigate=useNavigate();
    function resetData(){
        setIsOpenSignIn(false)
        setUserData({})
    }
    const loginTask=async()=>{
        const q=query(collection(db,'authors'),where('email',"==",userData.email),where('password',"==",userData.password));
        try{
            const user=await getDocs(q);
            if(user.docs.length!==0){
                user.forEach((doc)=>{
                    dispatch(updateLoggedIn(doc.data()))
                })
                message.success('Login successfully 🎉')
                setTimeout(()=>{
                    navigate('/author/')
                },1000)
            }
            else{
                message.error("User not found")
                resetData()
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <Row>
            {contextHolder}
            <Col span={24} className="back-primary px-3 py-4 d-flex align-items-center justify-content-between">
                <img src={logo} alt="bhs-thoughts-logo" style={{ width: "180px" }} onClick={()=>{navigate('/')}}/>
                <button className="back-secondary fs-5 btn-border rounded me-2" onClick={() => { setIsOpenSignIn(!isOpenSignIn) }}><BiLogInCircle className="txt-primary my-2 mx-1" /></button>
                <Modal title="Login as Author" open={isOpenSignIn} okText="Login" onCancel={() => { resetData() }} onOk={()=>{
                    if(!userData.email||!userData.password)
                        message.error("Please enter email & password")
                    else
                        loginTask()
                }}>
                    <Input size="large" type="email" placeholder="Email address" className="my-2" onChange={(e) => {
                        setUserData({ ...userData, email: (e.target.value).toLowerCase() })
                    }} value={userData.email} />
                    <Input.Password size="large" placeholder="Password" className="my-2" onChange={(e) => {
                        setUserData({ ...userData, password: e.target.value })
                    }} value={userData.password} />
                </Modal>
            </Col>
        </Row>
    )
}
export default NavBar;
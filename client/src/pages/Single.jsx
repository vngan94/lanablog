import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png"
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "moment";

const Single = () => {
    const [post, setPost] = useState({})
    const {currentUser} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const postId = location.pathname.split("/")[2]
    useEffect(()=>{
        const fetchData = async()=> {
            try {
                
                const res = await axios.get(`http://localhost:8000/api/posts/${postId}`)
                setPost(res.data)
            }
            catch(err) {
                console.log(err)
            } 
        }
        fetchData()
    },[postId])

    
    const handleDelete = async ()=> {
        // goi Api
        try {
            await axios.delete(`http://localhost:8000/api/posts/${postId}`, { withCredentials: true })
            navigate("/")
        }
        catch(err) {
            console.log(err)
        }
    }
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
      }
    return (
        <div className="single">
            <div className="content">
                <img src={post?.postImg} alt="" />
                <div className="user">
                    <img src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" alt="" />
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                        
                    </div>
                     {currentUser?.username === post.username && // k co ai login thi k co ? se loi k doc duoc username */}
                        <div className="edit">
                            <Link to={"/write/?edit=2"} state={post}><img  state src={Edit} alt="" /></Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>}
                </div>
                <h1>{post.title}</h1>
                <p>{getText(post.description)}</p>
            </div>
            <Menu cat= {post.cat}/>
        </div>
    )
}

export default Single
import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Write = () => {
    const state = useLocation().state
    const [value, setValue] = useState(state?.description||'')
    const [title, setTitle] = useState(state?.title||'')
    const [file, setFile] = useState(null)
    const [cat, setCat] = useState(state?.cat||'')

    const navigate = useNavigate()
    
   
    const handleClick = async(e) => {
        e.preventDefault()
        
       
        try {
            const res = 
            state 
            ? await axios.put(`http://localhost:8000/api/posts/${state.id}`, 
                {title, desc: value, cat,}, { withCredentials: true }) 
            : await axios.post(`http://localhost:8000/api/posts`, 
                {title, desc: value, cat,}, { withCredentials: true })
            console.log("data", res.data)
            navigate("/") 
        }
        
        catch(err) {
            console.log(err)
        }
        
    }
    return (
        <div className="add">
            <div className="content">
                <input type="text" placeholder="Title" value={title} onChange = {(e)=> setTitle(e.target.value)}/>
                <div className="editContainer">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b> Visibility: </b> Public
                    </span> 
                    
                    <input style={{ display: "none" }} type="file" id="file" name="" onChange={(e) => setFile(e.target.files[0])} />
                    <label htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                        
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" name="cat" value="art" id = "art" checked = {cat === "art"}  onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input type="radio" name="cat" value="science" id = "science" checked = {cat === "science"} onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="sience">Science</label>
                    </div>
                    
                   <div className="cat">
                        <input type="radio" name="cat" value="technology" id = "technology" checked = {cat === "technology"} onChange={(e) => setCat(e.target.value)} />
                        <label htmlFor="technology">Technology</label>
                   </div>
                    <div className="cat">
                        <input type="radio" name="cat" value="cinema" id = "cinema" checked = {cat === "cinema"} onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input type="radio" name="cat" value="design" id = "design" checked = {cat === "design"} onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input type="radio" name="cat" value="food" id = "food" checked = {cat === "food"} onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="food">Food</label>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Write
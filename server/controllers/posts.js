import {db} from "../db.js"
import jwt from "jsonwebtoken"
export const getPosts = (req,res)=> {
    
    const q = req.query.cat 
    ? "SELECT * FROM post WHERE cat = ?"
    : " SELECT * FROM post"
    db.query (q, [req.query.cat], (err, data)=> {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
export const getPost = (req,res)=> {
       const q = "call getPost(?)"
    // const q = "SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `cat`,`date` FROM user u JOIN post p ON u.id = p.userId WHERE p.id = ? "
    db.query(q, [req.params.id], (err, data) => {
        // console.log( "in", data[0][0])
        if(err) return res.status(500).json(err)
        return res.status(200).json(data[0][0])

    })
}
export const addPost = (req,res)=> {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Không đăng nhập")
    jwt.verify(token, "jwtkey", (err, userInfo)=> {
        if(err) return res.status(403).json("token ko đúng")
        const q =
      "INSERT INTO post(title, description, cat, userId) VALUES (?)";
      const values = [
        req.body.title,
        req.body.desc,
        
        req.body.cat,
        
        userInfo.id,
      ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("add successfully");
    })
    })
}
export const updatePost = (req,res)=> {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Không đăng nhập")
    jwt.verify(token, "jwtkey", (err, userInfo)=> {
        if(err) return res.status(403).json("token ko đúng")
        const q = "UPDATE post SET title = ?, description = ?, cat = ?   WHERE id = ? AND userId = ?;"
        const values = [req.body.title, req.body.desc, req.body.cat];
        db.query(q, [...values, req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can update only your post!");
            return res.json("Post has been updated!");
    })
    })
}
export const deletePost   = (req,res)=> {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Không đăng nhập")
    jwt.verify(token, "jwtkey", (err, userInfo)=> {
        if(err) return res.status(403).json("token ko đúng")
        const q = "DELETE FROM post WHERE id=? AND userId = ?"
        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post!"); // ko tra ve
            return res.json("Post has been deleted!");
    })
    })
}

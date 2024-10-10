const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4:uuidv4}=require('uuid');
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
let posts=[
    {
        id:uuidv4(),
        username:"user 1 ",
        content:"sample"
    },
    
];
//index route
app.get("/posts",(req,res)=>{
   res.render("index.ejs",{ posts });
});
//create new
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});
//create new post [to update the details]
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
//show route
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});//to show in detail
});
//update route
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
     let post=posts.find((p)=>id === p.id);
     let newContent=req.body.content;
     console.log(newContent)
     post.content=newContent;
     res.redirect("/posts");
});
//edit route
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id === p.id);
    res.render("edit.ejs",{ post });
})
//destroy route
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id != p.id);
     res.redirect("/posts");
});
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});
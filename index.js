import express from "express";
import bodyparser from "body-parser";
import methodoverride from "method-override";
const app=express();
const port =3000;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var posts=[];

app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended: true, limit: '10mb' }));
app.use(methodoverride('_method'));

app.get("/", (req,res)=>{
    res.render("index.ejs", {posts: posts});
});

app.get("/create", (req,res)=>{
    const d=new Date();
    res.render("create.ejs",{date: `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`});
});

app.get("/:id/edit", (req,res)=>{
    const postId = parseInt(req.params.id); 
    const post = posts.find(p => p.id === postId);
    res.render("edit.ejs",{post : post});
});

app.get("/:id", (req,res)=>{
    const postId = parseInt(req.params.id); 
    const post = posts.find(p => p.id === postId);  
    if (post) {
        res.render("post.ejs", { post: post });
    } else {
        res.status(404).send("Post not found"); 
    }
});

app.patch("/:id/edit/submit", (req,res)=>{
    const postId=parseInt(req.params.id);
    const {title, content}=req.body;

    const post=posts.find(p=>p.id===postId);
    if(post){
        post.title=title;
        post.content=content;
        res.redirect("/");
    }else{
        res.status(404).send("Post not found");
    }
});

app.delete("/:id", (req,res)=>{
    const postId = parseInt(req.params.id); 
    posts = posts.filter(p => p.id !== postId);
    res.redirect("/");
});

app.post("/newpost", (req,res)=>{
    const {title, date, content}=req.body;
    const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
    const newPost = {
        id: newId, 
        title,
        date,
        content
      };
      posts.push(newPost);  
      res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}.`);
});



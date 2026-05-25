import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;

const travelBlogs = [
  {
    name: "Exploring the Streets of Paris",
    description:
      "Visited the Eiffel Tower, enjoyed French cafes, and experienced the beautiful night lights of Paris."
  },
  {
    name: "Adventure in Bali",
    description:
      "Relaxed on tropical beaches, explored waterfalls, and enjoyed local Balinese culture and food."
  },
  {
    name: "A Trip Through Tokyo",
    description:
      "Experienced modern city life, anime culture, sushi restaurants, and peaceful Japanese temples."
  },
  {
    name: "Discovering Switzerland",
    description:
      "Travelled through snowy mountains, scenic train routes, and beautiful lakes across Switzerland."
  },
  {
    name: "Backpacking in Kerala",
    description:
      "Explored backwaters, houseboats, tea plantations, and traditional Kerala cuisine."
  }
];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs",{blogs :travelBlogs});
});

app.get("/create",(req,res)=>{
    res.render("create.ejs");
});

app.get("/delete",(req,res)=>{
    res.render("delete.ejs");
});

app.get("/edit",(req,res)=>{
    res.render("edit.ejs");
});

app.post("/createBlog",(req,res)=>{
    const newdata={name: req.body["name"], description : req.body["description"]};
    travelBlogs.push(newdata);
    // res.render("index.ejs",{blogs:travelBlogs});
    res.redirect("/");
});

function deleteBlog(bname){
    const idx= travelBlogs.findIndex(
        blog=> blog.name.toLowerCase()=== bname.toLowerCase()
    );

    if(idx!==-1){
        travelBlogs.splice(idx,1);
    }
}

app.post("/deleteblog",(req,res)=>{
    const blogName=req.body["name"];
    deleteBlog(blogName);
    // res.render("index.ejs",{blogs:travelBlogs});
    res.redirect("/");
});

function editBlog(bname,newdes){
    const blog= travelBlogs.find(
        blog => blog.name.toLowerCase()===bname.toLowerCase()
    );
    if(blog){
        blog.description=newdes;
    }
}

app.post("/editBlog",(req,res)=>{
    const blogName=req.body["name"];
    const newDes=req.body["description"];
    editBlog(blogName,newDes);
    // res.render("index.ejs",{blogs:travelBlogs});
    res.redirect("/");
});

app.listen(port,(req,res)=>{
    console.log(`Server is rumming on port ${port}`);
});
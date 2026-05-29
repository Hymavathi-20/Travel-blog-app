// Import required modules
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

// Configure environment variables
dotenv.config();

// Initialize express app and API key
const app=express();
const port=3000;
const API=process.env.API_KEY;

// Store sample travel blogs temporarily (without database)
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

// Middleware to access static files and form data
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// Render home page with all blogs
app.get("/",(req,res)=>{
    res.render("index.ejs",{blogs :travelBlogs});
});

// Render form page to create a new blog
app.get("/create",(req,res)=>{
    res.render("create.ejs");
});

// Render form page to delete a blog
app.get("/delete",(req,res)=>{
    res.render("delete.ejs");
});

// Render form page to edit a blog
app.get("/edit",(req,res)=>{
    res.render("edit.ejs");
});

// Add newly created blog to array
app.post("/createBlog",(req,res)=>{
    const newdata={name: req.body["name"], description : req.body["description"]};
    travelBlogs.push(newdata);
    // res.render("index.ejs",{blogs:travelBlogs});
    res.redirect("/");
});

// Delete blog using blog name
function deleteBlog(bname){
    const idx= travelBlogs.findIndex(
        blog=> blog.name.toLowerCase()=== bname.toLowerCase()
    );

    if(idx!==-1){
        travelBlogs.splice(idx,1);
    }
}

// Remove blog after form submission
app.post("/deleteblog",(req,res)=>{
    const blogName=req.body["name"];
    deleteBlog(blogName);
    // res.render("index.ejs",{blogs:travelBlogs});
    res.redirect("/");
});

// Edit blog description using blog name
function editBlog(bname,newdes){
    const blog= travelBlogs.find(
        blog => blog.name.toLowerCase()===bname.toLowerCase()
    );
    if(blog){
        blog.description=newdes;
    }
}

// Update blog after edit form submission
app.post("/editBlog",(req,res)=>{
    const blogName=req.body["name"];
    const newDes=req.body["description"];
    editBlog(blogName,newDes);
    // res.render("index.ejs",{blogs:travelBlogs});
    res.redirect("/");
});

// Generate current date details for weather card
const getdate= ()=>{
    const months=["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let today=new Date();
    let tdyday=days[today.getDay()];
    let tdydate=today.getDate();
    let mon=months[today.getMonth()];
    return {
        day:tdyday,
        date:tdydate,
        month :mon,
        year:today.getFullYear()
    };
};

// Render weather search page
app.get("/getWeather",(req,res)=>{
    res.render("weather.ejs");
})

// Fetch weather data from OpenWeatherMap API
app.post("/getWeather", async(req,res)=>{
    try{
        // Get place entered by user
        const place=req.body.place;

        // Send request to OpenWeatherMap API
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API}&units=metric`);
        const result=response.data;

        // Extract only required weather details
        const data={
            img: `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png` ,
            temp:result.main.temp,
            wind:result.wind.speed,
            des:result.weather[0].description,
            main:result.weather[0].main,
            loc:result.name,
            con:result.sys.country,
            date: getdate()
        };
        // Render weather report on frontend
        res.render("weather.ejs",{weather:data});
    }// Handle invalid city or API errors
    catch(error){
        // console.log(error);
        // Display error message to user
        res.render("weather.ejs",{errormsg :error.response.data.message });
    }
    /*
    const data={ 
        img: "https://openweathermap.org/img/wn/04d@2x.png", 
        temp: 30.24, 
        wind: 4.63, 
        des: 'overcast clouds', 
        main: 'Clouds', 
        loc: 'London',
        con: 'GB', 
        date: getdate()
    };
    // console.log(getdate());
    // console.log(data.date);
    res.render("weather.ejs",{weather:data}); 
    */
});

// Start server
app.listen(port,(req,res)=>{
    console.log(`Server is rumming on port ${port}`);
});

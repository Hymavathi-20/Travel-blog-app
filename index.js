import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// e62062d8596f51485690638ea805d536
const app=express();
const port=3000;
const API="e62062d8596f51485690638ea805d536";

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

app.get("/getWeather",(req,res)=>{
    res.render("weather.ejs");
})

app.post("/getWeather", async(req,res)=>{
    
    try{
        const place=req.body.place;
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API}&units=metric`);
        const result=response.data;
        //const imgURL=`https://openweathermap.org/img/wn/${icon}@2x.png`
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
        //console.log(data);
        res.render("weather.ejs",{weather:data});
    }catch(error){
        console.log(error);
        console.log(error.response.data.message)
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


app.listen(port,(req,res)=>{
    console.log(`Server is rumming on port ${port}`);
});

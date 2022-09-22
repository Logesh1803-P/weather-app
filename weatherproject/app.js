
const express=require("express");
const bodyparser=require("body-parser")

const https=require("https");

const app=express();
app.use(bodyparser.urlencoded({extended:true}));


app.get("/", function(req,res){
res.sendFile(__dirname+"/index.html")


})
app.post("/",function(req,res){

    const query=req.body.place;
    const appkey= "62e1c2f49402d420c6cb02e19470bb9d";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey+"";
  https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
          const weatherdata =JSON.parse(data) ;
          const temp=weatherdata.main.temp;
          const desc=weatherdata.weather[0].description;
          const icon=weatherdata.weather[0].icon;
          const icon_url=" http://openweathermap.org/img/wn/"+icon+"@2x.png";
          res.write("<h1>the current temperature in London is :"+temp+"deg<h1>")
          res.write("<h1>the current weather description is :"+desc+"</h1>")
          res.write("<img src="+icon_url+">")
          res.send();



   
        })  
    })




   
})







app.listen(3000,function(){
    console.log("started");
})

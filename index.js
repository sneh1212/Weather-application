// jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname+"/index.html");



});
app.post("/",function(req,res)
{

   const query=req.body.cityname;
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=0f18459451bea5d76e591ba5314299d2";

  https.get(url, function (response) {

    response.on("data",function(data)
    {
      const weather_report=JSON.parse(data);
      const imgUrl="http://openweathermap.org/img/wn/"+weather_report.weather[0].icon+"@2x.png";
      res.write("<b>"+"Temp in "+query+""+weather_report.main.temp+"</b>");
      res.write("<h1> Wether in"+weather_report.weather[0].description+"</h1>");
      res.write("<img src="+imgUrl+">");
      res.send();
    })

  })
}
);


app.listen(5000, function() {
  console.log("Server is running on 5000 port");
});

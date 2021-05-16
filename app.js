const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
var items=[];
app.get("/", function(req, res){
    var today = new Date();
    var currentDay = today.getDay();
    console.log(today);
    var day="";
    var options ={
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    };
     day = today.toLocaleDateString("en-US", options);
    res.render("list" , {kindOfDay:day , newListItems:items});
});

app.post("/", function(req, res)
{
    var item = req.body.NewList;
    items.push(item);
    res.redirect("/");
})

app.listen(3000 , function()
{
   console.log("3000 is running");
})
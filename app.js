const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
var items=[];
let workitems=[];
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
    res.render("list" , {listTitle:day , newListItems:items});
});

app.post("/", function(req, res)
{
    let item = req.body.NewList;
    console.log(req.body.list);

    if(req.body.list === "Work")
    {
        workitems.push(item);
        res.redirect("/work");
    }
    else
    {
        items.push(item);
        res.redirect("/");
    }
    

    
});
app.get("/work", function(req,res)
{
    res.render("list", {listTitle:"Work List", newListItems:workitems,});
});

app.post("/work" , function(req,res)
{
    let item = req.body.NewList;
    workitems.push(item);
    res.redirect("/work");
});
app.get("/about", function(req,res)
{
    res.render("about");
})

app.listen(3000 , function()
{
   console.log("3000 is running");
})
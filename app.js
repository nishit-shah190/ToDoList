const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
const itemsSchema =  {
    name: String
};
const Item = mongoose.model("Item" , itemsSchema);

const BuyFood = new Item ({
    name:"Buy Food"
});
const Exercise = new Item ({
    name:"Exercise"
});
const Series = new Item ({
    name:"Watch Series"
});

const defaultItems = [BuyFood , Exercise , Series];

app.get("/", function(req, res){
   let day = date.getdate();
   Item.find({}, function(err,foundItems)
   {
       if(foundItems.length===0)
       {
        Item.insertMany(defaultItems, function(err){
            if (err)
            {
                console.log("Error has occured");
            }
            else
            {
                console.log("Successful");
            }
        });
        res.redirect("/");
       }
       else
       {
        res.render("list" , {listTitle:day , newListItems:foundItems});
       }
    
   });
    
});

app.post("/", function(req, res)
{
    let Newitem = req.body.NewList;
    console.log(req.body.list);

    if(req.body.list === "Work")
    {
        workitems.push(item);
        res.redirect("/work");
    }
    else
    {
        const item = new Item ({
            name:Newitem
        });
        item.save();
            
        res.redirect("/");
    }
    

    
});

app.post("/delete", function(req,res)
{
    const checkedID = (req.body.checkedbox);
    Item.findByIdAndRemove(checkedID, function(err)
    {
        if(!err)
        {
            console.log("Successfully deleted");
            res.redirect("/");
        }
        else
        {
            console.log("Deletion failed");
        }
    })
})
app.get("/work", function(req,res)
{
    res.render("list", {listTitle:"Work List", newListItems:workitems,});
});

app.post("/work" , function(req,res)
{
    
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
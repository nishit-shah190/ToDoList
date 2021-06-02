const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
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
const ListSchema = {
    name:String,
    item: [itemsSchema]
}

const List = mongoose.model("List" , ListSchema);
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
        res.render("list" , {listTitle:"Today" ,date:day, newListItems:foundItems});
       }
    
   });
    
});

app.post("/", function(req, res)
{
    let Newitem = req.body.NewList;
    const ListName = req.body.list;
    let day = date.getdate();
   
    console.log(day , ListName );
    const item = new Item ({
        name:Newitem
    });
    console.log(req.body.list);

    if(req.body.list === "Today")
    {
        item.save();
        res.redirect("/");
    }
    else
    {
        List.findOne({name: ListName } , function(err, foundList)
        {
              foundList.item.push(item);
              foundList.save();
              res.redirect("/" + ListName);
        });
        
        item.save();
            
        
    }
    

    
});

app.post("/delete", function(req,res)
{
    const checkedID = (req.body.checkedbox);
    const listName = req.body.ListName;

    if(listName === "Today")
    {
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
    }
    else
    {
        List.findOneAndUpdate({name:listName} , {$pull: {item :{_id:checkedID}}} , function(err, foundList)
        {
            if(!err)
            {
                res.redirect("/" + listName);
            }
        })
    }
  
});
app.get("/:customListItem" , function(req,res)
{
    const customListItems= _.capitalize(req.params.customListItem);
    let day = date.getdate();

    List.findOne({name: customListItems} , function(err, foundList)
    {
        if(!err)
        {
            if(!foundList)
            {
                 const list = new List({
                    name:customListItems,
                    item: defaultItems
                });
                list.save();
                res.redirect("/" + customListItems);
            }
            else
            {
                res.render("list" , {listTitle:customListItems , date:day, newListItems:foundList.item});
            }
        }
    })
   
    
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
exports.getdate = function() 
{
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
     return day;
}
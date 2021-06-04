


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res)
{
    const FirstName = req.body.fName;
    const LastName  = req.body.lName;
    const email = req.body.email;

    var data = {

        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: FirstName,
                    LNAME: LastName
                }
            }
        ]
    };

    const jsondata = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/3fdd6d58c1";
    const options = {
        method: "POST",
        auth: "ravi1:60151986ebbb203d9b71bd76408bc14-us6"
    }
    

  const request=   https.request(url,options, function(response)
{
    if(response.statusCode ==  200)
    { 
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html"); 
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    });
});

request.write(jsondata);
request.end();

});



app.post("/failure", function(req,res)
{
    res.redirect("/");
});


// app.get("/", function(req,res)
// {
//     res.send("how ar u");
// })

app.listen(process.env.PORT || 3000, function()
{
    console.log("The server is running on port 3000");
})


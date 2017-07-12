var express=require('express');
var app=express();
var request=require('request');
var cheerio=require('cheerio');
var ejs=require('ejs');
var path=require('path');

// Routing 
var route=require('./routes/index');
app.use('/',route);

//View Engine
app.set('view engine','ejs');

//Static Function
app.use(express.static(path.join(__dirname , " public")));

app.listen(8081,function()
{
    console.log("Server is Started");
});


var express=require('express');
var router=express.Router();
var cheerio=require('cheerio');
var request=require('request');

router.get('/',function(req,res)
{ 
  res.render('index');
});
router.get('/scrap',function(req,res)
{
    url="https://en.wikipedia.org/wiki/Main_Page";
    
    request(url,function(error,response,body)
    {
        if(error)
        {
            console.log("Error :"+ error);

        }
        console.log("Status code " +response.statusCode);
        if(response.statusCode===200)
        {
            var $=cheerio.load(body);
            linkCollection($);
            var m='of';
            var isWordFound=searchForWord($,m);
            if(isWordFound)
            {
                console.log(isWordFound);
                res.send("word " + m + " is found at " + url);
            }
        }
       
    });
    function searchForWord($,word)
    {
        var bodytext=$('html>body').text();
        return(bodytext.toLowerCase().indexOf(word.toLowerCase())!==-1);
        
       
    }

    function linkCollection($)
    {   //Declaration of array to store all Relative Links
        var  allrelativelinks=[];
        // Declaration of array to store all absolute Links
        var allabsolutelinks=[];

        //Select all <a> elements with a href attribute that starts with "/"
        var relativeLinks=$("a[href^='/']");
        //This iterate over each DOM Element
        relativeLinks.each(function(){
            allrelativelinks.push($(this).attr('href'));
        });
        
        var absolutelinks=$("a[href^='http']");
        
        absolutelinks.each(function()
        {
            allabsolutelinks.push($(this).attr('href'));
        });

        console.log("Found " + allrelativelinks.length + " Relative Links");
        console.log("Found " + allabsolutelinks.length + " Absolute links");
        res.send(allrelativelinks);
       

        


    }

});

module.exports=router;

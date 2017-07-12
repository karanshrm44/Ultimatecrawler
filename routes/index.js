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
            var m='of';
            var isWordFound=searchForWord($,m);
            if(isWordFound)
            {
                console.log(isWordFound);
                console.log("word " + m + "is found at " + url);
            }
        }
       
    });
    function searchForWord($,word)
    {
        var bodytext=$('html>body').text();
        return(bodytext.toLowerCase().indexOf(word.toLowerCase())!==-1);
        
       
    }

});

module.exports=router;

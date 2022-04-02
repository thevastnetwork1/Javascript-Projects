const express= require('express');
const exp= express();
const http= require('http').Server(exp);

exp.use(express.static(__dirname + '/public'));
exp.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public' + '/stopWatch.html');
});


http.listen(8090,()=>{
    console.log('Listening to port 8090');
});
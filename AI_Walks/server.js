const express = require('express');
const exp= express();
const http = require('http').Server(exp);
const io= require('socket.io').listen(http);
const AI= require('./Q-brain');
const NeuralNetwork= new AI.NeuralNetwork();

exp.use(express.static(__dirname + '/public'));

exp.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public' + '/Walks.html');
})
    let player={};

    io.on('connection',function(socket){
        console.log('A user has joined the game');

  let x=0;
  let y=300;
let exp_val=x+20;
        player[socket.id]={
         X:x,
         Y:y,
        Expected_Val:exp_val
           
        }
        let i=0;
      /*while(i!==100){
   let exp_value= player[socket.id].Expected_Val;
   exp_value= (exp_value-exp_value)+10;

/*const NeuralNetwork= new AI.NeuralNetwork({x:player[socket.id].X,y:player[socket.id].Y,Exp_Val:1});

NeuralNetwork.setUp();
let value=NeuralNetwork.Run();

        if(Math.round(value)>0){
            player[socket.id].X+=10;
            socket.emit('Move',player[socket.id]);
        }
        i++;
    }

      */

    socket.on('check',function(distance){
       NeuralNetwork.setUP(distance.distance,distance.player_Distance);

      let outcome= NeuralNetwork.Run();
       

        console.log("\n");
      socket.emit('Movement',outcome);

    })


    })



http.listen(8080,()=>{
    console.log("Listening to port 8080");
})
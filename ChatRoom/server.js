const express= require('express');
const exp= express();
const http= require('http').Server(exp);
const io= require('socket.io').listen(http);
const path= require('path');



exp.use(express.static(path.join(__dirname ,'public') ));



io.on('connection',socket=>{
    


    console.log('A user has joined');
    


    let user=[];
    user[socket.id]={};
    let members={};          
    user[socket.id].ID=socket.id;
    let uSocket={};
    


    socket.on('joinUser',function(User){
        user[socket.id].username=User.username;
      uSocket[User.username]=socket;
        user[socket.id].room=User.dropdown; 

user.push(user);


        socket.join(user[socket.id].room);
     
    //savecode here for now


        for(let i in user ){
                if(user[i].room===user[socket.id].room){
                    members[i]=user[i];
                }
        }

        io.sockets.in(user[socket.id].room).emit('getUsers',members);
//endpoint

        io.sockets.in(user[socket.id].room).emit('introduce',user[socket.id]);
    });

 

    socket.on('sent',function(Info){
      
    
        user[socket.id].message=Info.message;

        socket.broadcast.to(user[socket.id].room).emit('notify',user[socket.id]);

    })



    socket.on('disconnect',function(){
        console.log(`User ${socket.id} has disconnected`);
        socket.broadcast.to(user[socket.id].room).emit('delete',user[socket.id]);
        delete user[socket.id];

    });

    socket.on('privateMessage',User=>{
        for(let i in user){
          
            if(User === user[i].username){
                
             
                console.log('found!!');
             
               uSocket[User].emit('ask');
            }
            else{
                
                console.log('not found');
            }
        }

    });


    socket.on('leave',function(ID){
        socket.leave(user[ID].room);
        socket.emit('redirect',user[ID]);
        socket.broadcast.to(user[ID].room).emit('removeFromList',user[ID].username);
        socket.broadcast.to(user[ID].room).emit('remove',user[ID].username);
    });



});



http.listen(8090,()=>{
    console.log('Listening at port 8090');
})

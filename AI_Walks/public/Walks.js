const gameState={score:0};


function getDistance(player,Obtacle){

let sum=0;
sum+=player.x;
sum+=player.y;
sum+=Obtacle.x;
sum+=Obtacle.y;


return Math.sqrt(sum);
}


let socket=io();
let Asteroid;
let Right=false;
let Left=false;

class GameScene extends Phaser.Scene{
constructor(){
    super({key:'GameScene'});
}

preload(){
 
    this.load.image('zuko','resources/flameSprites.png');
    this.load.image('Asteroid','resources/Asteroid.png');
}


create(){



//generating the space mines
gameState.Mines= this.physics.add.group({
    defaultKey:'Asteroid',
    maxSize:10,
    allowGravity:false
}
);
    function createMines(){
        let x= Math.random()*config.width;
          Asteroid=  gameState.Mines.get(x,0);
        
                Asteroid.setActive(true);
                Asteroid.setVisible(true);

        
    }






     const Mines= this.time.addEvent({
          delay:1000,
          callback:createMines,
          callbackScope:this,
          loop:true
      })




 
    gameState.zuko= this.physics.add.sprite(100,500,'zuko');

  

    gameState.cursors= this.input.keyboard.createCursorKeys();

    //socket events
    socket.on('Move',function(player){
        gameState.MoveRate= player.X;
            if(gameState.MoveRate>10){
               
                    gameState.MoveRate=10;
            }
      
        gameState.zuko.x+=gameState.MoveRate;
    })


    gameState.zuko.body.collideWorldBounds=true;


    this.physics.add.collider(gameState.zuko,gameState.Mines,()=>{
        gameState.zuko.destroy();
        this.add.text(300,400,"You Lose",{fontSize:'30px',fill:'#F8C471 '});
        this.scene.restart();
       gameState.score=0;
       gameState.scoreText.setText(`Score:${gameState.scoreText}`);
        socket.emit('Results');
    })

 
gameState.scoreText=   this.add.text(config.width/2,0,`Score:${gameState.score}`,{fontSize:'30px',fill:'#F8C471'});



}



update(){

     
          if(gameState.Mines){
              gameState.Mines.setVelocityY(300);
          }
  

    if(gameState.cursors.right.isDown){
        gameState.zuko.x+=20;
    }else if(gameState.cursors.left.isDown){
        gameState.zuko.x-=20;
    }else if(gameState.cursors.up.isDown){

    }
        
   
        if(gameState.Mines){
        gameState.Mines.getChildren().forEach(mine=>{
            
            const distance= getDistance({x:mine.x,y:mine.y},mine);
            const player_distance= getDistance(gameState.zuko,{x:0,y:500});
          
                if(distance>45){
                    console.log('danger');
                }
                socket.emit('check',{distance:distance,player_Distance:player_distance});
        })

        //destroying the mines after they cross the screen
        gameState.Mines.getChildren().forEach(mine=>{
            if(mine.y>config.height){
                gameState.score+=1;
                gameState.scoreText.setText(`Score:${gameState.score}`);
                    
                mine.setActive(false);
               
            }
        })
    }

    socket.on('Movement',function(outcome){
        if(outcome.State==='Right'&&outcome.Action==='Right'){
            Right=true;
            Left=false;
        }else if(outcome.State==='Left'&&outcome.Action==='Left'){
            Left=true; 
            Right=false;   
        }
    })

    if(Right){
        gameState.zuko.x+=20;
    }else if(Left){
        gameState.zuko.x-=20;
    }


}


};


const config={
    type:Phaser.AUTO,
    width:1200,
    height:800,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:0},
            debug:false
        }
    },
    scene:[GameScene]
}

const game= new Phaser.Game(config);

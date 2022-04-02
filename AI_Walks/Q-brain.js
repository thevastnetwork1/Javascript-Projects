class NeuralNetwork {

//define the Q function
Q_func(currentReward,gama,futureReward){
  let Temp= (currentReward+ (gama*futureReward))*this.lr;  
return Temp;

}



setUP(Distance,player_Distance){
this.distance=Distance;
this.player_distance=player_Distance;

this.Q_table=[];//max of 2 values which the reward will be determined based on the distnce that we get
this.lr=0.01;
this.rewards=[];//2 which will specify how the agent will act and choose the max one
this.rewards[0]=Math.random();//represent the left reward
this.rewards[1]=Math.random();//represent the right reward

let num= Math.random();
this.state= (num>0.5)?'Right':'Left';
this.action= (this.state==='Right')?'Right':'Left';
this.gama=0.9;
this.lr=0.1;

}


Run(){



    if((this.distance<this.player_distance)&&this.state==='Right'){
        this.lr-=0.001;
        //console.log(this.lr);

      let futureReward= this.rewards[1]+1;
      
      let max_value= Math.max(this.rewards[0],futureReward);

       let left= this.Q_func(this.rewards[1],this.gama,max_value);

        //calculating for the right
        let futureReward2= this.rewards[0];
        let max_value2= Math.max(this.rewards[1],futureReward2);

        let right= this.Q_func(this.rewards[0],this.gama,max_value2);

            if(left>right){
                this.state='Left';
                this.action='Left';
              
                return {State:this.state,Action:this.action};
            }else{
                let num= Math.ceil(Math.random()*2);
                this.state= (num===2)?'Right':'Left';
                this.action= (this.state==='Right')?'Right':'Left';
                return {State:this.state,Action:this.action};
            }

    }
    else if((this.distance>this.player_distance)&&this.state==='Left'){
        this.lr-=0.001;
        console.log(this.lr);

        let futureReward= this.rewards[0]+1;

        let max_value= Math.max(this.rewards[1],futureReward);

        let right= this.Q_func(this.rewards[0],this.gama,max_value);

        //calculating the left side 
        let futureReward2= this.rewards[1];

        let max_value2= Math.max(this.rewards[0],futureReward2);

        let left= this.Q_func(this.rewards[1],this.gama,max_value2);

        if(right>left){
            this.state='Right';
            this.action='Right';
           
            return {State:this.state,Action:this.action};
          
        }else{
            let num= Math.ceil(Math.random()*2);
            this.state= (num===2)?'Right':'Left';
            this.action= (this.state==='Right')?'Right':'Left';
            return{State:this.state,Action:this.action};
            
        }

    }
  

return {State:this.state,Action:this.action};

}




};

module.exports={
    NeuralNetwork:NeuralNetwork
}

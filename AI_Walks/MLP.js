class NeuralNetwork {

constructor(Coor){
    this.x=Coor.x;
    this.y=Coor.y;
    this.Expected_Value=Coor.Exp_Val;
 
}

Sigmoid(x){return 1/(1+Math.exp(-x));}

dSigmoid(x){return x*(1-x);}

Randomize(){return Math.random();}

loss(Ideal,Actual){return Ideal-Actual;}

setUp(){
let numOfInput_w=2;


this.Training=this.x;

this.Input=[];
this.H1_Neuron=[];
this.H2_Neuron=[];
this.H3_Neuron=[];
this.H4_Neuron=[];
this.Output=[];

//creating the weighted connections
this.Inputs_Weights=[];
this.Hidden1_Weights=[];//these are going to be serper ate
this.Hidden2_Weights=[];
this.Output_Weights=[];
//initializing each weights here
for(let i=0;i<numOfInput_w;i++){
    this.Inputs_Weights[i]=this.Randomize();
    this.Hidden1_Weights[i]=this.Randomize();
    this.Hidden2_Weights[i]=this.Randomize();
    this.Output_Weights[i]=this.Randomize();
}

//initializing the biases
this.Hidden1_Biases=[];
this.Hidden2_Biases=[];
this.Hidden3_Biases=[];
this.Hidden4_Biases=[];
this.Output_Biases=[];

    for(let j=0;j<1;j++){
        this.Hidden1_Biases[j]=this.Randomize();
        this.Hidden2_Biases[j]=this.Randomize();
        this.Hidden3_Biases[j]=this.Randomize();
        this.Hidden4_Biases[j]=this.Randomize();
        this.Output_Biases[j]= this.Randomize();
    }

//learning rate
this.lr=0.01;

}

Run(){
//main loop
for(let n=0;n<10000;n++){

    //forward propagation
  let acitvation=[];//array containing both H1 and H2 biases values
    for(let i=0;i<1;i++){
        for(let k=0;k<2;k++){
         acitvation[0]= this.Hidden1_Biases[i];
        acitvation[1]= this.Hidden2_Biases[i];

        acitvation[k]+= this.Inputs_Weights[k]* this.Training;
      
        }
    }

    //calculating outputs for botht H1 and H2 neurons
    for(let j=0;j<1;j++){
        this.H1_Neuron[j]= this.Sigmoid(acitvation[0]);
        this.H2_Neuron[j]= this.Sigmoid(acitvation[1]);
    }
    
//conacating the H1 and H2 neurons into a single array for better use
let H_Neurons_1=[];
    H_Neurons_1[0]= this.H1_Neuron[0];
    H_Neurons_1[1]= this.H2_Neuron[0];

    let acitvate=[];
    //calculating the H3  Neurons
    for(let j=0;j<1;j++){
        acitvate[0]= this.Hidden3_Biases[0];
        for(let k=0;k<2;k++){
            acitvate[j]+=H_Neurons_1[k]*this.Hidden1_Weights[k];  
        }
        this.H3_Neuron[j]= this.Sigmoid(acitvate[j]);
    }


    //calculating the H4 Neurons
    let activate2=[];
    for(let j=0;j<1;j++){
        activate2[0]= this.Hidden4_Biases[0];
        for(let k=0;k<2;k++){
        activate2[j]+= H_Neurons_1[k]* this.Hidden2_Weights[k];
        }
        this.H4_Neuron[j]= this.Sigmoid(activate2[j]);
    }

    //calculate the output
    let summation=this.Output_Biases[0];
 
        summation+=this.H3_Neuron[0]* this.Output_Weights[0];
        summation+= this.H4_Neuron[0]* this.Output_Weights[1];

        this.Output[0]= this.Sigmoid(summation);


//console.log(this.Output[0],this.Expected_Value);


            ///backward propagation
            //calculate the error
            let error= this.loss(this.Expected_Value,this.Output[0]);
            //calculate the overall delta for the output
            let Output_Delta= error* (this.dSigmoid(this.Output[0]));

              //calculating the 2 Hidden layers delta;
                let Hiddenlayer_2_Delta=[];
                let H2_Error=[];
                for(let j=0;j<2;j++){
                    H2_Error[j]= this.Output_Weights[j]*Output_Delta;
                
                }

                
                Hiddenlayer_2_Delta[0]= H2_Error[0]* (this.dSigmoid(this.H3_Neuron[0]));
                Hiddenlayer_2_Delta[1]= H2_Error[1]* (this.dSigmoid(this.H4_Neuron[0]));      
            
                //calculating the delta for the 1 hidden layers
                let Hidden_1_Delta=[];
                let H1_Error=[];
             
                    H1_Error[0]= Hiddenlayer_2_Delta[0]* this.Hidden1_Weights[0];
                    H1_Error[0]+=Hiddenlayer_2_Delta[1]* this.Hidden1_Weights[1];
                    H1_Error[1]= Hiddenlayer_2_Delta[0]* this.Hidden2_Weights[0];
                    H1_Error[1]+= Hiddenlayer_2_Delta[1]* this.Hidden2_Weights[1];
              
             
                    Hidden_1_Delta[0]= H1_Error[0]* (this.dSigmoid(this.H1_Neuron[0]));
                    Hidden_1_Delta[1]= H1_Error[1]* (this.dSigmoid(this.H2_Neuron[0]));
                 
 

                    //calculating the weights
                    //output weights
                  this.Output_Biases[0]= Output_Delta* this.lr;
                    this.Output_Weights[0]= Output_Delta* Hiddenlayer_2_Delta[0]*this.lr;
                    this.Output_Weights[1]= Output_Delta* Hiddenlayer_2_Delta[1]*this.lr;

                  //2 hidden layer weights
                    this.Hidden3_Biases[0]= Hiddenlayer_2_Delta[0]*this.lr;
                    this.Hidden4_Biases[0]= Hiddenlayer_2_Delta[1]*this.lr;

                    for(let j=0;j<2;j++){
                        this.Hidden1_Weights[j]= Hiddenlayer_2_Delta[0]* H_Neurons_1[j]*this.lr;
                        this.Hidden2_Weights[j]= Hiddenlayer_2_Delta[1]* H_Neurons_1[j]*this.lr;
                    }

                    //1 hidden layer or input layer weights
                    this.Hidden1_Biases[0]= Hidden_1_Delta[0]* this.lr;
                    this.Hidden2_Biases[0]= Hidden_1_Delta[1]*this.lr;

                    for(let i=0;i<2;i++){
                        this.Inputs_Weights[i]= this.Training*Hidden_1_Delta[i];
                    }
}

return this.Output[0];

}





};

/*let Coor={
    x:100,
    y:3,
    Exp_Val:1
}
const me= new NeuralNetwork(Coor);


me.setUp();
let result=me.Run();*/

module.exports={
    NeuralNetwork:NeuralNetwork
}


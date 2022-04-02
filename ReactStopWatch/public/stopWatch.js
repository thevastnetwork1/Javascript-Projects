

class Watch extends React.Component{
constructor(props){
    super(props);

    this.state={
        milliseconds:0,
        seconds:0,
        minutes:0,
        hours:0

    }

this.onStart= this.onStart.bind(this);
this.onStop= this.onStop.bind(this);
this.renderTime= this.renderTime.bind(this);
this.startReset= this.startReset.bind(this);
this.loop=true;
}

onStart(){

    if(this.loop){
        this.state.milliseconds+=1;
            if(this.state.milliseconds===60){
                this.state.seconds+=1;
                this.state.milliseconds=0;
            }
                if(this.state.seconds===60){
                    this.state.minutes+=1;
                    this.state.seconds=0;
                }
                    if(this.state.minutes===60){
                        this.state.hours+=1;
                        this.state.minutes=0;
                    }
                   document.getElementById('milliseconds').innerHTML=this.state.milliseconds;
                   document.getElementById('seconds').innerHTML=this.state.seconds;
                   document.getElementById('minutes').innerHTML=this.state.minutes;
                   document.getElementById('hours').innerHTML=this.state.hours; 

                  
    }



}
onStop(){

clearInterval(this.open);
}

renderTime(){
    this.open=setInterval(this.onStart,10);
}

onReset(){
    document.getElementById('milliseconds').innerHTML='00';
    document.getElementById('seconds').innerHTML='00';
    document.getElementById('minutes').innerHTML='00';
    document.getElementById('hours').innerHTML='00';

    this.state.milliseconds=0;
    this.state.seconds=0;
    this.state.minutes=0;
    this.state.hours=0;
}


startReset(){

    this.onReset();
}

render(){
return (
    <section>
    <button id='start' value="Start" onClick={()=>{
        this.renderTime();
        this.reset= document.getElementById('reset').style.visibility='hidden';
            }}>Start</button>

    <button id="stop" value="Stop" onClick={()=>{
        this.onStop();
     this.reset= document.getElementById('reset').style.visibility='visible';

    }}>Stop</button>
     
    <button id="reset" value="reset" onClick={this.startReset}>Reset</button>

    </section>
);
}

};

ReactDOM.render(<Watch />,document.getElementById('watch'));
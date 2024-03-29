import React,{useEffect, useState} from 'react';
import Fade from 'react-reveal/Fade';
import Jump from 'react-reveal/Jump';
import Aya from './aya.png';
import './App.css';
import Gacha from './Gacha';
import Ticket from './ticket.png';
import Table from './Table';


const App=()=>{
 
  const[cards, setCard]=useState([]);
  const[display,displayCard]=useState(false);
  const[pgno,setPgno]=useState('2');
  let[show,setShow]=useState(0);
  let[s2count, increment2]=useState(0);
  let[s3count, increment3]=useState(0);
  let[s4count, increment4]=useState(0);
  let[pullcount, incrementp]=useState(0);
  let [rate2,setRate2]=useState(0);
  let [rate3,setRate3]=useState(0);
  let [rate4,setRate4]=useState(0);
  let n2=rate2.toFixed(3);
  let n3=rate3.toFixed(3);
  let n4=rate4.toFixed(3);

  let s4_array=[];
  let s3_array=[];
  let s2_array=[];

  useEffect(()=>{
     getCards(); 

  },[pgno]);

  const clicked=e=>{
    displayCard(true);
    randomPg();
    setShow(show+=1);
    incrementp(pullcount+=1);
    
  }
  const doP4=()=>{ 
    //pick a random 4 star from the array
    let rand_index=Math.floor(Math.random()*s4_array.length);
    setCard(s4_array[rand_index]);
    if(display)increment4(s4count+=1);
  }
  const doP3=()=>{
    //pick a random 3 star from the array
    let rand_index=Math.floor(Math.random()*s3_array.length);
    setCard(s3_array[rand_index]);
    if(display)increment3(s3count+=1);
  }

  const doP2=()=>{
    //pick a random 2 star from the array
    let rand_index=Math.floor(Math.random()*s2_array.length);
    setCard(s2_array[rand_index]);
    if(display)increment2(s2count+=1);
  }

//probability func
  const probability = (n)=> {
    return !!n && Math.random() <= n;
  }

  
  const randomPg=e=>{
    const rand = 2+ Math.floor(Math.random()*58);
    console.log("pgno"+rand)
    setPgno(rand);
  }
  const getCards=async()=>{
    const response=await fetch(`https://bandori.party/api/cards/?page=${pgno}`);
    const data = await response.json();
    console.log(data.results);
    
    

    let p4 =  probability(0.03);
    let p3 =  probability(0.085);
    console.log("3star:"+p3);
    console.log("4star:"+p4);

    //loop through all 10 cards in page
    for(let i=0;i<10;i++){
       //store each rarity into their array
      if(data.results[i].i_rarity===4)s4_array.push(data.results[i]);
      if(data.results[i].i_rarity===3)s3_array.push(data.results[i]);
      if(data.results[i].i_rarity===2)s2_array.push(data.results[i]);
    }
    
    if(p4){
     if(s4_array.length>0)doP4();    
      //no 4 star so find a 3 star
     else if(s3_array.length>0)doP3();
      //no 3star so just get a 2 star
     else doP2();   
    }

    else if(p3){
      if(s3_array.length>0)doP3();
      else if(s2_array.length>0)doP2();
      else doP4();
    } 

    else{
      if(s2_array.length>0)doP2();
      else if(s3_array.length>0)doP3();
      else doP4();
    }

    setRate4(s4count/pullcount*100);
    setRate3(s3count/pullcount*100);
    setRate2(s2count/pullcount*100); 
  }
  return (
    <div className="App">
     <div className="Top">
       
       <h1>Bandori Gacha Simulator</h1>
       Are you feeling lucky? Play the gacha to find out!
       <p className="info">Actual Drop rates: 4★=3%, 3★=8.5%, 2★=88.5% </p>
     </div>
     <div className="animate">
     
     </div>
     
     
     <button onClick={clicked}>
    Play Gacha</button>

       <div>
       <Fade left>
       <img className="ticket"src={Ticket} alt=""/>
       </Fade>
       {display?
       <Jump>
          <Jump spy={show}>
           <img className="aya" src={Aya} alt=""/>
           </Jump>
           </Jump>:
           console.log('ww')
     }
       </div>
       <Fade right spy={show}>
        <div className="gacha">
     
        {
          cards.i_rarity>1&& 
          display?
          
          <Gacha
           
            rarity={cards.i_rarity}
             art={cards.art}
             icon={cards.image}
             jname={cards.japanese_name}
             name={cards.name}
             transparent={cards.transparent}
            />:
            console.log('GLHF')
            }
     </div>
       </Fade>
     <Table
        star2={s2count}
        star3={s3count}
        star4={s4count}
        pulls={pullcount}
        rate2={n2}
        rate3={n3}
        rate4={n4}/>
     
    </div>
    
  );
}

export default App;

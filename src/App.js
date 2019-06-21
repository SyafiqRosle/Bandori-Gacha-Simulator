import React,{useEffect, useState} from 'react';
import Fade from 'react-reveal/Fade';
import Jump from 'react-reveal/Jump';
import Aya from './aya.png';
import './App.css';
import Gacha from './Gacha';
import Ticket from './ticket.png';

const App=()=>{
  const[id,setId]=useState('');
  const[cards, setCard]=useState([]);
  const[display,displayCard]=useState(false);
  const[pgno,setPgno]=useState('2');
  let[show,setShow]=useState(0);
  
  useEffect(()=>{
     getCards(); 

  },[pgno]);

  const clicked=e=>{
    displayCard(true);
    randomPg();
    setShow(show+=1);
  }
//probability func
  const probability = (n)=> {
    return !!n && Math.random() <= n;
  };

  const randomPg=e=>{
    const rand = 2+ Math.floor(Math.random()*58);
    console.log("pgno"+rand)
    setPgno(rand);
  }
  const getCards=async()=>{
    const response=await fetch(`https://bandori.party/api/cards/?page=${pgno}`);
    const data = await response.json();
    console.log(data.results);
    
    let s4_array=[];
    let s3_array=[];
    let s2_array=[];

    let p4 =  probability(0.03);
    let p3 =  probability(0.1);
    console.log("3star:"+p3);
    console.log("4star:"+p4);
    if(p4){
      for(let i=0;i<10;i++){
        if(data.results[i].i_rarity===4)s4_array.push(data.results[i]);
      }
      //pick a random 4 star from the array
      let rand_index=Math.floor(Math.random()*s4_array.length);
      setCard(s4_array[rand_index]);
      console.log(s4_array[rand_index]); 
      console.log("wow 4star")
  }
    else if(p3){
        for(let i=0;i<10;i++){
          if(data.results[i].i_rarity===3)s3_array.push(data.results[i]);
        }
        //pick a random 3 star from the array
        let rand_index=Math.floor(Math.random()*s3_array.length);
        setCard(s3_array[rand_index]);
        console.log(s3_array[rand_index]);
        console.log("meh 3star")
    } 
    else{
      for(let i=0;i<10;i++){
        if(data.results[i].i_rarity===2)s2_array.push(data.results[i]);
      }
      //pick a random 2 star from the array
      let rand_index=Math.floor(Math.random()*s2_array.length);
      setCard(s2_array[rand_index]);
      console.log(s2_array[rand_index]);
      console.log("boo 2star")
    }
   
  }
  return (
    <div className="App">
     <div className="Top">
       <h1>Bandori Gacha Simulator</h1>
       Are you feeling lucky? Play the gacha to find out!
       
     </div>
     <div className="animate">
     
     </div>
     
     
     <button onClick={clicked}>
     <Fade left>
       <img className="ticket"src={Ticket} alt=""/>
       </Fade>Play Gacha</button>
       <div>
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
    </div>
  );
}

export default App;

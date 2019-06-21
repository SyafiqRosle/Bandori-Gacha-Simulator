import React,{ useState} from 'react';
import style from './gacha.module.css';


const Gacha=({rarity,art,icon,jname,name,transparent})=>{
   
    
    return(

        
        <div className={style.frame}>
           
            
                <div>
                {
                 rarity===2?
                 
                 <img className={style.transparent}src={transparent} alt=""/>
                 
                    :<img className={style.art}src={art} alt=""/>

               
                }
                </div>
                <img className={style.icon}src={icon} alt=""/>
                <div className={style.list}>
               
                <p className={style.jname}>{jname}<br></br>
                   {name}</p>
            </div>
        </div>
    );
}
export default Gacha;
import React from 'react';
import style from './gacha.module.css';

const Table=({star2,star3,star4,pulls,rate2,rate3,rate4})=>{
    return(
        
        <table>
            <h2>Statistics</h2>
        <tr>
            <th>Rarity</th>
            <th>Count</th>
            <th> DropRate %</th>
        </tr>

        <tr>
        <td>2★</td>
        <td>{star2}</td>
        <td>{rate2}</td>
        </tr>

        <tr>
        <td>3★</td>
        <td>{star3}</td>
        <td>{rate3}</td>
        </tr>

        <tr>
        <td>4★</td>
        <td>{star4}</td>
        <td>{rate4}</td>
        </tr>
            <h3 className={style.pull}>Pulls: {pulls}</h3>   
       
        </table>
    );

}
export default Table;
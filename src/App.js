import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
//import {alertWow,creatCells} from './game3.js';

let game=true; // game's status to be able to begin and later control if wanting to  stop
const colums=10;  // board based on grid of colums and rows
const rows=10;

const CreateBoard=()=>{
  // board based on grid to start the game 
  const grid=[];
  for (let i=0; i<rows; i++) {
    const row=[];
    for (let j=0; j<colums; j++){
     row.push(Math.floor(Math.random()*2))
    }
    grid.push(row)
  }
  return grid;
}
// creating neighbours array to loop over and sum at the game's logic function ---checkNeighbours
const neighbours=[
  [0,1],
  [1,1],
  [0,-1],
  [1,0],
  [1,-1],
  [-1,0],
  [-1,-1],
  [-1,1]
]

function App() {
 
 //let game=true;
 //let changeGame=()=> {game=false ; console.log(game, 'the games status ')}
  
 
const [grid,setGrid]=useState();

useEffect(()=> {
  setGrid(CreateBoard())
},[])


function checkNeighbours(){
   if (game) 
 
  {
  setGrid((g)=>{
    const nextGen=g.map((row,i)=>{  // next generation logics- according to everytime the logic below runs
      return row.map((cell,j)=> {
        let sumNeib=0;
        neighbours.forEach((neib)=>{
          const posX= i+ neib[0];
          const posY= j+ neib[1];
          
          if (posX>=0 && posX< rows && posY>=0 && posY< colums){
            sumNeib +=g[posX][posY];
          }
        })

        if (sumNeib<2 || sumNeib >3) {  //checks according to the game logic the number of living neighoubrs to return a dead cell
          return 0;
        }
        if (sumNeib===3 /*&& g[i][j]===0*/){ // checking for turning a dead cell to a living cell according to 3 living neigbours 
          return 1
        }
        return g[i][j]
      })
    })
     return nextGen 
  })
} 

}





        
      
  
  return (
  
   

    <div className="App">
      
      <h1>Omri's version to Conway's game of life</h1>
    {<button onClick={()=>{  game=true ;
      
      
      setInterval(()=>{ 
        checkNeighbours(grid)
      },500) 
      //clearInterval(checkNeighbours(grid))
    }} 
    >start game</button>}

    {<button onClick={()=>setGrid(CreateBoard)}>reset game</button>} 
    {<button onClick={()=>{ game=false }}>stop game</button>} {/*stopping the games logic, tried to do with clearinterval as well */}

    

    <div //className='gamegrid'
  style={{
    display: "grid",
    gridTemplateColumns: `repeat(${colums}, 60px)`,
    width: "fit-content",
    margin: "0 auto",
  }}>
     
     {grid && 
     grid.map((rows,i)=>
     rows.map((colum,j)=> (
      <div //className='gamegrid-gridvalues'
        style={{
           width:60,
           height:60,
           backgroundColor: grid[i][j]? "grey": " ",
           border: "1px solid black",
           

        }}
        />

     ))
     )}
     </div>

     <input></input>


    </div>
  );
      }  

    
    
//creating begin and stop button to the game
//creating reset board button 
//Math.round(Math.random(Math.fround(100))*100+1)



      
   
    

export default App;

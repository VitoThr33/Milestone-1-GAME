//import lebron.js
import {updateLebron, setupLebron} from "./lebron.js"


document.addEventListener("keypress", handleStart,{once: true})
const title= document.querySelector("[data-title]")

//loop function
let lastTime
function updateLoop(time){
//skip first render and start after    
    if (lastTime==null){
       lastTime= time 
       window.requestAnimationFrame(updateLoop)
       return
    }
   const delta=time-lastTime
   updateLebron(delta)
   lastTime=time
   window.requestAnimationFrame(updateLoop)
}

//Game start functioin
function handleStart( ){
    title.classList.add("hide")
    setupLebron()
    window.requestAnimationFrame(updateLoop)
}

//Game Lose function 
function handleLose(){
}
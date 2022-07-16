//import lebron.js
import {updateLebron, setupLebron,getLebronRect} from "./lebron.js"
import {updateShip} from "./championships.js"

document.addEventListener("keypress", handleStart,{once: true})
const title= document.querySelector("[data-title]")
const subtitle= document.querySelector("[data-subtitle]")

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
   updateShip(delta)
   if (checkLose()) return handleLose()
   lastTime=time
   window.requestAnimationFrame(updateLoop)
}

function checkLose(){
    const lebronRect= getLebronRect()

    const outsideWorld= lebronRect.top < 0 || lebronRect.bottom > window.innerHeight
    return outsideWorld
}

//Game start functioin
function handleStart( ){
    title.classList.add("hide")
    setupLebron()
    lastTime=null
    window.requestAnimationFrame(updateLoop)
}

//Game Lose function 
function handleLose(){
    setTimeout(() =>{
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent= "0 Pipes"
//game restart
    document.addEventListener("keypress", handleStart,{once: true})
},250)
}
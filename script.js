//import lebron.js and championships.js
import {updateLebron, setupLebron,getLebronRect} from "./lebron.js"
import {updateShip,setupShips,getPassedShipsCount, getShipRects} from "./championships.js"

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
    const insideShip = getShipRects().some(rect => isCrash(lebronRect,rect))

    const outsideWorld= lebronRect.top < 0 || lebronRect.bottom > window.innerHeight
    return outsideWorld || insideShip
}

function isCrash(rect1,rect2){
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top 
    )
}

//Game start functioin
function handleStart( ){
    title.classList.add("hide")
    setupLebron()
    setupShips()
    lastTime=null
    window.requestAnimationFrame(updateLoop)
}

//Game Lose function 
function handleLose(){
    setTimeout(() =>{
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent= `${getPassedShipsCount()} Championships Missed`
//game restart
    document.addEventListener("keypress", handleStart,{once: true})
},250)
}
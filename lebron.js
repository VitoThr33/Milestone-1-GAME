const lebronChar=document.querySelector("[data-lebron]")
const lebron_speed=0.5
const float_duration=125
let timeSinceLastFloat= Number.POSITIVE_INFINITY

export function setupLebron(){
    setTop(window.innerHeight/2)
    document.removeEventListener('keydown', handleFly)
    document.addEventListener('keydown', handleFly)
}

export function updateLebron(delta){
    if (timeSinceLastFloat< float_duration){
       setTop(getTop()- lebron_speed*delta) 
    }
    else {
        setTop(getTop()+ lebron_speed*delta)
    }
    
   timeSinceLastFloat+= delta
}



function setTop(top){
    lebronChar.style.setProperty("--lebron-top",top)
}

function getTop(){
    return parseFloat(getComputedStyle(lebronChar).getPropertyValue("--lebron-top"))

}

function handleFly(e){
    if (e.code !=="Space") return

    timeSinceLastFloat=0
}
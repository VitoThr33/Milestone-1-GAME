const HOLE_HEIGHT = 250
const SHIP_WIDTH= 120
const SHIP_INTERVAL = 2500
const SHIP_SPEED = .75
let ships = []
let timeSinceLastShip 
let passedShipCount

//setup tubes
export function setupShips(){
    document.documentElement.style.setProperty("--ship-width", SHIP_WIDTH)
    document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT)
//delete old pipe from screen on new start
    ships.forEach(ship => ship.remove())
    
    timeSinceLastShip=SHIP_INTERVAL
    passedShipCount=0
}

//update tubes
export function updateShip(delta) {
    timeSinceLastShip += delta

    if (timeSinceLastShip > SHIP_INTERVAL) {
        timeSinceLastShip -= SHIP_INTERVAL
        createShip()
    }
    ships.forEach(ship => {
        if (ship.left + SHIP_WIDTH < 0){
            passedShipCount++
            return ship.remove()
        }
        ship.left = ship.left - delta * SHIP_SPEED
    })

}

export function getPassedShipsCount(){
    return passedShipCount
}

export function getShipRects(){
    return ships.flatMap(ship => ship.rects())
}

//create tubes
function createShip() {
    const shipElem = document.createElement("div")
    const topElem = createShipSegment("top")
    const bottomElem = createShipSegment("bottom")
    shipElem.append(topElem)  
    shipElem.append(bottomElem)
    shipElem.classList.add("ship")
    shipElem.style.setProperty("--hole-top", randomNumberBetween(HOLE_HEIGHT * 1.5, window.innerHeight - HOLE_HEIGHT * .5))
    const ship= {
        get left() {
            return parseFloat(getComputedStyle(shipElem).getPropertyValue("--ship-left"))
        },
        set left(value) {
            shipElem.style.setProperty("--ship-left", value)
        },
    
    //remove pipes from screen once passed
        remove(){
            ships=ships.filter(s => s !== ship)
            shipElem.remove()
        }, 
        rects(){
            return[
                topElem.getBoundingClientRect(),
                bottomElem.getBoundingClientRect()
            ]
        }
    }
    ship.left = window.innerWidth
    document.body.append(shipElem)
    ships.push(ship)
}

//create segment
function createShipSegment(position) {
    const segment = document.createElement("div")
    segment.classList.add("segment", position)
    return segment
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
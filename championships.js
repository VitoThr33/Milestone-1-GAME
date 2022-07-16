const HOLE_HEIGHT = 120
const SHIP_INTERVAL = 1500
const SHIP_SPEED = .75
const ships = []
let timeSinceLastShip = 0

export function updateShip(delta) {
    timeSinceLastShip += delta

    if (timeSinceLastShip > SHIP_INTERVAL) {
        timeSinceLastShip -= SHIP_INTERVAL
        createShip()
    }
    ships.forEach(ship => {
        ship.left = ship.left - delta * SHIP_SPEED
    })

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
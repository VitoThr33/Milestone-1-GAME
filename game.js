// CANVAS
const cnvs = document.getElementById("lebron");

const cntx = cnvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;
const DEGREE = Math.PI/180;

// LOAD IMAGES
const layout = new Image();
layout.src="resources/layout.png"

//GAME STAGES
const stage= {
    present: 0,
    readyUP: 0, 
    game: 1,
    die: 2, 
}

//CONTROLS
document.addEventListener("click", function(evt){
    switch(stage.current){
        case stage.readyUP:
            stage.current= stage.game;
            break;
            case stage.game:
                leBall.spin();
                break;
                case stage.die:
                    stage.current= stage.readyUP;
                    break;
    }
})


//BACKGROUND
const backG= {
        sX : 1,
        sY : 0,
        sW : 275,
        sH : 226,
        dX : 0,
        dY : 0, 
        dW : cnvs.width,
        dH : cnvs.height,
        
    
    draw : function(){
        cntx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.dX, this.dY, this.dW, this.dH, this.h);
         }
}

//GET READY
const readyUP= {
    sX: 0,
    sY: 228,
    sW: 173,
    sH: 153,
    dW: 250,
    dH: 250,
    x:195,
    y:460,

    draw : function(){
        if(stage.present==stage.readyUP){
           cntx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.x, this.y, this.dW, this.dH);
} 
        }
        
}

//GAME OVER
const gameOver= {
    sX: 175,
    sY: 228,
    sW: 225,
    sH: 202,
    dW: 300,
    dH: 300,
    x:180,
    y:460,

    draw : function(){
        if (stage.present==stage.die){
           cntx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.x, this.y, this.dW, this.dH); 
        }
        
}
}
//LEBRON

//LeBALL ANIMATION FOR SPIN
const leBall = {
    Animation: [
        {sX:277, sY: 112},
        {sX:277, sY: 139},
        {sX:277, sY: 164},
        {sX:277, sY: 139},
    ],
    x:150,
    y:400,
    w:34,
    h:26,

    frame:0,

    draw: function(){
        let leBall = this.Animation[this.frame];

        cntx.drawImage(layout, leBall.sX, leBall.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    },
    spin : function(){

    },
}

// DRAW
function draw(){
    cntx.fillStyle = "#70c5ce";
    cntx.fillRect(0, 0, cnvs.width, cnvs.height);
    
    backG.draw();
    leBall.draw();
    readyUP.draw();
    gameOver.draw();
}

// UPDATE
function update(){
    
}

// LOOP
function loop(){
    update();
    draw();
    frames++;
    
    requestAnimationFrame(loop);
}
loop();


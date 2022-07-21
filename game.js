// SELECT CNVS
const cnvs = document.getElementById("lebron");
const resize = () => {
    cnvs.width = window.innerWidth;
    cnvs.height = window.innerHeight;
  }
  resize()
  window.addEventListener('resize', resize)
const cntx = cnvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;
const DEGREE = Math.PI/180;

// LOAD SPRITE IMAGE
const layout = new Image();
layout.src="resources/layout.png"

//background
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

//lebron
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
    }
}

// DRAW
function draw(){
    cntx.fillStyle = "#70c5ce";
    cntx.fillRect(0, 0, cnvs.width, cnvs.height);
    
    backG.draw();
    leBall.draw();
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

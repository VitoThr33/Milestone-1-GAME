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
cnvs.addEventListener("click", function(evt){
    switch(stage.present){
        case stage.readyUP:
            stage.present= stage.game;
            break;
            case stage.game:
                leBall.spin();
                break;
                case stage.die:
                    stage.present= stage.readyUP;
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

        dx: 2,
        
    
    draw : function(){
        cntx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.dX, this.dY, this.dW, this.dH, this.h);
         }
}

//FLOOR
const floor= {
    sX : 276.5,
    sY : 0,
    sW : 224,
    sH : 112,
    dX : 0,
    dY : cnvs.height-112, 
    dW : 1500,
    dH : 112,

    dx: 2,
    

draw : function(){
    cntx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.dX, this.dY, this.dW, this.dH, this.h, this.w);

    cntx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.dX, this.dY, this.dW, this.dH, this.h, this.w);
},
    //MOVE FLOOR  
    update: function(){
        if (stage.present == stage.game){
            this.dX=(this.dX-this.dx) % (this.dW/2);
        }
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
    gravity: 0.25,
    jump: 4.6,
    speed: 0,

    draw: function(){
        let leBall = this.Animation[this.frame];

        cntx.drawImage(layout, leBall.sX, leBall.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    },
    spin : function(){
        this.speed =- this.jump;
    },

    update : function(){
//READY UP SPIN SLOW
        this.period= stage.present== stage.readyUP ? 10:5;
//INCREMENT BY 1 EACH PERIOD
        this.frame +=  frames%this.period == 0 ? 1:0;
//CHANGE FRAME 0-4 THEN TO 0
        this.frame =this.frame%this.Animation.length;
            if (stage.present == stage.readyUP){
//RESET POS AFTER DIE  
                this.y=400;

            }else{
                this.speed += this.gravity;
                this.y += this.speed;
                    if(this.y+this.h >= cnvs.height - floor.dH){
                        this.y=cnvs.height - floor.dH - this.h;
                        if (stage.present == stage.game){
                            stage.present = stage.die;
                
                        }
                    }
            }
    }
}

//CHAMPIONSHIPS

// DRAW
function draw(){
    cntx.fillStyle = "#70c5ce";
    cntx.fillRect(0, 0, cnvs.width, cnvs.height);
    
    backG.draw();
    leBall.draw();
    readyUP.draw();
    gameOver.draw();
    floor.draw();
}

// UPDATE
function update(){
   leBall.update();
   floor.update();
    
}

// LOOP
function loop(){
    update();
    draw();
    frames++;
    
    requestAnimationFrame(loop);
}
loop();


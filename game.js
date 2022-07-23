// SELECT CVS
const cvs = document.getElementById("lebron");
const ctx = cvs.getContext("2d");

// GAME VARS AND CONSTS
let frames = 0;


// LOAD LAYOUT IMAGE
const layout = new Image();
layout.src = "resources/layout.png";


// GAME STAGE
const stage = {
    current: 0,
    readyUP: 0,
    game: 1,
    die: 2
}

// START BUTTON COORD
const startBtn = {
    sX: 120,
    sY: 263,
    w: 83,
    h: 29,
    dX: 150,
    dY: 260,
}

// CONTROL THE GAME
cvs.addEventListener("click", function (evt) {
    switch (stage.current) {
        case stage.readyUP:
            stage.current = stage.game;

            break;
        case stage.game:
            if (leBall.y - leBall.radius <= 0) return;
            leBall.spin();

            break;
        case stage.die:
            let rect = cvs.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;

            // CHECK IF WE CLICK ON THE START BUTTON
            if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) {
                pipes.reset();
                leBall.speedReset();
                score.reset();
                stage.current = stage.readyUP;
            }
            break;
    }
});


// BACKGROUND
const bg = {
    sX: 1,
    sY: 0,
    sW: 275,
    sH: 226,
    dX: 0,
    dY: 0,
    dW: cvs.width,
    dH: cvs.height - 250,

    dx: 2,

    draw: function () {
        ctx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.dX, this.dY, this.dW, this.dH, this.h);


        ctx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.dX, this.dY, this.dW, this.dH, this.h);

    }

}

// FOREGROUND
const fg = {
    sX: 276.5,
    sY: 0,
    sW: 224,
    sH: 112,
    dX: 0,
    dY: cvs.height - 250,
    dW: 2000,
    dH: 250,

    dx: 2,

    draw: function () {
        ctx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.dX, this.dY, this.dW, this.dH, this.h, this.w);

        ctx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.dX, this.dY, this.dW, this.dH, this.h, this.w);
    },
    //MOVE FLOOR    
    update: function () {
        if (stage.current == stage.game) {
            this.dX = (this.dX - this.dx) % (this.dW/2 );
        }
    }
}

// LEBRON
const leBall = {
    animation: [
        { sX: 277, sY: 112 },
        { sX: 277, sY: 139 },
        { sX: 277, sY: 164 },
        { sX: 277, sY: 139 },
    ],
    x: 50,
    y: 150,
    w: 34,
    h: 26,

    radius: 10,

    frame: 0,
    gravity: 0.25,
    jump: 4.6,
    speed: 0,

    draw: function () {
        let leBall = this.animation[this.frame];

        ctx.save();

        ctx.drawImage(layout, leBall.sX, leBall.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    },
    spin: function () {
        this.speed = - this.jump;
    },

    update: function () {
        //READY UP SPIN SLOW
        this.period = stage.current == stage.readyUP ? 10 : 5;
        //INCREMENT BY 1 EACH PERIOD
        this.frame += frames % this.period == 0 ? 1 : 0;
        //CHANGE FRAME 0-4 THEN TO 0
        this.frame = this.frame % this.animation.length;
        if (stage.current == stage.readyUP) {
            //RESET POS AFTER DIE  
            this.y = 400;

        } else {
            this.speed += this.gravity;
            this.y += this.speed;
            if (this.y + this.h >= cvs.height - fg.dH) {
                this.y = cvs.height - fg.dH - this.h;
                if (stage.current == stage.game) {
                    stage.current = stage.die;

                }
            }
        }
    }
}
//GET READY
const readyUP = {
    sX: 0,
    sY: 228,
    sW: 173,
    sH: 153,
    dW: 250,
    dH: 250,
    x: 195,
    y: 200,

    draw: function () {
        if (stage.current == stage.readyUP) {
            ctx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.x, this.y, this.dW, this.dH);
        }
    }

}


// GAME OVER MESSAGE
const gameOver = {
    sX: 175,
    sY: 228,
    sW: 225,
    sH: 202,
    dW: 300,
    dH: 300,
    x: 180,
    y: 220,

    draw: function () {
        if (stage.current == stage.die) {
            ctx.drawImage(layout, this.sX, this.sY, this.sW, this.sH, this.x, this.y, this.dW, this.dH);
        }
    }

}

// PIPES
const pipes = {
    position: [],

    top: {
        sX: 553,
        sY: 0
    },
    bottom: {
        sX: 502,
        sY: 0
    },

    w: 53,
    h: 400,
    gap: 150,
    maxYPos: -150,
    dx: 2,
//BORROWED PIPE AND CRASH PIPE FROM https://www.youtube.com/watch?v=L07i4g-zhDA&ab_channel=CodeExplained
    draw: function () {
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            // top pipe
            ctx.drawImage(layout, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

            // bottom pipe
            ctx.drawImage(layout, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
        }
    },

    update: function () {
        if (stage.current !== stage.game) return;

        if (frames % 100 == 0) {
            this.position.push({
                x: cvs.width,
                y: this.maxYPos * (Math.random() + 1)
            });
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let bottomPipeYPos = p.y + this.h + this.gap;

            // COLLISION DETECTION
            // TOP PIPE
            if (leBall.x + leBall.radius > p.x && leBall.x - leBall.radius < p.x + this.w && leBall.y + leBall.radius > p.y && leBall.y - leBall.radius < p.y + this.h) {
                stage.current = stage.die;

            }
            // BOTTOM PIPE
            if (leBall.x + leBall.radius > p.x && leBall.x - leBall.radius < p.x + this.w && leBall.y + leBall.radius > bottomPipeYPos && leBall.y - leBall.radius < bottomPipeYPos + this.h) {
                stage.current = stage.die;

            }

            // MOVE THE PIPES TO THE LEFT
            p.x -= this.dx;

            // if the pipes go beyond canvas, we delete them from the array
            if (p.x + this.w <= 0) {
                this.position.shift();
                score.value += 1;

                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },

    reset: function () {
        this.position = [];
    }

}

// SCORE
const score = {
    best: parseInt(localStorage.getItem("best")) || 0,
    value: 0,

    draw: function () {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";

        if (stage.current == stage.game) {
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width / 2, 50);
            ctx.strokeText(this.value, cvs.width / 2, 50);

        } else if (stage.current == stage.die) {
            // SCORE VALUE
            ctx.font = "25px Teko";
            ctx.fillText(this.value, 425, 350);
            ctx.strokeText(this.value, 425, 350);
            // BEST SCORE
            ctx.fillText(this.best, 425, 425);
            ctx.strokeText(this.best, 425, 425);
        }
    },

    reset: function () {
        this.value = 0;
    }
}

// DRAW
function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    pipes.draw();
    fg.draw();
    leBall.draw();
    readyUP.draw();
    gameOver.draw();
    score.draw();
}

// UPDATE
function update() {
    leBall.update();
    fg.update();
    pipes.update();
}

// LOOP
function loop() {
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}
loop();

/* Amardeep Sanjaybhai Patel, 000892525 */

const svgNS = "http://www.w3.org/2000/svg";

let paddlex = 1000;
const borderx = 1000;
const bordery = 1000;

let speedx = 5;
let speedy = 5;
let score = 0;

let cx = 0;
let cy = 0;
let circleRadius = 0;


function createBall() {
    let ball = document.createElementNS(svgNS, "circle");
    ball.setAttribute("id", "ball0");

    let circleRadius = 25;
    ball.setAttribute("r", circleRadius);
    
    cy = 25;
    ball.setAttribute("cy", cy);

    cx = 0;
    ball.setAttribute("cx", cx);

    ball.setAttribute("fill", "white");

    return ball;
}

function clearAll() {
    let node = document.getElementById("ball0");
    if (node != null) {
        node.remove();
    }
}

function movepaddle(event) {
    switch (event.code) {
        case "ArrowRight":
            event.preventDefault();
            paddlex += 20;
            if (paddlex > 1000-50)
                paddlex = 1000-50;
            break;
        case "ArrowLeft":
            event.preventDefault();
            paddlex -= 20;
            if (paddlex < -90)
                paddlex = -90;
            break;
    }

    let paddle = document.getElementById("mypaddle");
    paddle.setAttribute("x", paddlex);
}



document.getElementById("start").addEventListener("click", function (event) {

    disablebutton();

    clearAll();

    let svg = document.getElementById("board");

    let ball = createBall();
    svg.appendChild(ball);
    document.addEventListener("keydown", function (event) {
        movepaddle(event);
    });

    setInterval(function () {
        let ball = document.getElementById("ball0");

        cy += speedy;
        cx += speedx;


        let r = parseFloat(ball.getAttribute("r"));
        if (cx - r <= -90 || cx + r >= borderx + 100)
            speedx = -speedx;


        let paddle = document.getElementById("mypaddle");
        let paddleX = parseFloat(paddle.getAttribute("x"));
        let paddleY = parseFloat(paddle.getAttribute("y"));
        let paddleWidth = parseFloat(paddle.getAttribute("width"));
        let paddleHeight = parseFloat(paddle.getAttribute("height"));

        if (cx >= paddleX && cx <= paddleX + paddleWidth && cy + r >= paddleY) {

            speedy = -speedy;
            score++;
            document.getElementById("result-score").innerText = "SCORE: " + score;
        }

        if (cy - r <= 0)
            speedy = -speedy;

        if (cy + r >= bordery) {
            stop();
            clearAll();
            location.reload();
            enablebutton();
        }

        ball.setAttribute("cx", cx);
        ball.setAttribute("cy", cy);

    }, 1000 / 30);
});


document.getElementById("speedup").addEventListener("click", function (event) {
    let ball = document.getElementById("ball0");

    speedx *= 1.20;
    speedy *= 1.20;

});

function moveright() {

    paddlex += 40;
    if (paddlex > 1000)
        paddlex = 1000;

    let paddle = document.getElementById("mypaddle");
    paddle.setAttribute("x", paddlex);
}

function moveleft() {
    paddlex -= 40;
    if (paddlex < -90)
        paddlex = -90;

    let paddle = document.getElementById("mypaddle");
    paddle.setAttribute("x", paddlex);
}

document.getElementById("right").addEventListener("click", () => {
    moveright();
});

document.getElementById("left").addEventListener("click", () => {
    moveleft();
});

function disablebutton() {
    document.getElementById("start").disabled = true;
}

function enablebutton() {
    document.getElementById("start").disabled = false;
}

function stop() {
    alert("Game Over");
}
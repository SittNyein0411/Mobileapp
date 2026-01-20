"use strict";

let flag = "A";
let counter = 9;

// ==== 効果音 ====
const soundClickPen = new Audio("sound/click_sound1.mp3");
const soundClickBear = new Audio("sound/click_sound2.mp3");
const soundPenWin = new Audio("sound/penwin_sound.mp3");
const soundBearWin = new Audio("sound/bearwin_sound.mp3");
const soundDraw = new Audio("sound/draw_sound.mp3");

const squares = [
    document.getElementById("a_1"),
    document.getElementById("a_2"),
    document.getElementById("a_3"),
    document.getElementById("b_1"),
    document.getElementById("b_2"),
    document.getElementById("b_3"),
    document.getElementById("c_1"),
    document.getElementById("c_2"),
    document.getElementById("c_3")
];

const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

const penTurn =
    '<p class="image"><img src="img/penguins.jpg" width="61"></p>' +
    '<p class="text">Penguins Attack!</p>';

const bearTurn =
    '<p class="image"><img src="img/whitebear.jpg" width="61"></p>' +
    '<p class="text">WhiteBear Attack!</p>';

const penWin =
    '<div class="animate__animated animate__flip">' +
    '<p class="image"><img src="img/penguins.jpg" width="61"></p>' +
    '<p class="text">Penguins WIN!</p>' +
    '</div>';


const bearWin =
    '<div class="animate__animated animate__flip">' +
    '<p class="image"><img src="img/whitebear.jpg" width="61"></p>' +
    '<p class="text">WhiteBear WIN!</p>' +
    '</div>';
const drawMessage =
    '<div class="draw-images">' +
    '<img src="img/penguins.jpg" width="61">' +
    '<img src="img/whitebear.jpg" width="61">' +
    '</div>' +
    '<p class="text animate__animated animate__zoomIn">Draw!</p>';




window.addEventListener("DOMContentLoaded", () => {
    setMessage(penTurn);

    squares.forEach(square => {
        square.addEventListener("click", () => {
            isSelect(square);
        });
    });
});

// ★ 勝ちライン保持用
let winLineSquares = [];

// ====== クリック ======
function isSelect(selectSquare) {

    if (flag === "A") {
        soundClickPen.play();

        selectSquare.classList.add("js-pen-checked", "js-unclickable");

        const win = checkWin("js-pen-checked");
        if (win) {
            setMessage(penWin);
            soundPenWin.play();
            highlightWinLine(win);

            $(document).snowfall({
                maxSpeed: 5,
                maxSize: 20,
                flakeColor: "white"
            });

            newgamebtn_display.classList.remove("js-hidden");
            endGame();
            return;
        }

        setMessage(bearTurn);
        flag = "B";
    } else {
        soundClickBear.play();

        selectSquare.classList.add("js-bear-checked", "js-unclickable");

        const win = checkWin("js-bear-checked");
        if (win) {
            setMessage(bearWin);
            soundBearWin.play();
            highlightWinLine(win, "bear");

            $(document).snowfall({
                maxSpeed: 5,
                maxSize: 20,
                flakeColor: "skyblue"
            });

            newgamebtn_display.classList.remove("js-hidden");
            endGame();
            return;
        }

        setMessage(penTurn);
        flag = "A";
    }

    counter--;
    if (counter === 0) {
        setMessage(drawMessage);
        soundDraw.play();
        newgamebtn_display.classList.remove("js-hidden");
    }
    
}

// ====== 勝利判定 ======
function checkWin(playerClass) {
    const winPatterns = [
        ["a_1", "a_2", "a_3"],
        ["b_1", "b_2", "b_3"],
        ["c_1", "c_2", "c_3"],
        ["a_1", "b_1", "c_1"],
        ["a_2", "b_2", "c_2"],
        ["a_3", "b_3", "c_3"],
        ["a_1", "b_2", "c_3"],
        ["a_3", "b_2", "c_1"]
    ];

    for (const pattern of winPatterns) {
        if (pattern.every(id =>
            document.getElementById(id).classList.contains(playerClass)
        )) {
            return pattern; // ★ 勝った3マスを返す
        }
    }
    return null;
}
function highlightWinLine(pattern, winner = "pen") {
    pattern.forEach(id => {
        const sq = document.getElementById(id);


        sq.classList.add("win-line");


        if (winner === "bear") {
            sq.classList.add("win-line-bear");
        }
    });
}


// ====== 盤面ロック ======
function endGame() {
    squares.forEach(square => {
        square.classList.add("js-unclickable");
    });
}

// ====== メッセージ表示 ======
function setMessage(html) {
    document.getElementById("msgtext").innerHTML = html;
}

// ====== New Game ======
newgamebtn.addEventListener("click", function () {

    $(document).snowfall("clear");

    flag = "A";
    counter = 9;

    squares.forEach(square => {
        square.classList.remove(
            "js-pen-checked",
            "js-bear-checked",
            "js-unclickable",
            "win-line",
            "win-line-bear"  
        );
    });

    setMessage(penTurn);

    newgamebtn_display.classList.add("js-hidden");
});

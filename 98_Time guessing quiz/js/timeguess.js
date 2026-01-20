"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

const soundStop2 = new Audio("sound/stop2_long.mp3");
const soundStart = new Audio("sound/start.mp3");
const soundStop1 = new Audio("sound/stop1_long.mp3");
const soundReset = new Audio("sound/reset.mp3");

let startTime;       // Startボタンクリック時の時刻
let timeoutid;       // ID
let stopTime = 0;    // Stopまでの経過時間

// ボタンを"初期"状態とする
setButtonStateInitial();

////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click", function () {
  stopAllSounds(); // 念のため全停止
  hideFireworks(); // 背景リセット

  // ボタンをタイマー"動作中"状態とする
  setButtonStateRunning();
  startTime = Date.now();
  countUp();
  soundStart.play();
}, false);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click", function () {
  // タイマーを"停止中"状態とする
  setButtonStateStopped();
  clearTimeout(timeoutid); // setTimeout()でセットしたタイマーを解除
  stopTime += Date.now() - startTime;

  stopAllSounds(); // 再生中の音をすべて止める

  const elapsedSec = Math.floor(stopTime / 1000);

  if (elapsedSec === 10) {
    soundStop2.play();
    showFireworks();
  } else {
    soundStop1.play();
    hideFireworks();
  }
}, false);

////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click", function () {
  stopAllSounds(); // 再生中の音を止める
  setButtonStateInitial();
  timer.textContent = "00:00.000";
  stopTime = 0;
  soundReset.play();
  hideFireworks();
});

////////////////////////
// カウントアップ
////////////////////////
function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  timer.textContent = `${m}:${s}.${ms}`;
  timeoutid = setTimeout(countUp, 10);
}

////////////////////////
// 音をすべて止める関数
////////////////////////
function stopAllSounds() {
  [soundStop1, soundStop2, soundStart, soundReset].forEach((snd) => {
    snd.pause();
    snd.currentTime = 0; // 再生位置を最初に戻す
  });
}

////////////////////////
// 花火表示・非表示
////////////////////////
function showFireworks() {
  document.body.style.backgroundImage = "url('img/fireworks.gif')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundColor = "transparent";
}

function hideFireworks() {
  document.body.style.backgroundImage = "none";
  document.body.style.backgroundColor = "rgba(233,168,227,0.6)";
}

////////////////////////
// 初期・動作中・停止中の状態管理
////////////////////////
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); // 時間を見えなくする
  start.classList.add("js-inactive");
  stop.classList.remove("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden");
  timer.classList.add("timer_appear");
  start.classList.add("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.remove("js-inactive");
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}
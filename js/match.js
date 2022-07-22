let teams = [];
getTeamsDataFromLocalStorage();
setPropertiesOfTeams();
let playingTeam = 0;

function displayBattingBowlingTeamName(teamNumber) {
  let batTeamName = document.querySelector("#batTeamName");
  let bowTeamName = document.querySelector("#bowTeamName");
  batTeamName.innerHTML = teams[teamNumber].teamName;
  bowTeamName.innerHTML = teams[1 - teamNumber].teamName;
}
displayBattingBowlingTeamName(playingTeam);

function setPropertiesOfTeams() {
  teams[0].scoreBoard = [];
  teams[1].scoreBoard = [];
  teams[0].teamFantasyPoints = 0;
  teams[1].teamFantasyPoints = 0;
}

function getTeamsDataFromLocalStorage() {
  teams.push(JSON.parse(localStorage.getItem("team1")));
  teams.push(JSON.parse(localStorage.getItem("team2")));
}

function onClickHitButton() {
  hitDelay();
  let { displayWicketsElement, numOvers } = getHtmlElements();
  if (displayWicketsElement.innerHTML == 11 || numOvers == 5) {
    changeInning();
    return;
  }
  displayPlayingBatsmanAndBowler();
  let { runsData } = runsAndFantasyPointsData();
  let randomRun = Math.floor(Math.random() * runsData.length);
  incrementBallsAndOvers();
  addTeamFantasyPoints(randomRun);
}

function changeInning() {
  playingTeam = 1 - playingTeam;
  clearPageAfterInningIsFinished();
  displayBattingBowlingTeamName(playingTeam);
  document.querySelector(".firstInningTargetBox h2").innerHTML = displayTarget();
  playingTeam == 1 ? displayFirstInningFinishedPage() : displayMatchFinishedPage();
}

function addTeamFantasyPoints(randomRun) {
  let { displayWicketsElement } = getHtmlElements();
  let { runsData } = runsAndFantasyPointsData();
  runsData[randomRun] === "w"
    ? addFantasyPointsToBowlingTeamOnWicket(displayWicketsElement)
    : addTeamFantasyPointsIfHitIsNotWicket(randomRun);
  displayCurrentHitScore(randomRun);
}

function runsAndFantasyPointsData() {
  let runsData = ["1", "2", "3", "4", "6", "0", "w"];
  let fantasyPointsData = ["1", "2", "3", "5", "8", "0", "w"];
  return { runsData, fantasyPointsData };
}

function getHtmlElements() {
  let hitButtonElement = document.querySelector("#hitButtonElement");
  let displayBatsmanElement = document.getElementById("batsmanName");
  let displayBowlerElement = document.getElementById("bowlerName");
  let displayRunsElement = document.getElementById("runs");
  let displayWicketsElement = document.getElementById("wickets");
  let displayOversElement = document.getElementById("overNumber");
  let displayBallNumElement = document.getElementById("ballNumber");
  let displayFantasyPointsElement = document.getElementById("fantasyPoints");
  let displayCurrentHitElement = document.querySelector(".hitScore h1");
  let displayScoreCommentryElement = document.querySelector(".commentryBox");
  let numOvers = parseInt(displayOversElement.innerHTML);
  let numBalls = parseInt(displayBallNumElement.innerHTML);
  return {
    hitButtonElement,
    displayWicketsElement,
    numOvers,
    displayBatsmanElement,
    displayBowlerElement,
    displayOversElement,
    numBalls,
    displayRunsElement,
    displayFantasyPointsElement,
    displayBallNumElement,
    displayCurrentHitElement,
    displayScoreCommentryElement,
  };
}

function addTeamFantasyPointsIfHitIsNotWicket(randomRun) {
  let { displayWicketsElement, displayBatsmanElement, displayFantasyPointsElement } = getHtmlElements();
  let { runsData, fantasyPointsData } = runsAndFantasyPointsData();
  storePlayerFantasyPoints(playingTeam, displayBatsmanElement, fantasyPointsData[randomRun]);
  storePlayerRuns(playingTeam, displayBatsmanElement, runsData[randomRun]);
  let player = teams[playingTeam].players[+displayWicketsElement.innerHTML];
  if (player.hasOwnProperty("isCaptain")) {
    addFantasyPointsAccordingToPosition(randomRun, 2);
  } else if (player.hasOwnProperty("isViceCaptain")) {
    addFantasyPointsAccordingToPosition(randomRun, 1.5);
  } else {
    addFantasyPointsAccordingToPosition(randomRun, 1);
  }
  displayFantasyPointsElement.innerHTML = teams[playingTeam].teamFantasyPoints;
}

function addFantasyPointsToBowlingTeamOnWicket() {
  let { displayWicketsElement, displayBowlerElement } = getHtmlElements();
  if (teams[playingTeam].players[+displayWicketsElement.innerHTML].hasOwnProperty("isCaptain")) {
    teams[1 - playingTeam].teamFantasyPoints += 20;
    storePlayerFantasyPoints(1 - playingTeam, displayBowlerElement, 20);
  } else if (teams[playingTeam].players[+displayWicketsElement.innerHTML].hasOwnProperty("isViceCaptain")) {
    teams[1 - playingTeam].teamFantasyPoints += 15;
    storePlayerFantasyPoints(1 - playingTeam, displayBowlerElement, 15);
  } else {
    teams[1 - playingTeam].teamFantasyPoints += 10;
    storePlayerFantasyPoints(1 - playingTeam, displayBowlerElement, 10);
  }
  displayWicketsElement.innerHTML = parseInt(displayWicketsElement.innerHTML) + 1;
}

function addFantasyPointsAccordingToPosition(randomRun, fPointsOfPosition) {
  let { displayRunsElement } = getHtmlElements();
  let { runsData, fantasyPointsData } = runsAndFantasyPointsData();
  displayRunsElement.innerHTML = parseInt(displayRunsElement.innerHTML) + parseInt(runsData[randomRun]);
  teams[playingTeam].teamFantasyPoints += parseInt(fantasyPointsData[randomRun]) * fPointsOfPosition;
  if (+runsData[randomRun] === 0) {
    teams[1 - playingTeam].teamFantasyPoints += fPointsOfPosition;
  }
}

function incrementBallsAndOvers() {
  let { displayBallNumElement, displayOversElement, numBalls, numOvers } = getHtmlElements();
  numBalls++;
  if (numBalls > 5) {
    numBalls = 0;
    numOvers++;
  }
  displayOversElement.innerHTML = numOvers;
  displayBallNumElement.innerHTML = numBalls;
}

function displayMatchFinishedPage() {
  document.querySelector(".matchFinished").style.display = "flex";
}

function displayFirstInningFinishedPage() {
  document.querySelector(".firstInningFinished h2").innerHTML += displayTarget();
  document.querySelector(".firstInningFinished").style.display = "flex";
}

function clearPageAfterInningIsFinished() {
  document.getElementById("overNumber").innerHTML = "0";
  document.getElementById("ballNumber").innerHTML = "0";
  document.getElementById("wickets").innerHTML = "0";
  document.getElementById("runs").innerHTML = "0";
  document.getElementById("fantasyPoints").innerHTML = "00";
  document.getElementById("batsmanName").innerHTML = "";
  document.getElementById("bowlerName").innerHTML = "";
  document.querySelector(".hitScore h1").innerHTML = "";
  document.querySelector(".commentryBox").innerHTML = "";
}

function displayAndSetScoreCommentry(randomRun) {
  let { displayScoreCommentryElement, numOvers, numBalls } = getHtmlElements();
  let { runsData } = runsAndFantasyPointsData();
  currentTimeAndDate = dateAndTimeFormate();
  displayScoreCommentryElement.innerHTML += `<li>Over ${numOvers}.${numBalls} - ${currentTimeAndDate} - ${runsData[randomRun]}</li>`;
  teams[playingTeam].scoreBoard.push(new ScoreCommentry(numOvers, numBalls, currentTimeAndDate, runsData[randomRun]));
  displayBowlingTeamFantsyPoints();
}

function displayCurrentHitScore(randomRun) {
  let { runsData } = runsAndFantasyPointsData();
  let { displayCurrentHitElement, numBalls } = getHtmlElements();
  let currentTimeAndDate = dateAndTimeFormate();
  displayCurrentHitElement.innerHTML = `Ball ${numBalls == 0 ? 6 : numBalls} - ${currentTimeAndDate} - ${
    runsData[randomRun]
  }`;
  displayAndSetScoreCommentry(randomRun);
}

function displayBowlingTeamFantsyPoints() {
  document.querySelector(".bowlingTeamFantasyPoints h2").innerHTML = teams[1 - playingTeam].teamFantasyPoints;
}

function displayPlayingBatsmanAndBowler() {
  let { displayBatsmanElement, displayWicketsElement, displayBowlerElement, displayOversElement } = getHtmlElements();
  displayBatsmanElement.innerHTML = teams[playingTeam].players[+displayWicketsElement.innerHTML].name;
  displayBowlerElement.innerHTML = teams[1 - playingTeam].players.filter((player) => player.playingRole === "Bowler")[
    +displayOversElement.innerHTML
  ].name;
}

function dateAndTimeFormate() {
  let date = new Date();
  return (
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2)
  );
}

function displayTarget() {
  return teams[1 - playingTeam].scoreBoard.reduce((totalRun, curr) => {
    return curr.run === "w" ? totalRun : totalRun + parseInt(curr.run);
  }, 0);
}

function startSecondInning() {
  let displayFirstInningFinished = document.querySelector(".firstInningFinished");
  displayFirstInningFinished.style.display = "none";
}

function displayResults() {
  localStorage.setItem("team1", JSON.stringify(teams[0]));
  localStorage.setItem("team2", JSON.stringify(teams[1]));
  window.location.replace("../html/results.html");
}

function hitDelay() {
  let hitButtonElement = document.querySelector("#hitBtn");
  hitButtonElement.style.display = "none";
  setTimeout(() => {
    hitButtonElement.style.display = "flex";
  }, 0);
}

function storePlayerRuns(team, playerName, runs) {
  let { displayBowlerElement } = getHtmlElements();
  let player = teams[team].players.find((player) => player.name === playerName.innerHTML);
  player.runs += +runs;
  if (runs == 0) storePlayerFantasyPoints(1 - team, displayBowlerElement, 1);
}

function storePlayerFantasyPoints(team, playerName, fPoints) {
  let positionBonus = 1;
  let player = teams[team].players.find((player) => player.name === playerName.innerHTML);
  if (player.hasOwnProperty("isCaptain")) {
    positionBonus = 2;
  } else if (player.hasOwnProperty("isViceCaptain")) {
    positionBonus = 1.5;
  }
  player.fantasyPoints += +fPoints * positionBonus;
}

class ScoreCommentry {
  constructor(over, ball, date, run) {
    this.over = over;
    this.ball = ball;
    this.date = date;
    this.run = run;
  }
}

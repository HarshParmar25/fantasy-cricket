let teams = [];
getTeamsDataFromLocalStorage();
setDefaultPropertiesOfTeams();
let playingTeam = 0;

function displayBattingBowlingTeamName(teamNumber) {
  let batTeamName = document.querySelector("#batTeamName");
  let bowTeamName = document.querySelector("#bowTeamName");
  batTeamName.innerHTML = teams[teamNumber].teamName;
  bowTeamName.innerHTML = teams[1 - teamNumber].teamName;
}
displayBattingBowlingTeamName(playingTeam);

function setDefaultPropertiesOfTeams() {
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
  let { displayWickets, numOvers } = getHtmlElements();
  hitDelay();
  if (displayWickets.innerHTML == 11 || numOvers == 5) {
    changeInning();
    return;
  }
  displayPlayingBatsmanAndBowler();
  let { runsArray } = runsAndFantasyPointsData();
  let randomRun = Math.floor(Math.random() * runsArray.length);
  incrementBallsAndOvers();
  addTeamFantasyPoints(randomRun);
}

function addTeamFantasyPoints(randomRun) {
  let { displayWickets } = getHtmlElements();
  let { runsArray } = runsAndFantasyPointsData();
  runsArray[randomRun] === "w"
    ? addFantasyPointsToBowlingTeamOnWicket(displayWickets)
    : addTeamFantasyPointsIfHitIsNotWicket(randomRun);
  displayCurrentHitScore(randomRun);
}

function runsAndFantasyPointsData() {
  let runsArray = ["1", "2", "3", "4", "6", "0", "w"];
  let fantasyPointsArray = ["1", "2", "3", "5", "8", "0", "w"];
  return { runsArray, fantasyPointsArray };
}

function getHtmlElements() {
  let hitBtn = document.querySelector("#hitBtn");
  let displayBatsman = document.getElementById("batsmanName");
  let displayBowler = document.getElementById("bowlerName");
  let displayRuns = document.getElementById("runs");
  let displayWickets = document.getElementById("wickets");
  let displayOvers = document.getElementById("overNumber");
  let displayBallNumber = document.getElementById("ballNumber");
  let displayFantasyPoints = document.getElementById("fantasyPoints");
  let displayCurrentHit = document.querySelector(".hitScore h1");
  let displayScoreCommentry = document.querySelector(".commentryBox");
  let numOvers = parseInt(displayOvers.innerHTML);
  let numBalls = parseInt(displayBallNumber.innerHTML);
  return {
    hitBtn,
    displayWickets,
    numOvers,
    displayBatsman,
    displayBowler,
    displayOvers,
    numBalls,
    displayRuns,
    displayFantasyPoints,
    displayBallNumber,
    displayCurrentHit,
    displayScoreCommentry,
  };
}

function addTeamFantasyPointsIfHitIsNotWicket(randomRun) {
  let { displayWickets, displayBatsman, displayFantasyPoints } = getHtmlElements();
  let { runsArray, fantasyPointsArray } = runsAndFantasyPointsData();
  storePlayerFantasyPoints(playingTeam, displayBatsman, fantasyPointsArray[randomRun]);
  storePlayerRuns(playingTeam, displayBatsman, runsArray[randomRun]);
  let player = teams[playingTeam].players[+displayWickets.innerHTML];
  if (player.hasOwnProperty("isCaptain")) {
    addFantasyPointsAccordingToPosition(randomRun, 2);
  } else if (player.hasOwnProperty("isViceCaptain")) {
    addFantasyPointsAccordingToPosition(randomRun, 1.5);
  } else {
    addFantasyPointsAccordingToPosition(randomRun, 1);
  }
  displayFantasyPoints.innerHTML = teams[playingTeam].teamFantasyPoints;
}

function addFantasyPointsToBowlingTeamOnWicket() {
  let { displayWickets, displayBowler } = getHtmlElements();
  if (teams[playingTeam].players[+displayWickets.innerHTML].hasOwnProperty("isCaptain")) {
    teams[1 - playingTeam].teamFantasyPoints += 20;
    storePlayerFantasyPoints(1 - playingTeam, displayBowler, 20);
  } else if (teams[playingTeam].players[+displayWickets.innerHTML].hasOwnProperty("isViceCaptain")) {
    teams[1 - playingTeam].teamFantasyPoints += 15;
    storePlayerFantasyPoints(1 - playingTeam, displayBowler, 15);
  } else {
    teams[1 - playingTeam].teamFantasyPoints += 10;
    storePlayerFantasyPoints(1 - playingTeam, displayBowler, 10);
  }
  displayWickets.innerHTML = parseInt(displayWickets.innerHTML) + 1;
}

function addFantasyPointsAccordingToPosition(randomRun, fPointsOfPosition) {
  let { displayRuns } = getHtmlElements();
  let { runsArray, fantasyPointsArray } = runsAndFantasyPointsData();
  displayRuns.innerHTML = parseInt(displayRuns.innerHTML) + parseInt(runsArray[randomRun]);
  teams[playingTeam].teamFantasyPoints += parseInt(fantasyPointsArray[randomRun]) * fPointsOfPosition;
  if (+runsArray[randomRun] === 0) {
    teams[1 - playingTeam].teamFantasyPoints += fPointsOfPosition;
  }
}

function incrementBallsAndOvers() {
  let { displayBallNumber, displayOvers, numBalls, numOvers } = getHtmlElements();
  numBalls++;
  if (numBalls > 5) {
    numBalls = 0;
    numOvers++;
  }
  displayOvers.innerHTML = numOvers;
  displayBallNumber.innerHTML = numBalls;
}

function changeInning() {
  playingTeam = 1 - playingTeam;
  clearPageAfterInningIsFinished();
  displayBattingBowlingTeamName(playingTeam);
  document.querySelector(".firstInningTargetBox h2").innerHTML = displayTarget();
  playingTeam == 1 ? displayFirstInningFinishedPage() : displayMatchFinishedPage();
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
  let { displayScoreCommentry, numOvers, numBalls } = getHtmlElements();
  let { runsArray } = runsAndFantasyPointsData();
  currentTimeAndDate = dateAndTimeFormate();
  displayScoreCommentry.innerHTML += `<li>Over ${numOvers}.${numBalls} - ${currentTimeAndDate} - ${runsArray[randomRun]}</li>`;
  teams[playingTeam].scoreBoard.push(new ScoreCommentry(numOvers, numBalls, currentTimeAndDate, runsArray[randomRun]));
  displayBowlingTeamFantsyPoints();
}

function displayCurrentHitScore(randomRun) {
  let { runsArray } = runsAndFantasyPointsData();
  let { displayCurrentHit, numBalls } = getHtmlElements();
  let currentTimeAndDate = dateAndTimeFormate();
  displayCurrentHit.innerHTML = `Ball ${numBalls == 0 ? 6 : numBalls} - ${currentTimeAndDate} - ${
    runsArray[randomRun]
  }`;
  displayAndSetScoreCommentry(randomRun);
}

function displayBowlingTeamFantsyPoints() {
  document.querySelector(".bowlingTeamFantasyPoints h2").innerHTML = teams[1 - playingTeam].teamFantasyPoints;
}

function displayPlayingBatsmanAndBowler() {
  let { displayBatsman, displayWickets, displayBowler, displayOvers } = getHtmlElements();
  displayBatsman.innerHTML = teams[playingTeam].players[+displayWickets.innerHTML].name;
  displayBowler.innerHTML = teams[1 - playingTeam].players.filter((player) => player.playingRole === "Bowler")[
    +displayOvers.innerHTML
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
  return teams[1 - playingTeam].scoreBoard.reduce((acc, curr) => {
    if (curr.run === "w") {
      return acc;
    } else {
      return acc + parseInt(curr.run);
    }
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
  let hitBtn = document.querySelector("#hitBtn");
  hitBtn.style.display = "none";
  setTimeout(() => {
    hitBtn.style.display = "flex";
  }, 0);
}

function storePlayerRuns(team, playerName, runs) {
  let { displayBowler } = getHtmlElements();
  let player = teams[team].players.find((player) => player.name === playerName.innerHTML);
  player.runs += +runs;
  if (runs == 0) storePlayerFantasyPoints(1 - team, displayBowler, 1);
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

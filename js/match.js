let teams = [];
teams.push(JSON.parse(localStorage.getItem("team1")));
teams.push(JSON.parse(localStorage.getItem("team2")));
teams[0].scoreBoard = [];
teams[1].scoreBoard = [];
teams[0].fantasyPoints = 0;
teams[1].fantasyPoints = 0;
let playingTeam = 0;

let batTeamName = document.querySelector("#batTeamName");
let bowTeamName = document.querySelector("#bowTeamName");
batTeamName.innerHTML = teams[playingTeam].teamName;
bowTeamName.innerHTML = teams[1 - playingTeam].teamName;

function hitButton() {
  let hitBtn = document.querySelector("#hitBtn");
  hitBtn.style.display = "none";
  hitDelay();
  let displayBatsman = document.getElementById("batsmanName");
  let displayBowler = document.getElementById("bowlerName");
  let displayRuns = document.getElementById("runs");
  let displayWickets = document.getElementById("wickets");
  let displayOvers = document.getElementById("overNumber");
  let displayBallNumber = document.getElementById("ballNumber");
  let displayFantasyPoints = document.getElementById("fantasyPoints");
  let displayCurrentHit = document.querySelector(".hitScore h1");
  let displayScoreCommentry = document.querySelector(".commentryBox");
  let displayBowlingTeamFantasyPoints = document.querySelector(".bowlingTeamFantasyPoints h2");
  let displayFirstInningTarget = document.querySelector(".firstInningTargetBox h2");

  let numOvers = parseInt(displayOvers.innerHTML);
  let numBalls = parseInt(displayBallNumber.innerHTML);

  if (displayWickets.innerHTML == 11 || numOvers == 5) {
    playingTeam = 1 - playingTeam;
    displayOvers.innerHTML = "0";
    displayBallNumber.innerHTML = "0";
    displayWickets.innerHTML = "0";
    displayRuns.innerHTML = "0";
    displayFantasyPoints.innerHTML = "00";
    displayBatsman.innerHTML = "";
    displayBowler.innerHTML = "";
    displayCurrentHit.innerHTML = "";
    displayScoreCommentry.innerHTML = "";
    batTeamName.innerHTML = teams[playingTeam].teamName;
    bowTeamName.innerHTML = teams[1 - playingTeam].teamName;
    displayFirstInningTarget.innerHTML = displayTarget();
    if (playingTeam == 1) {
      document.querySelector(".firstInningFinished h2").innerHTML += displayTarget();
      document.querySelector(".firstInningFinished").style.display = "flex";
    } else {
      document.querySelector(".matchFinished").style.display = "flex";
    }
    return;
  }

  displayBatsman.innerHTML = teams[playingTeam].players[+displayWickets.innerHTML].name;
  displayBowler.innerHTML = teams[1 - playingTeam].players.filter((player) => player.playingRole === "Bowler")[
    +displayOvers.innerHTML
  ].name;

  let runsArray = ["1", "2", "3", "4", "6", "0", "w"];
  let fantasyPointsArray = ["1", "2", "3", "5", "8", "0", "w"];
  let randomRun = Math.floor(Math.random() * runsArray.length);

  numBalls++;
  if (numBalls > 5) {
    numBalls = 0;
    numOvers++;
  }

  if (runsArray[randomRun] === "w") {
    if (teams[playingTeam].players[+displayWickets.innerHTML].hasOwnProperty("isCaptain")) {
      teams[1 - playingTeam].fantasyPoints += 20;
    } else if (teams[playingTeam].players[+displayWickets.innerHTML].hasOwnProperty("isViceCaptain")) {
      teams[1 - playingTeam].fantasyPoints += 15;
    } else {
      teams[1 - playingTeam].fantasyPoints += 10;
    }
    displayWickets.innerHTML = parseInt(displayWickets.innerHTML) + 1;
  } else {
    if (teams[playingTeam].players[+displayWickets.innerHTML].hasOwnProperty("isCaptain")) {
      displayRuns.innerHTML = parseInt(displayRuns.innerHTML) + parseInt(runsArray[randomRun]);
      teams[playingTeam].fantasyPoints += parseInt(fantasyPointsArray[randomRun]) * 2;
      if (+runsArray[randomRun] === 0) {
        teams[1 - playingTeam].fantasyPoints += 2;
      }
    } else if (teams[playingTeam].players[+displayWickets.innerHTML].hasOwnProperty("isViceCaptain")) {
      displayRuns.innerHTML = parseInt(displayRuns.innerHTML) + parseInt(runsArray[randomRun]);
      teams[playingTeam].fantasyPoints += parseInt(fantasyPointsArray[randomRun]) * 1.5;
      if (+runsArray[randomRun] === 0) {
        teams[1 - playingTeam].fantasyPoints += 1.5;
      }
    } else {
      displayRuns.innerHTML = parseInt(displayRuns.innerHTML) + parseInt(runsArray[randomRun]);
      teams[playingTeam].fantasyPoints += parseInt(fantasyPointsArray[randomRun]);
      if (+runsArray[randomRun] === 0) {
        teams[1 - playingTeam].fantasyPoints += 1;
      }
    }
    displayFantasyPoints.innerHTML = teams[playingTeam].fantasyPoints;
  }

  displayOvers.innerHTML = numOvers;
  displayBallNumber.innerHTML = numBalls;

  let currentTimeAndDate = showDate();
  displayCurrentHit.innerHTML = `Ball ${numBalls == 0 ? 6 : numBalls} - ${currentTimeAndDate} - ${
    runsArray[randomRun]
  }`;
  displayScoreCommentry.innerHTML += `<li>Over ${numOvers}.${numBalls
  } - ${currentTimeAndDate} - ${runsArray[randomRun]}</li>`;
  teams[playingTeam].scoreBoard.push(
    new ScoreCommentry(numOvers, numBalls , currentTimeAndDate, runsArray[randomRun])
  );

  displayBowlingTeamFantasyPoints.innerHTML = teams[1 - playingTeam].fantasyPoints;
}

function showDate() {
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
class ScoreCommentry {
  constructor(over, ball, date, run) {
    this.over = over;
    this.ball = ball;
    this.date = date;
    this.run = run;
  }
}

function hitDelay() {
  let hitBtn = document.querySelector("#hitBtn");
  setTimeout(() => {
    hitBtn.style.display = "flex";
  }, 0);
}

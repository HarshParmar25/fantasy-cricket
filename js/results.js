let teams = [];
teams.push(JSON.parse(localStorage.getItem("team1")));
teams.push(JSON.parse(localStorage.getItem("team2")));


function displayTeamNames() {
  let firstTeamName = document.getElementById("firstTeamName");
  let secondTeamName = document.getElementById("secondTeamName");
  firstTeamName.innerHTML = teams[0].teamName;
  secondTeamName.innerHTML = teams[1].teamName;
}
displayTeamNames();

function displayPlayerScore(team, row) {
  let playerList = document.querySelector("#row" + row);
  teams[team].players.forEach((player) => {
    playerList.innerHTML += `<li>${player.name} - Runs(${player.runs}) - Fantasy Points(${player.fantasyPoints})</li>`;
  }
  );
} 
displayPlayerScore(0, 2);
displayPlayerScore(1, 3);

function displayScore(team, row) {
  let scores = document.querySelector("#row" + row);
  scores.innerHTML = `<h2>Runs</h2>
            <h1><span id="runsTeam${team}">${countRuns(team)}</span> / <span id="wicketsTeam${team}">${countWickets(
    team
  )}</span></h1>
            <h2>Overs Played</h2>
            <h1><span id="oversTeam${team}">${
    teams[team].scoreBoard[teams[team].scoreBoard.length - 1].over
  }</span>.<span id="ballsTeam${team}">${teams[team].scoreBoard[teams[team].scoreBoard.length - 1].ball}</span></h1>
            <h2>FantasyPoints</h2>
            <h1><span id="fantasyPointsTeam${team}">${teams[team].teamFantasyPoints}</span></h1>`;
}
displayScore(0, 1);
displayScore(1, 4);

function displayWinner() {
  let winnerBanner = document.querySelector(".gameWinner h2");
  teams[0].fantasyPoints > teams[1].fantasyPoints
    ? (winnerBanner.innerHTML += teams[0].teamName)
    : (winnerBanner.innerHTML += teams[1].teamName);
}
displayWinner();

function countRuns(teamNumber) {
  return teams[teamNumber].scoreBoard.reduce((acc, curr) => {
    if (curr.run === "w") {
      return acc;
    } else {
      return acc + parseInt(curr.run);
    }
  }, 0);
}

function countWickets(teamNumber) {
  return teams[teamNumber].scoreBoard.reduce((acc, curr) => {
    if (curr.run === "w") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
}

function startNextGame() {
  window.location.replace("../html/index.html");
}

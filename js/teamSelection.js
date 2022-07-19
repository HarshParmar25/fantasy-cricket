let teams = [];
teams.push(JSON.parse(localStorage.getItem("team1")));
teams.push(JSON.parse(localStorage.getItem("team2")));
let selectingTeam = 0;

function teamName(teamNumber) {
  document.querySelector(".teamName").innerHTML = "Selecting Team : " + teams[teamNumber].teamName;
}
teamName(selectingTeam);
function addTeamPlayers(e) {
  let displayCredit = document.querySelector("#creditscore > strong");
  if (+displayCredit.innerHTML + +e.target.dataset.credit <= 100 && teams[selectingTeam].players.length < 11) {
    if (e.target != this) {
      teams[selectingTeam].players.push(
        new SelectedPlayers(e.target.dataset.name, e.target.dataset.playingrole, e.target.dataset.credit)
      );
      displayCredit.innerHTML = parseInt(displayCredit.innerHTML) + parseInt(e.target.dataset.credit);
      row2.appendChild(e.target.cloneNode(true));
      e.target.remove();
    }
  } else {
    alert("You have reached the maximum credit limit or Exceeded the maximum number of players");
    return;
  }
}

function removeTeamPlayers(e) {
  if (e.target == document.querySelector("#row2")) {
    return;
  }
  let displayCredit = document.querySelector("#creditscore > strong");
  displayCredit.innerHTML = parseInt(displayCredit.innerHTML) - parseInt(e.target.dataset.credit);
  if (e.target != this) {
    teams[selectingTeam].players.splice(
      teams[selectingTeam].players.findIndex((player) => player.name == e.target.dataset.name),
      1
    );
    row1.appendChild(e.target.cloneNode(true));
    e.target.remove();
  }
}

row1.addEventListener("click", addTeamPlayers);

row2.addEventListener("click", removeTeamPlayers);
function saveTeam() {
  let numBatsman = teams[selectingTeam].players.filter((player) => player.playingRole == "Batsman").length;
  let numBowler = teams[selectingTeam].players.filter((player) => player.playingRole == "Bowler").length;
  let numWicketKeeper = teams[selectingTeam].players.filter((player) => player.playingRole == "Wicketkeeper").length;
  if (numBatsman == 5 && numBowler == 5 && numWicketKeeper == 1) {
    changeSelectingTeam();
  } else {
    alert("You have not selected the required number of players");
  }
}

function addPlayersList(playersArr) {
  let remainingPlayers = playersArr.filter(
    (player) => !teams[1 - selectingTeam].players.some((selectedPlayer) => selectedPlayer.name == player.name)
  );
  let playerList = document.querySelector("#row1");
  remainingPlayers.forEach(function (player) {
    playerList.innerHTML += `<li data-name="${player.name}" data-playingrole="${player.playingRole}" data-credit="${player.credit}">${player.name} -- ${player.playingRole} -- ${player.credit}</li>`;
  });
}
addPlayersList(players);

function captainSelection() {
  localStorage.setItem("team1", JSON.stringify(teams[0]));
  localStorage.setItem("team2", JSON.stringify(teams[1]));
  window.location.replace("../html/captainSelection.html");
}

class SelectedPlayers {
  constructor(name, playingRole, credit) {
    this.name = name;
    this.playingRole = playingRole;
    this.credit = credit;
  }
}

function changeSelectingTeam() {
  let saveButton = document.querySelector("#saveteam");
  let captainSelBtn = document.querySelector("#captainSelection");
  if (selectingTeam == 1) {
    saveButton.innerHTML = "Team Saved";
    saveButton.disabled = true;
    captainSelBtn.disabled = false;
  }
  selectingTeam = 1;
  document.querySelector("#row2").innerHTML = "";
  document.querySelector("#creditscore > strong").innerHTML = 0;
  teamName(selectingTeam);
}

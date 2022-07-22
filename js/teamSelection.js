let teams = [];
let selectingTeam = 0;

getTeamsDataFromLocalStorage();

function displaySelectiongTeamName(teamNumber) {
  document.querySelector(".teamName").innerHTML = "Selecting Team : " + teams[teamNumber].teamName;
}
displaySelectiongTeamName(selectingTeam);

function onClickSaveTeamButton() {
  validatePlayersCount() ? changeSelectingTeam() : alert("You have not selected the required number of players");
}

function addPlayersToSelectingTeam(e) {
  if (creditAndTotalPlayersValidation(e)) {
    if (e.target != this) {
      teams[selectingTeam].players.push(
        new SelectedPlayers(e.target.dataset.name, e.target.dataset.playingrole, e.target.dataset.credit)
      );
      calculateAndDisplayCreditPointsOfTeam("add", e);
      toggleElementsOfPlayerLists(row2, e);
    }
  } else {
    alert("You have reached the maximum credit limit or Exceeded the maximum number of players");
  }
}

function removePlayersFromSelectingTeam(e) {
  if (e.target != this && e.target != document.querySelector("#row2")) {
    teams[selectingTeam].players.splice(
      teams[selectingTeam].players.findIndex((player) => player.name == e.target.dataset.name),
      1
    );
    calculateAndDisplayCreditPointsOfTeam("subtract", e);
    toggleElementsOfPlayerLists(row1, e);
  }
}

row1.addEventListener("click", addPlayersToSelectingTeam);
row2.addEventListener("click", removePlayersFromSelectingTeam);

function creditAndTotalPlayersValidation(e) {
  let displayCredit = document.querySelector("#creditscore > strong");
  return +displayCredit.innerHTML + +e.target.dataset.credit <= 100 && teams[selectingTeam].players.length < 11;
}

function toggleElementsOfPlayerLists(clickedEle, e) {
  clickedEle.appendChild(e.target.cloneNode(true));
  e.target.remove();
}

function displayAllAvailablePlayers(playersArr) {
  let list = document.querySelector("#row1");
  totalRemainingPlayers(playersArr).forEach(function (player) {
    list.innerHTML += `<li data-name="${player.name}" data-playingrole="${player.playingRole}" data-credit="${player.credit}">${player.name} -- ${player.playingRole} -- ${player.credit}</li>`;
  });
}
displayAllAvailablePlayers(players);

function changeSelectingTeam() {
  if (selectingTeam == 1) changeSaveButtonBehaviour();
  selectingTeam = 1;
  emptySelectedPlayersColumn();
  displaySelectiongTeamName(selectingTeam);
}

function emptySelectedPlayersColumn() {
  document.querySelector("#row2").innerHTML = "";
  document.querySelector("#creditscore > strong").innerHTML = 0;
}

function changeSaveButtonBehaviour() {
  let saveButton = document.querySelector("#saveteam");
  let captainSelBtn = document.querySelector("#captainSelection");
  saveButton.innerHTML = "Team Saved";
  saveButton.disabled = true;
  captainSelBtn.disabled = false;
}

function totalRemainingPlayers(playersArr) {
  return playersArr.filter(
    (player) => !teams[1 - selectingTeam].players.some((selectedPlayer) => selectedPlayer.name == player.name)
  );
}

function calculateAndDisplayCreditPointsOfTeam(operation, e) {
  let credit = document.querySelector("#creditscore > strong");
  if (operation == "add") {
    credit.innerHTML = +credit.innerHTML + +e.target.dataset.credit;
  } else {
    credit.innerHTML = +credit.innerHTML - +e.target.dataset.credit;
  }
}

function validatePlayersCount() {
  return (
    countSelectedPlayers("Batsman") == 5 &&
    countSelectedPlayers("Bowler") == 5 &&
    countSelectedPlayers("Wicketkeeper") == 1
  );
}

function countSelectedPlayers(role) {
  return teams[selectingTeam].players.filter((player) => player.playingRole == role).length;
}

function goToCaptainSelectionPage() {
  localStorage.setItem("team1", JSON.stringify(teams[0]));
  localStorage.setItem("team2", JSON.stringify(teams[1]));
  window.location.replace("../html/captainSelection.html");
}

class SelectedPlayers {
  constructor(name, playingRole, credit, runs = 0, fantasyPoints = 0) {
    this.name = name;
    this.playingRole = playingRole;
    this.credit = credit;
    this.runs = runs;
    this.fantasyPoints = fantasyPoints;
  }
}

function getTeamsDataFromLocalStorage() {
  teams.push(JSON.parse(localStorage.getItem("team1")));
  teams.push(JSON.parse(localStorage.getItem("team2")));
}

let teams = [];
let selectingTeam = 0;

function getTeamsDataFromLocalStorage() {
  teams.push(JSON.parse(localStorage.getItem("team1")));
  teams.push(JSON.parse(localStorage.getItem("team2")));
}
getTeamsDataFromLocalStorage();

function displaySelectingTeamName(teamNumber) {
  document.querySelector(".teamName").innerHTML = "Selecting Team : " + teams[teamNumber].teamName;
}
displaySelectingTeamName(selectingTeam);

function onClickSaveTeamButton() {
  validatePlayersCount() ? changeSelectingTeam() : displayMissingPlayers();
}

function displayMissingPlayers() {
  if (countSelectedPlayers("Batsman") != 5) alert("You have to select 5 batsmen");
  if (countSelectedPlayers("Bowler") != 5) alert("You have to select 5 bowlers");
  if (countSelectedPlayers("Wicketkeeper") != 1) alert("You have to select 1 wicketkeeper");
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

function changeSelectingTeam() {
  if (selectingTeam == 1) changeSaveButtonBehaviour();
  selectingTeam = 1;
  emptySelectedPlayersList();
  displaySelectingTeamName(selectingTeam);
}

function changeSaveButtonBehaviour() {
  let saveButton = document.querySelector("#saveteam");
  let captainSelBtn = document.querySelector("#captainSelection");
  saveButton.innerHTML = "Team Saved";
  saveButton.disabled = true;
  captainSelBtn.disabled = false;
}

function emptySelectedPlayersList() {
  document.querySelector("#selectedPlayersList").innerHTML = "";
  document.querySelector("#creditscore > strong").innerHTML = 0;
}

playersPool.addEventListener("click", addPlayersToSelectingTeam);
selectedPlayersList.addEventListener("click", removePlayersFromSelectingTeam);

function addPlayersToSelectingTeam(e) {
  if (!isTeamValid(e)) return;
  if (e.target != this) {
    teams[selectingTeam].players.push(
      new SelectedPlayers(e.target.dataset.name, e.target.dataset.playingrole, e.target.dataset.credit)
    );
    calculateAndDisplayCreditPointsOfTeam("addPlayer", e);
    toggleElementsOfPlayerLists(selectedPlayersList, e);
  }
}

function removePlayersFromSelectingTeam(e) {
  if (e.target != this && e.target != document.querySelector("#selectedPlayersList")) {
    teams[selectingTeam].players.splice(
      teams[selectingTeam].players.findIndex((player) => player.name == e.target.dataset.name),
      1
    );
    calculateAndDisplayCreditPointsOfTeam("removePlayer", e);
    toggleElementsOfPlayerLists(playersPool, e);
  }
}

function isTeamValid(e) {
  if (!isValidCreditCount(e)) alert("You have reached maximum Credit limit!!");
  if (!isValidPlayerCount()) alert("You have exceeded the maximum number of players");
  return isValidCreditCount(e) && isValidPlayerCount();
}

function isValidCreditCount(e) {
  let displayCredit = document.querySelector("#creditscore > strong");
  return +displayCredit.innerHTML + +e.target.dataset.credit <= 100;
}

function isValidPlayerCount() {
  return teams[selectingTeam].players.length < 11;
}

function toggleElementsOfPlayerLists(clickedEle, e) {
  clickedEle.appendChild(e.target.cloneNode(true));
  e.target.remove();
}

function displayAllAvailablePlayers(playersArr) {
  let list = document.querySelector("#playersPool");
  totalRemainingPlayers(playersArr).forEach(function (player) {
    list.innerHTML += `<li data-name="${player.name}" data-playingrole="${player.playingRole}" data-credit="${player.credit}">${player.name} -- ${player.playingRole} -- ${player.credit}</li>`;
  });
}
displayAllAvailablePlayers(players);

function totalRemainingPlayers(playersArr) {
  return playersArr.filter(
    (player) => !teams[1 - selectingTeam].players.some((selectedPlayer) => selectedPlayer.name == player.name)
  );
}

function calculateAndDisplayCreditPointsOfTeam(operation, e) {
  let credit = document.querySelector("#creditscore > strong");
  if (operation == "addPlayer") {
    credit.innerHTML = +credit.innerHTML + +e.target.dataset.credit;
  } else {
    credit.innerHTML = +credit.innerHTML - +e.target.dataset.credit;
  }
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

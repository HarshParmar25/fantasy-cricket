let teams = [];

function getTeamsDataFromLocalStorage() {
  teams.push(JSON.parse(localStorage.getItem("team1")));
  teams.push(JSON.parse(localStorage.getItem("team2")));
}
getTeamsDataFromLocalStorage();

function displayTeamPlayers(team, teamPool) {
  let playerList = document.getElementById(teamPool);
  teams[team].players.forEach(function (player) {
    playerList.innerHTML += `<li data-name="${player.name}" data-playingrole="${player.playingRole}" data-credit="${player.credit}">${player.name} -- ${player.playingRole} -- ${player.credit}</li>`;
  });
}
displayTeamPlayers(0, "firstTeam");
displayTeamPlayers(1, "secondTeam");

function displayTeamNames() {
  let firstTeamName = document.getElementById("firstTeamName");
  let secondTeamName = document.getElementById("secondTeamName");
  firstTeamName.innerHTML = teams[0].teamName;
  secondTeamName.innerHTML = teams[1].teamName;
}
displayTeamNames();

function selectCaptainsForBothTeams(teamNumber, captain) {
  return function (event) {
    toggleColorsAndButtons(captain, event);

    teams[teamNumber].players.forEach(function (player) {
      if (player.hasOwnProperty(captain)) {
        delete player[captain];
      }
      if (event.target.dataset.name === player.name) {
        player[captain] = true;
        chnageColorOfSelectedCaptain(event, captain);
      }
    });
  };
}

function toggleColorsAndButtons(captain, event) {
  if (captain == "isCaptain") {
    changeColorOfPreviouslySelectedCaptain(event, "isCaptain");
    displayViceCaptainSelectionButton();
  } else {
    changeColorOfPreviouslySelectedCaptain(event, "isViceCaptain");
    displayStartMatchButton();
  }
}

function displayStartMatchButton() {
  document.getElementById("viceCaptainSelectionBtn").hidden = true;
  document.getElementById("startMatch").hidden = false;
}

function displayViceCaptainSelectionButton() {
  document.getElementById("viceCaptainSelectionBtn").hidden = false;
}

function chnageColorOfSelectedCaptain(event, captain) {
  event.target.classList.add(captain);
}

function changeColorOfPreviouslySelectedCaptain(event, className) {
  let element = event.target.parentElement.querySelectorAll("li");
  element.forEach(function (player) {
    if (player.classList.contains(className)) {
      player.classList.remove(className);
    }
  });
}

let selectCaptainForFirstTeam = selectCaptainsForBothTeams(0, "isCaptain");
let selectCaptainForSecondTeam = selectCaptainsForBothTeams(1, "isCaptain");

function captainSelectionBtn() {
  firstTeam.addEventListener("click", selectCaptainForFirstTeam);
  secondTeam.addEventListener("click", selectCaptainForSecondTeam);
}
captainSelectionBtn();

function viceCaptainSelectionBtn() {
  removeCaptonSelectionButtonListners();
  document.getElementById("captainViceCaptainSelection").innerHTML = "Vice Captain Selection";
  firstTeam.addEventListener("click", selectCaptainsForBothTeams(0, "isViceCaptain"));
  secondTeam.addEventListener("click", selectCaptainsForBothTeams(1, "isViceCaptain"));
}

function removeCaptonSelectionButtonListners() {
  firstTeam.removeEventListener("click", selectCaptainForFirstTeam);
  secondTeam.removeEventListener("click", selectCaptainForSecondTeam);
}

function onClickStartMatchButton() {
  localStorage.setItem("team1", JSON.stringify(teams[0]));
  localStorage.setItem("team2", JSON.stringify(teams[1]));
  window.location.replace("../html/match.html");
}

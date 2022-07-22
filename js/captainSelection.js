let teams = [];
getTeamsDataFromLocalStorage();

function getTeamsDataFromLocalStorage() {
  teams.push(JSON.parse(localStorage.getItem("team1")));
  teams.push(JSON.parse(localStorage.getItem("team2")));
}

function displayTeamPlayers(team, row) {
  let playerList = document.querySelector("#row" + row);
  teams[team].players.forEach(function (player) {
    playerList.innerHTML += `<li data-name="${player.name}" data-playingrole="${player.playingRole}" data-credit="${player.credit}">${player.name} -- ${player.playingRole} -- ${player.credit}</li>`;
  });
}
displayTeamPlayers(0, 1);
displayTeamPlayers(1, 2);

function displayTeamNames() {
  let firstTeamName = document.getElementById("firstTeamName");
  let secondTeamName = document.getElementById("secondTeamName");
  firstTeamName.innerHTML = teams[0].teamName;
  secondTeamName.innerHTML = teams[1].teamName;
}
displayTeamNames();

function selectCaptain(teamNumber) {
  return function (event) {
    changeColorOfPreviouslySelectedCaptain(event, "captainColor");
    teams[teamNumber].players.forEach(function (player) {
      if (player.hasOwnProperty("isCaptain")) {
        delete player.isCaptain;
      }
      if (event.target.dataset.name === player.name) {
        player.isCaptain = true;
        event.target.classList.add("captainColor");
      }
    });
    if (teamNumber == 1) {
      document.getElementById("viceCaptainSelectionBtn").hidden = false;
    }
  };
}

function selectViceCaptain(teamNumber) {
  return function (event) {
    changeColorOfPreviouslySelectedCaptain(event, "viceCaptainColor");
    document.getElementById("viceCaptainSelectionBtn").hidden = true;
    teams[teamNumber].players.forEach(function (player) {
      if (player.hasOwnProperty("isViceCaptain")) {
        delete player.isViceCaptain;
      }
      if (event.target.dataset.name === player.name && !event.target.classList.contains("captainColor")) {
        player.isViceCaptain = true;
        event.target.classList.add("viceCaptainColor");
      }
    });
    if (teamNumber == 1) {
      document.getElementById("startMatch").hidden = false;
    }
  };
}

function changeColorOfPreviouslySelectedCaptain(event, className) {
  let element = event.target.parentElement.querySelectorAll("li");
  element.forEach(function (player) {
    if (player.classList.contains(className)) {
      player.classList.remove(className);
    }
  });
}

let selectCaptainForFirstTeam = selectCaptain(0);
let selectCaptainForSecondTeam = selectCaptain(1);

function captainSelectionBtn() {
  row1.addEventListener("click", selectCaptainForFirstTeam);
  row2.addEventListener("click", selectCaptainForSecondTeam);
}
captainSelectionBtn();

function viceCaptainSelectionBtn() {
  removeCaptonSelectionButtonListners();
  document.getElementById("captainViceCaptainSelection").innerHTML = "Vice Captain Selection";
  row1.addEventListener("click", selectViceCaptain(0));
  row2.addEventListener("click", selectViceCaptain(1));
}

function removeCaptonSelectionButtonListners() {
  row1.removeEventListener("click", selectCaptainForFirstTeam);
  row2.removeEventListener("click", selectCaptainForSecondTeam);
}

function onClickStartMatchButton() {
  localStorage.setItem("team1", JSON.stringify(teams[0]));
  localStorage.setItem("team2", JSON.stringify(teams[1]));
  window.location.replace("../html/match.html");
}


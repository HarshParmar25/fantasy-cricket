localStorage.clear();
let teams = [
  (tossWinner = {
    teamName: "",
    players: [],
  }),
  (tossLooser = {
    teamName: "",
    players: [],
  }),
];
let showTossWinnerTeam = document.getElementById("result");

function onClickTossButton() {
  if(isNotValidTeamName()) return;
  let toss = Math.floor(Math.random() * 2);
  toss == 0 ? setTeamName(0) : setTeamName(1);
}

function isNotValidTeamName() {
  let { team1, team2 } = getTeamNames();
  if (team2 == "" || team1 == "") {
    showTossWinnerTeam.innerHTML = "Please enter team name";
    return true
  }
}

function setTeamName(teamNumber) {
  let { team1, team2 } = getTeamNames();
  teams[teamNumber].teamName = team1;
  teams[1 - teamNumber].teamName = team2;
  showTossWinnerTeam.innerHTML = `${teams[0].teamName} won the toss and elected to bat first`;
  document.querySelector("#teamSelBtn").hidden = false;
}

 function getTeamNames() {
   let team1 = document.querySelector("#team1").value;
   let team2 = document.querySelector("#team2").value;
   return { team1, team2 };
 }

function clearTossPage() {
  localStorage.setItem("team1", JSON.stringify(teams[0]));
  localStorage.setItem("team2", JSON.stringify(teams[1]));
  window.location.replace("../html/teamSelection.html");
}

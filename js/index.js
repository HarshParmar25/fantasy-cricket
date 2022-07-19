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
function toss() {
  let team1 = document.querySelector("#team1").value;
  let team2 = document.querySelector("#team2").value;
  let result = document.getElementById("result");
  let toss = Math.floor(Math.random() * 2);
  if (team2 == "" || team1 == "") {
    result.innerHTML = "Please enter team name";
  } else {
    if (toss == 0) {
      result.innerHTML = `${team1} won the toss and elected to bat first`;
      teams[0].teamName = team1;
      teams[1].teamName = team2;
    } else {
      result.innerHTML = `${team2} won the toss and elected to bat first`;
      teams[0].teamName = team2;
      teams[1].teamName = team1;
    }
    document.querySelector('#teamSelBtn').hidden = false;
  }
  return teams;
}

function clearTossPage() {
  localStorage.setItem("team1", JSON.stringify(teams[0]));
  localStorage.setItem("team2", JSON.stringify(teams[1]));
  window.location.replace("../html/teamSelection.html");
}

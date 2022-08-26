import { Team } from "../modules/team.js";
import { Toss } from "../modules/toss.js";

localStorage.clear();
export let teams = [];
const tossButton = document.getElementById("toss");
const teamSelectionButton = document.querySelector("#teamSelectionButton");

tossButton.addEventListener("click", () => {
  Toss.createTeam();
  if (teams.length) teamSelectionButton.hidden = false;
});

teamSelectionButton.addEventListener("click", () => {
  localStorage.setItem("team1", JSON.stringify(teams[0]));
  localStorage.setItem("team2", JSON.stringify(teams[1]));
  window.location.replace("../html/teamSelection.html");
});

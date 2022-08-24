import { runsData } from "./modules/runsData.js";
import { Team } from "./modules/team.js";
import { Player } from "./modules/player.js";
import { Match } from "./modules/match.js";

// const team1Input = document.querySelector("#team1").value;
// const team2Input = document.querySelector("#team2").value;
const tossButton = document.querySelector("#toss");
const teams = {
  tossWinner: undefined,
};

tossButton.addEventListener("click", () => {
  // teams.team1 = Team.createTeam(document.querySelector("#team1").value);
  // teams.team2 = Team.createTeam(document.querySelector("#team2").value);
  // teams.team3 = Team.createTeam('harsh')
  teams.team1 = new Team("harsh");
  console.log(teams);
});

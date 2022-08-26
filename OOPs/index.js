import { runsData, playingRules } from "./modules/rules.js";
import { Match } from "./modules/match.js";
import { team1, team2 } from "./teamFormation.js";

console.log(playingRules)

export const scoreBoard = [
  {
    runs: "w",
  },
];
const usecase = Match.isDismissalDuck(scoreBoard);
console.log(usecase);


let currentHit = runsData[Math.floor(Math.random() * (runsData.length - 1))].run;

team1.teamMembers[0].setPoints(currentHit);
team1.setTeamFantasyPoints();
team1.setTeamRuns();
console.log(currentHit);

console.log(team1)
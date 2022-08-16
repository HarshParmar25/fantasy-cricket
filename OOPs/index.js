import { runsData } from "./modules/runsData.js";
import { Team } from "./modules/team.js";
import { Player } from "./modules/player.js";
import { Match } from "./modules/match.js";

const team1 = new Team("CSK");
const team2 = new Team("RCB");
export const scoreBoard = [
  {
    runs: "w",
  },
];

team1.addTeamMember(new Player("Sachin", 11, "Batsman", 0, 0));
team1.addTeamMember(new Player("Dhoni", 12, "Batsman", 0, 0));
team1.addTeamMember(new Player("Virat", 13, "Batsman", 0, 0));
team1.addTeamMember(new Player("Rohit", 14, "Bowler", 0, 0));
team1.addTeamMember(new Player("Shikhar", 15, "Bowler", 0, 0));

team2.addTeamMember(new Player("Kohli", 11, "Batsman", 0, 0));
team2.addTeamMember(new Player("Raina", 12, "Bowler", 0, 0));
team2.addTeamMember(new Player("Jadeja", 13, "Batsman", 0, 0));
team2.addTeamMember(new Player("Michel", 14, "Batsman", 0, 0));
team2.addTeamMember(new Player("Bumrah", 15, "Bowler", 0, 0));

team1.teamMembers[0].isCaptain = true;
team2.teamMembers[0].isCaptain = true;

team1.teamMembers[1].isViceCaptain = true;
team2.teamMembers[1].isViceCaptain = true;

let currentHit = runsData[Math.floor(Math.random() * (runsData.length - 1))].run;

team1.teamMembers[0].setPoints(currentHit);
team1.setTeamFantasyPoints();
team1.setTeamRuns();
console.log(team1);
console.log(currentHit);

console.log(team1.isDismissalDuck(scoreBoard));

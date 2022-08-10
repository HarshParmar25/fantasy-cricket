import { runsData } from "./modules/runsData.js";
import { Team } from "./modules/team.js";
import { Player } from "./modules/player.js";
import { Match } from "./modules/match.js";

const CSK = new Team("CSK");
const RCB = new Team("RCB");

CSK.addTeamMember(new Player("Sachin", 11, "Batsman", 0, 0));
CSK.addTeamMember(new Player("Dhoni", 12, "Batsman", 0, 0));
CSK.teamMembers[0].isCaptain = true;
CSK.teamMembers[0].setRuns(10);
CSK.teamMembers[0].setFantasyPoints(10);

console.log(CSK.getTeamMembers());

console.log(Match.startMatch());
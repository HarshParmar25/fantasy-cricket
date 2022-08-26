import { Team } from "./modules/team.js";
import { Player } from "./modules/player.js";

const team1 = Team.createTeam("RCB");
const team2 = Team.createTeam("CSK");

team1.addTeamMember(new Player("M S Dhoni", 12, "Batsman", 0, 0));
team1.addTeamMember(new Player("Virat Kohli", 11, "Batsman", 0, 0));
team1.addTeamMember(new Player("Jasprit Bumrah", 9, "Batsman", 0, 0));
team1.addTeamMember(new Player("Rohit Sharma", 8, "Bowler", 0, 0));
team1.addTeamMember(new Player("Yuzvendra Chahal", 10, "Bowler", 0, 0));
team1.addTeamMember(new Player("Mohammed Shami", 11, "Batsman", 0, 0));
team1.addTeamMember(new Player("Suryakumar Yadav", 8, "Batsman", 0, 0));
team1.addTeamMember(new Player("Prasidh Krishna", 9, "Wicketkeeper", 0, 0));
team1.addTeamMember(new Player("Hardik Pandya", 6, "Bowler", 0, 0));
team1.addTeamMember(new Player("Shikhar Dhawan", 6, "Bowler", 0, 0));
team1.addTeamMember(new Player("Ravindra Jadeja", 4, "Bowler", 0, 0));

team2.addTeamMember(new Player("Arshdeep Singh", 11, "Batsman", 0, 0));
team2.addTeamMember(new Player("Ravichandran Ashwin", 11, "Batsman", 0, 0));
team2.addTeamMember(new Player("Deepak Chahar", 12, "Batsman", 0, 0));
team2.addTeamMember(new Player("Ruturaj Gaikwad", 9, "Batsman", 0, 0));
team2.addTeamMember(new Player("Deepak Hooda", 8, "Bowler", 0, 0));
team2.addTeamMember(new Player("Ishan Kishan", 10, "Bowler", 0, 0));
team2.addTeamMember(new Player("Shreyas Iyer", 11, "Batsman", 0, 0));
team2.addTeamMember(new Player("Venkatesh Iyer", 8, "Bowler", 0, 0));
team2.addTeamMember(new Player("Dinesh Karthik", 9, "Wicketkeeper", 0, 0));
team2.addTeamMember(new Player("Kuldeep Yadav", 6, "Bowler", 0, 0));
team2.addTeamMember(new Player("Bhuvneshwar Kumar", 6, "Bowler", 0, 0));



team1.getPlayerByName("M S Dhoni").setCaptain();
team2.getPlayerByName("Arshdeep Singh").setCaptain();

team1.getPlayerByName("Virat Kohli").setViceCaptain();
team2.getPlayerByName("Ravichandran Ashwin").setViceCaptain();


export { team1, team2 };

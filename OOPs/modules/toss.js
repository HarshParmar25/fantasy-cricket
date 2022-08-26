import { Team } from "./team.js";
import { teams } from "../controller/index.js";

class Toss {
  static result = document.getElementById("result");
  static getTeamNamesInput() {
    return {
      team1: document.querySelector("#team1").value,
      team2: document.querySelector("#team2").value,
    };
  }

  static isTeamNameEmpty() {
    let { team1, team2 } = this.getTeamNamesInput();
    if (team2 == "" || team1 == "") {
      this.result.innerHTML = "Please enter team name.";
      return true;
    }
  }

  static sameTeamName() {
    let { team1, team2 } = this.getTeamNamesInput();
    if (team2 == team1) {
      this.result.innerHTML = "Team names should be different.";
      return true;
    }
  }

  static isValidTeamName() {
    return !this.isTeamNameEmpty() && !this.sameTeamName();
  }

  static tossWinner() {
    let { team1, team2 } = this.getTeamNamesInput();
    if (Math.random() < 0.5) {
      teams[0] = Team.createTeam(team1);
      teams[1] = Team.createTeam(team2);
    } else {
      teams[0] = Team.createTeam(team2);
      teams[1] = Team.createTeam(team1);
    }
  }

  static showTossWinnerTeam() {
    result.innerHTML = `${teams[0].teamName} won the toss and elected to bat first`;
  }

  static createTeam() {
    if (!this.isValidTeamName()) return;
    this.tossWinner(teams);
    Toss.showTossWinnerTeam(teams);
    return teams;
  }
}

export { Toss };

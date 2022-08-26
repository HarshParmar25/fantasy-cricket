import { runsData } from "./rules.js";
import { Team } from "./team.js";

class Player {
  constructor(name, credit, role) {
    this.name = name;
    this.credit = credit;
    this.role = role;
    this.runs = 0;
    this.fantasyPoints = 0;
  }

  getName() {
    return this.name;
  }

  getCredit() {
    return this.credit;
  }

  getPlayingRole() {
    return this.playingRole;
  }

  getRuns() {
    return this.runs;
  }

  getFantasyPoints() {
    return this.fantasyPoints;
  }

  setCaptain() {
    this.captain = true;
  }

  setViceCaptain() {
    this.viceCaptain = true;
  }

  setPoints(runs) {
    this.setRuns(runs);
    this.setFantasyPoints(runs);
  }

  setRuns(runs) {
    this.runs += runs;
  }

  setFantasyPoints(runs) {
    let fPoints = runsData.find((points) => points.run === runs).fantasyPoints;
    this.fantasyPoints += +fPoints * this.getPlayerPositionBonus();
  }

  getPlayerPositionBonus() {
    if (this.hasOwnProperty("isCaptain")) return 2;
    if (this.hasOwnProperty("isViceCaptain")) return 1.5;
    return 1;
  }
}

export { Player };

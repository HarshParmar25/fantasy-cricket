class Player {
  constructor(name, credit, playingRole, runs = 0, fantasyPoints = 0) {
    this.name = name;
    this.credit = credit;
    this.playingRole = playingRole;
    this.runs = runs;
    this.fantasyPoints = fantasyPoints;
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

  setRuns(runs) {
    this.runs += runs;
  }

  setFantasyPoints(fPoints) {
    this.fantasyPoints += +fPoints * this.getPlayerPositionBonus();
  }

  getPlayerPositionBonus() {
    if (this.hasOwnProperty("isCaptain")) return 2;
    if (this.hasOwnProperty("isViceCaptain")) return 1.5;
    return 1;
  }
}

export { Player };

class ScoreBoard {
  constructor(name, runs, fantasyPoints) {
    this.name = name;
    this.runs = runs;
    this.fantasyPoints = fantasyPoints;
  }
  getName() {
    return this.name;
  }
  getRuns() {
    return this.runs;
  }
  getFantasyPoints() {
    return this.fantasyPoints;
  }
  setName(name) {
    this.name = name;
  }
  setRuns(runs) {
    this.runs += runs;
  }
  setFantasyPoints(fantasyPoints) {
    this.fantasyPoints += fantasyPoints;
  }
}

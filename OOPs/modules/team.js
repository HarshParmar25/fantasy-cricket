class Team {
  constructor(teamName) {
    this.teamName = teamName;
    this.teamMembers = [];
    this.teamFantasyPoints = 0;
    this.teamRuns = 0;
    this.wickets = 0;
  }

  getTeamMembers() {
    return this.teamMembers;
  }

  addTeamMember(teamMember) {
    this.teamMembers.push(teamMember);
  }

  removeTeamMember(teamMember) {
    this.teamMembers.splice(
      this.teamMembers.findIndex((player) => player.name === teamMember),
      1
    );
  }

  getTeamName() {
    return this.teamName;
  }

  getTeamFantasyPoints() {
    return this.teamMembers;
  }

  getTeamRuns() {
    return this.teamRuns;
  }

  setTeamName(teamName) {
    console.log(this);
    this.teamName = teamName;
  }

  setTeamFantasyPoints() {
    this.teamFantasyPoints += this.teamMembers
      .map((player) => {
        return player.fantasyPoints;
      })
      .reduce((a, b) => a + b);
  }

  setTeamRuns(teamRuns) {
    this.teamRuns += this.teamMembers
      .map((player) => {
        return player.runs;
      })
      .reduce((a, b) => a + b);
  }

  setWicket() {
    this.wickets += 1;
  }

  isDismissalDuck(scoreBoard) {
    if (scoreBoard.length >= 1) return scoreBoard[scoreBoard.length - 1].runs === "w";
    return false;
  }
}

export { Team };

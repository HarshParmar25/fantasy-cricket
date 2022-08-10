class Team {
  constructor(teamName, teamFantasyPoints = 0, teamRuns = 0) {
    this.teamName = teamName;
    this.teamMembers = [];
    this.teamFantasyPoints = teamFantasyPoints;
    this.teamRuns = teamRuns;
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

  setTeamFantasyPoints(teamFantasyPoints) {
    this.teamFantasyPoints += teamFantasyPoints;
  }

  setTeamRuns(teamRuns) {
    this.teamRuns += teamRuns;
  }
}

export { Team };

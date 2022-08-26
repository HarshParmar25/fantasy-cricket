import { playingRules } from "./rules.js";

class Validate {
  static teamNameInput(team1Name, team2Name) {
    return team1Name !== team2Name && team1Name !== "" && team2Name !== "";
  }

  static numberOfPlayer(players) {
    return players.length == playingRules.playersCount;
  }

  static creditLimit(players) {
    return players.reduce((total, player) => total + player.credit, 0) <= playingRules.creditCount;
  }

  static numberOfBatsman(players) {
    return players.filter((player) => player.role == "Batsman").length == playingRules.batsmanCount;
  }

  static numberOfBowler(players) {
    return players.filter((player) => player.role == "Bowler").length == playingRules.bowlerCount;
  }

  static numberOfWicketkeeper(players) {
    return players.filter((player) => player.role == "Wicketkeeper").length == playingRules.wicketkeeperCount;
  }

  static captain(players) {
    return players.filter((player) => player.captain == true).length === 1;
  }

  static viceCaptain(players) {
    return players.filter((player) => player.viceCaptain == true).length === 1;
  }

  static isCaptainIsViceCaptain(players) {
    return players.filter((player) => player.captain == true && player.viceCaptain == true).length !== 0;
  }
}

const team1Vali = Validate.numberOfPlayer(team2.teamMembers);
console.log(team1Vali);

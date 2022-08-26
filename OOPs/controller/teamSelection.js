import { players } from "../playersInfo.js";
import { Team } from "../modules/team.js";
import { Player } from "../modules/player.js";

let teams = [];
teams.push(JSON.parse(localStorage.getItem("team1")));
teams.push(JSON.parse(localStorage.getItem("team2")));
console.log(teams[0]);

class PlayersPool {
  static selectingTeam = 0;

  static populatePlayersPool() {
    let list = document.querySelector("#playersPool");
    this.remainingPlayers().forEach((player) => {
      list.innerHTML += `<li data-playerid="${player.id}">${player.name} -- ${player.playingRole} -- ${player.credit}</li>`;
    });
  }

  static remainingPlayers() {
    return players.filter(
      (player) => !teams[1 - this.selectingTeam].teamMembers.some((selectedPlayer) => selectedPlayer.id == player.id)
    );
  }

  static addPlayerToTeam(playerId) {
    let player = players.find((player) => player.id == playerId);
    teams[this.selectingTeam].teamMembers.push(player);
    this.updateTeam();
  }
}

PlayersPool.populatePlayersPool();

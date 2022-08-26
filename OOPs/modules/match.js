// import { scoreBoard } from "../index.js";

class Match {
  static startMatch() {
    console.log("Match started");
  }

  static isDismissalDuck(scoreBoard) {
    return scoreBoard[scoreBoard.length - 1].runs == "w";
  }
}

export { Match };

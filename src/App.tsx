import React, { useEffect, useState } from "react";
import "./App.css";
import { BoardComponent } from "./components/BoardComponent";
import { Board } from "./models/Board";
import { Colors } from "./utils/Colors";
import { Player } from "./models/Player";

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setblackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  function restart() {
    const newBoard = new Board();
    newBoard.InitCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }
  useEffect(() => restart(), []);

  function changePlayer() {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }
  return (
    <div className="app">
      <BoardComponent
        board={board}
        currentPlayer={currentPlayer}
        changePlayer={changePlayer}
      />
    </div>
  );
}

export default App;

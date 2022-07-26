import { FC, Fragment, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { King } from "../models/figures/King";
import { Player } from "../models/Player";
import { letters } from "../utils/BoardEdge";
import { CellComponent } from "./CellComponent";

interface BoardProps {
  board: Board;
  currentPlayer: Player | null;
  changePlayer: () => void;
}
export const BoardComponent: FC<BoardProps> = ({
  board,
  currentPlayer,
  changePlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell, board, selectedCell)
    ) {
      if (
        selectedCell.figure instanceof King &&
        selectedCell.y === cell.y &&
        Math.abs(selectedCell.x - cell.x) === 2
      ) {
        board.castle(selectedCell, cell);
      } else {
        selectedCell.moveFigure(cell);
      }

      changePlayer();
      highlightCells(null);
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        highlightCells(cell);
        setSelectedCell(cell);
      }
    }
  }

  function highlightCells(cell: Cell | null) {
    board.highlightCells(cell);
  }

  return (
    <div className="board">
      {board.cells.map((item, index) => (
        <Fragment key={index}>
          {item.map((cell, pos) => (
            <div>
              {index === 0 && <div className="cellEdge">{letters[pos]}</div>}

              <CellComponent
                cell={cell}
                key={cell.id}
                click={click}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell.y
                }
              />
              {index === 7 && <div className="cellEdge">{letters[pos]}</div>}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
};

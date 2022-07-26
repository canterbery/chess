import { Colors } from "../../utils/Colors";
import { Figure, FigureNames } from "./Figure";
import blackKing from "../../assets/black_king.png";
import whiteKing from "../../assets/white_king.png";
import { Board } from "../Board";
import { Cell } from "../Cell";
import { Rook } from "./Rook";

export class King extends Figure {
  isFirstMove: boolean = true;
  constructor(color: Colors) {
    super(color);
    this.img = color === Colors.BLACK ? blackKing : whiteKing;
    this.name = FigureNames.KING;
  }
  canMove(target: Cell, board: Board, source: Cell): boolean {
    if (!super.canMove(target, board, source)) return false;

    const dx = Math.abs(source.x - target.x);
    const dy = Math.abs(source.y - target.y);

    if ((dx === 0 || dx === 1) && (dy === 0 || dy === 1)) {
      return !board.isUnderAttack(target, source);
    }

    if (this.isFirstMove && dx === 2 && dy === 0) {
      return this.canCastle(target, board, source);
    }

    return false;
  }
  canAttack(target: Cell, board: Board, source: Cell): boolean {
    const dx = Math.abs(source.x - target.x);
    const dy = Math.abs(source.y - target.y);

    if ((dx === 0 || dx === 1) && (dy === 0 || dy === 1)) return true;

    return false;
  }
  canCastle(target: Cell, board: Board, source: Cell) {
    if (
      board.isKingUnderAttack(
        source,
        this.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE
      )
    )
      return false;
    const dx = source.x - target.x;

    if (dx === -2) {
      const cell = board.getCell(7, this.color === Colors.WHITE ? 7 : 0);
      if (
        cell.figure instanceof Rook &&
        cell.figure.isFirstMove &&
        board.isEmptyHorizontal(source, cell)
      )
        return true;
    }
    if (dx === 2) {
      const cell = board.getCell(0, this.color === Colors.WHITE ? 7 : 0);
      if (
        cell.figure instanceof Rook &&
        cell.figure.isFirstMove &&
        board.isEmptyHorizontal(source, cell)
      )
        return true;
    }

    return false;
  }
}

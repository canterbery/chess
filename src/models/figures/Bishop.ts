import { Board } from "../Board";
import { Colors } from "../../utils/Colors";
import { Figure, FigureNames } from "./Figure";
import blackBishop from "../../assets/black_bishop.png";
import whiteBishop from "../../assets/white_bishop.png";
import { Cell } from "../Cell";

export class Bishop extends Figure {
  constructor(color: Colors) {
    super(color);
    this.img = color === Colors.BLACK ? blackBishop : whiteBishop;
    this.name = FigureNames.BISHOP;
  }
  canMove(target: Cell, board: Board, source: Cell): boolean {
    if (!super.canMove(target, board, source)) return false;
    return this.canAttack(target, board, source);
  }
  canAttack(target: Cell, board: Board, source: Cell): boolean {
    if (board.isEmptyDiagonal(source, target)) return true;
    return false;
  }
}

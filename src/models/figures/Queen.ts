import { Colors } from "../../utils/Colors";
import { Figure, FigureNames } from "./Figure";
import blackQueen from "../../assets/black_queen.png";
import whiteQuenn from "../../assets/white_queen.png";
import { Board } from "../Board";
import { Cell } from "../Cell";

export class Queen extends Figure {
  constructor(color: Colors) {
    super(color);
    this.img = color === Colors.BLACK ? blackQueen : whiteQuenn;
    this.name = FigureNames.QUEEN;
  }
  canMove(target: Cell, board: Board, source: Cell): boolean {
    if (!super.canMove(target, board, source)) return false;

    return this.canAttack(target, board, source);
  }
  canAttack(target: Cell, board: Board, source: Cell): boolean {
    if (board.isEmptyVertical(source, target)) return true;
    if (board.isEmptyHorizontal(source, target)) return true;
    if (board.isEmptyDiagonal(source, target)) return true;
    return false;
  }
}

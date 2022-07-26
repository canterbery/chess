import { Colors } from "../../utils/Colors";
import { Figure, FigureNames } from "./Figure";
import blackRook from "../../assets/black_rook.png";
import whiteRook from "../../assets/white_rook.png";
import { Board } from "../Board";
import { Cell } from "../Cell";

export class Rook extends Figure {
  isFirstMove: boolean = true;
  constructor(color: Colors) {
    super(color);
    this.img = color === Colors.BLACK ? blackRook : whiteRook;
    this.name = FigureNames.ROOK;
  }
  canMove(target: Cell, board: Board, source: Cell): boolean {
    if (!super.canMove(target, board, source)) return false;

    return this.canAttack(target, board, source);
  }
  canAttack(target: Cell, board: Board, source: Cell): boolean {
    if (board.isEmptyVertical(source, target)) return true;
    if (board.isEmptyHorizontal(source, target)) return true;

    return false;
  }
}

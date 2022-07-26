import { Colors } from "../../utils/Colors";
import { Figure, FigureNames } from "./Figure";
import blackPawn from "../../assets/black_pawn.png";
import whitePawn from "../../assets/white_pawn.png";
import { Board } from "../Board";
import { Cell } from "../Cell";

export class Pawn extends Figure {
  isFirstMove: boolean = true;
  constructor(color: Colors) {
    super(color);
    this.img = color === Colors.BLACK ? blackPawn : whitePawn;
    this.name = FigureNames.PAWN;
  }
  canAttack(target: Cell, board: Board, source: Cell): boolean {
    const direction = this.color === Colors.WHITE ? -1 : 1;
    if (
      target.y === source.y + 1 * direction &&
      (target.x === source.x - 1 || target.x === source.x + 1)
    ) {
      return source.isEnemy(target);
    }

    return false;
  }
  canMove(target: Cell, board: Board, source: Cell): boolean {
    if (!super.canMove(target, board, source)) return false;
    const direction = this.color === Colors.WHITE ? -1 : 1;

    if (
      source.x === target.x &&
      (target.y === source.y + 1 * direction ||
        (this.isFirstMove && target.y === source.y + 2 * direction))
    ) {
      if (
        board.isEmptyVertical(source, target) &&
        board.getCell(target.x, target.y).isEmpty()
      )
        return true;
    }

    if (this.canAttack(target, board, source)) return true;

    return false;
  }
}

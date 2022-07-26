import { Colors } from "../../utils/Colors";
import { Figure, FigureNames } from "./Figure";
import blackKnight from "../../assets/black_knight.png";
import whiteKnight from "../../assets/white_knight.png";
import { Board } from "../Board";
import { Cell } from "../Cell";

export class Knight extends Figure {
  constructor(color: Colors) {
    super(color);
    this.img = color === Colors.BLACK ? blackKnight : whiteKnight;
    this.name = FigureNames.KNIGHT;
  }
  canMove(target: Cell, board: Board, source: Cell): boolean {
    if (!super.canMove(target, board, source)) return false;
    return this.canAttack(target, board, source);
  }
  canAttack(target: Cell, board: Board, source: Cell): boolean {
    const dx = Math.abs(source.x - target.x);
    const dy = Math.abs(source.y - target.y);

    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}

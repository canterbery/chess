import { Board } from "../Board";
import { Colors } from "../../utils/Colors";
import img from "../../assets/black_king.png";
import { Cell } from "../Cell";

export enum FigureNames {
  KING = "King",
  QUEEN = "Queen",
  BISHOP = "Bishop",
  KNIGHT = "Knight",
  ROOK = "Rook",
  PAWN = "Pawn",
}

export class Figure {
  color: Colors;
  name: FigureNames | null;
  img: typeof img | null;
  id: number;

  constructor(color: Colors) {
    this.color = color;
    this.img = null;
    this.name = null;
    this.id = Math.random();
  }

  canMove(target: Cell, board: Board, source: Cell) {
    if (this.color === target.figure?.color) return false;
    //  if (target.figure?.name === FigureNames.KING) return false;
    return true;
  }
  canAttack(target: Cell, board: Board, source: Cell) {
    return false;
  }
}

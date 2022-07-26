import { Rook } from "./figures/Rook";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";
import { Colors } from "../utils/Colors";
import { Figure } from "./figures/Figure";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  id: number;
  avaliable: boolean;

  constructor(x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.avaliable = false;
    this.id = Math.random();
  }

  moveFigure(target: Cell) {
    if (this.figure) {
      if (
        this.figure instanceof Pawn ||
        this.figure instanceof King ||
        this.figure instanceof Rook
      ) {
        this.figure.isFirstMove = false;
      }
      target.figure = this.figure;
      this.figure = null;
    }
  }
  isEmpty() {
    return this.figure === null;
  }
  isEnemy(target: Cell) {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }
}

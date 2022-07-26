import { Rook } from "./figures/Rook";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";
import { Cell } from "./Cell";
import { Colors } from "../utils/Colors";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { FigureNames } from "./figures/Figure";

export class Board {
  cells: Cell[][] = [];
  public InitCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }
  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public highlightCells(currentCell: Cell | null) {
    for (let i = 0; i < 8; i++) {
      let row = this.cells[i];
      for (let j = 0; j < 8; j++) {
        const target = row[j];
        target.avaliable = !!currentCell?.figure?.canMove(
          target,
          this,
          currentCell
        );
      }
    }
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      this.cells[1][i].figure = new Pawn(Colors.BLACK);
      this.cells[6][i].figure = new Pawn(Colors.WHITE);
    }
  }
  private addKings() {
    this.cells[0][4].figure = new King(Colors.BLACK);
    this.cells[7][4].figure = new King(Colors.WHITE);
  }
  private addQueens() {
    this.cells[0][3].figure = new Queen(Colors.BLACK);
    this.cells[7][3].figure = new Queen(Colors.WHITE);
  }
  private addBishops() {
    this.cells[0][2].figure = new Bishop(Colors.BLACK);
    this.cells[7][2].figure = new Bishop(Colors.WHITE);
    this.cells[0][5].figure = new Bishop(Colors.BLACK);
    this.cells[7][5].figure = new Bishop(Colors.WHITE);
  }
  private addKnights() {
    this.cells[0][1].figure = new Knight(Colors.BLACK);
    this.cells[7][1].figure = new Knight(Colors.WHITE);
    this.cells[0][6].figure = new Knight(Colors.BLACK);
    this.cells[7][6].figure = new Knight(Colors.WHITE);
  }
  private addRooks() {
    this.cells[0][0].figure = new Rook(Colors.BLACK);
    this.cells[7][0].figure = new Rook(Colors.WHITE);
    this.cells[0][7].figure = new Rook(Colors.BLACK);
    this.cells[7][7].figure = new Rook(Colors.WHITE);
  }

  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addQueens();
    this.addBishops();
    this.addKnights();
    this.addRooks();
  }

  public isEmptyVertical(source: Cell, target: Cell) {
    if (source.x !== target.x) return false;
    const min = Math.min(source.y, target.y);
    const max = Math.max(source.y, target.y);

    if (source === target) return false;

    for (let y = min + 1; y < max; y++) {
      if (!this.getCell(source.x, y).isEmpty()) {
        if (
          !(
            source.isEnemy(this.getCell(source.x, y)) &&
            this.getCell(source.x, y).figure?.name === FigureNames.KING
          )
        )
          return false;
      }
    }
    return true;
  }
  public isEmptyHorizontal(source: Cell, target: Cell) {
    if (source.y !== target.y) return false;
    const min = Math.min(source.x, target.x);
    const max = Math.max(source.x, target.x);

    if (source === target) return false;

    for (let x = min + 1; x < max; x++) {
      if (!this.getCell(x, source.y).isEmpty()) {
        if (
          !(
            source.isEnemy(this.getCell(x, source.y)) &&
            this.getCell(x, source.y).figure?.name === FigureNames.KING
          )
        )
          return false;
      }
    }
    return true;
  }
  public isEmptyDiagonal(source: Cell, target: Cell) {
    const absX = Math.abs(target.x - source.x);
    const absY = Math.abs(target.y - source.y);

    if (absX !== absY) return false;
    if (source === target) return false;

    const dy = source.y < target.y ? 1 : -1;
    const dx = source.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.getCell(source.x + dx * i, source.y + dy * i).isEmpty()) {
        if (
          !(
            source.isEnemy(
              this.getCell(source.x + dx * i, source.y + dy * i)
            ) &&
            this.getCell(source.x + dx * i, source.y + dy * i).figure?.name ===
              FigureNames.KING
          )
        )
          return false;
      }
    }
    return true;
  }
  public isUnderAttack(target: Cell, source: Cell) {
    for (let i = 0; i < 8; i++) {
      let row = this.cells[i];
      for (let j = 0; j < 8; j++) {
        const cell = row[j];

        if (cell.figure instanceof Pawn) {
          let copy = Object.assign({}, target);
          copy.figure = source.figure;

          if (source.isEnemy(cell) && cell.figure.canAttack(copy, this, cell))
            return true;
        }

        if (
          !(cell.figure instanceof Pawn) &&
          source.isEnemy(cell) &&
          cell.figure?.canAttack(target, this, cell)
        )
          return true;
      }
    }
    return false;
  }

  isKingUnderAttack(target: Cell, color: Colors) {
    for (let i = 0; i < 8; i++) {
      let row = this.cells[i];
      for (let j = 0; j < 8; j++) {
        const cell = row[j];

        if (cell.figure?.color === color) {
          if (cell.figure.canAttack(target, this, cell)) return true;
        }
      }
    }
    return false;
  }
  castle(source: Cell, target: Cell) {
    const color = source.figure?.color;
    const dx = source.x - target.x;

    if (color === Colors.WHITE) {
      if (dx === -2) {
        this.getCell(4, 7).moveFigure(this.getCell(6, 7));
        this.getCell(7, 7).moveFigure(this.getCell(5, 7));
      } else if (dx === 2) {
        this.getCell(4, 7).moveFigure(this.getCell(2, 7));
        this.getCell(0, 7).moveFigure(this.getCell(3, 7));
      }
    } else if (color === Colors.BLACK) {
      if (dx === -2) {
        this.getCell(4, 0).moveFigure(this.getCell(6, 0));
        this.getCell(7, 0).moveFigure(this.getCell(5, 0));
      } else if (dx === 2) {
        this.getCell(4, 0).moveFigure(this.getCell(2, 0));
        this.getCell(0, 0).moveFigure(this.getCell(3, 0));
      }
    }
  }
}

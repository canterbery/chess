import { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}
export const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <div
      className={[
        "cell",
        cell.avaliable && cell.figure ? "avaliableFigure" : cell.color,
        selected ? "selected" : "",
      ].join(" ")}
      onClick={() => click(cell)}
    >
      {cell.avaliable && !cell.figure && <div className="avaliable"></div>}
      {cell.figure?.img && <img src={cell.figure.img} alt=""></img>}
    </div>
  );
};

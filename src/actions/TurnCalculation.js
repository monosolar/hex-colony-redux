import { isRowOdd, rndm } from "../utils/Utils";
import { mapColumns, mapRows } from "../consts/MapSizesConsts";
import * as d3 from "d3";

/****************************************
 *                                       *
 *               NW	  NO                *
 *                 \	 /                  *
 *             WW-- 	  --OO              *
 *                 /	 \                  *
 *               SW	  SO                *
 *                                       *
 * **************************************/

const CC = "CC";
const NO = "NO";
const NW = "NW";
const WW = "WW";
const SW = "SW";
const SO = "SO";
const OO = "OO";
const DIRECTIONS_ARRAY = [OO, NO, NW, WW, SW, SO];

export default class TurnCalculation {
  constructor(mapCells, colonyOwnCells, colonyColor) {
    this._mapCells = mapCells;
    this._colonyOwnCells = colonyOwnCells;
    this._colonyColor = colonyColor;
  }

  getPriorityCellIdx() {
    let cellIdx = -1;
    let currentCellFreeDirections = [];
    const randomChoice = rndm(2);

    let i, initI, limitCondition, iterator;

    if (randomChoice === 0) {
      initI = this._colonyOwnCells.length - 1;
      limitCondition = ii => ii >= 0;
      iterator = -1;
    } else {
      initI = 0;
      limitCondition = ii => ii < this._colonyOwnCells.length;
      iterator = 1;
    }

    for (i = initI; limitCondition(i); i += iterator) {
      cellIdx = this._colonyOwnCells[i];
      currentCellFreeDirections = this.getCellFreeDirectionsArray(
        this._colonyOwnCells[i]
      );

      if (currentCellFreeDirections.length > 0) break;
    }

    return this.getDirectedCellIdx(
      cellIdx,
      currentCellFreeDirections[rndm(currentCellFreeDirections.length)]
    );
  }

  getCellFreeDirectionsArray(cellIdx) {
    let freeDirectionsDict = [];
    let neighbourCell;

    for (let i = 0; i < 6; i++) {
      if (!this.isCellExisting(cellIdx, DIRECTIONS_ARRAY[i])) continue;
      neighbourCell = d3.select(
        this._mapCells[this.getDirectedCellIdx(cellIdx, DIRECTIONS_ARRAY[i])]
      );

      if (neighbourCell.attr("color") === "0xFF") {
        freeDirectionsDict.push(DIRECTIONS_ARRAY[i]);
      }
    }

    return freeDirectionsDict;
  }

  getDirectedCellIdx(cellIdx, direction) {
    switch (direction) {
      case NO:
        return cellIdx - mapColumns + (isRowOdd(cellIdx) ? 1 : 0);
        break;
      case NW:
        return cellIdx - mapColumns + (isRowOdd(cellIdx) ? 1 : 0) - 1;
        break;
      case WW:
        return cellIdx - 1;
        break;
      case SO:
        return cellIdx + mapColumns + (isRowOdd(cellIdx) ? 1 : 0);
        break;
      case SW:
        return cellIdx + mapColumns + (isRowOdd(cellIdx) ? 1 : 0) - 1;
        break;
      case OO:
        return cellIdx + 1;
        break;
      case CC:
        return cellIdx;
        break;
    }
  }

  isCellExisting(currentIndex, direction) {
    if ((direction === NO || direction === NW) && currentIndex < mapColumns)
      return false;
    else if (
      (direction === SW || direction === SO) &&
      currentIndex >= mapColumns * (mapRows - 1)
    )
      return false;
    else if (
      ((direction === SW && !isRowOdd(currentIndex)) ||
        (direction === NW && !isRowOdd(currentIndex)) ||
        direction === WW) &&
      currentIndex % mapColumns === 0
    )
      return false;
    else if (
      ((direction === SO && isRowOdd(currentIndex)) ||
        (direction === NO && isRowOdd(currentIndex)) ||
        direction === OO) &&
      (currentIndex + 1) % mapColumns === 0
    )
      return false;
    else return true;
  }
}

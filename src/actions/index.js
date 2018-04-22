import TurnCalculation from "../actions/TurnCalculation";

export function addColony(
  mapCells,
  currentColoniesLength,
  firstCellIdx,
  name,
  color,
  speed
) {
  return dispatch => {
    const actionObject = {
      type: "ADD_COLONY",
      colonyID: currentColoniesLength++,
      firstCellIdx: firstCellIdx,

      mapCells: mapCells,
      ownCells: [],
      paused: false,
      name: name,
      color: color,
      speed: speed
    };

    actionObject.turnCalculation = new TurnCalculation(
      actionObject.mapCells,
      actionObject.ownCells,
      actionObject.color
    );

    dispatch(actionObject);
  };
}

export const addCellToColony = (cellIdx, colonyID) => ({
  type: "ADD_CELL_TO_COLONY",
  cellIdx,
  colonyID
});

export const pauseColony = colonyID => ({
  type: "PAUSE_COLONY",
  colonyID
});

export function startColony(colony, firstCall = false) {
  return dispatch => {
    const iteration = (firstCall = false) => {
      let currentCellIdx = colony.firstCellIdx;

      if (!firstCall) {
        currentCellIdx = colony.turnCalculation.getPriorityCellIdx();
      }

      if (currentCellIdx === -1 || currentCellIdx === undefined) return;

      dispatch({
        type: "FILL_CELL",
        cellIdx: currentCellIdx,
        color: colony.color,
        colonyID: colony.colonyID
      });

      if (!colony.paused) setTimeout(iteration, colony.speed);
    };

    iteration(firstCall);
  };
}

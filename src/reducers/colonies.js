const colonies = (state = [], action) => {
  switch (action.type) {
    case "ADD_COLONY":
      return [
        ...state,
        {
          colonyID: action.colonyID,
          ownCells: action.ownCells,
          firstCellIdx: action.firstCellIdx,
          turnCalculation: action.turnCalculation,
          // TODO: delete it
          paused: action.paused,
          name: action.name,
          color: action.color,
          speed: action.speed
        }
      ];
    case "PAUSE_COLONY":
      state[action.colonyID].paused = true;

      return [...state];

    case "ADD_CELL_TO_COLONY":
      const currentColony = state[action.colonyID];
      currentColony.ownCells.push(action.cellIdx);

      return [...state];

    case "CLEAR_COLONIES":
      return [];

    default:
      return state;
  }
};

export default colonies;

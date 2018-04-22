import { Colors } from "../consts/ColorConstants";

const cell = (
  state = { cellIdx: -1, color: Colors.BLACK, colonyID: -1 },
  action
) => {
  switch (action.type) {
    case "FILL_CELL":
      return {
        cellIdx: action.cellIdx,
        color: action.color,
        colonyID: action.colonyID
      };
    default:
      return state;
  }
};

export default cell;

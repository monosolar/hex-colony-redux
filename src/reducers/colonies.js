import TurnCalculation from "../actions/TurnCalculation"

const colonies = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COLONY':
            return [
                ...state,
                {
                    colonyID: action.colonyID,
                    ownCells:action.ownCells,
                    firstCellIdx: action.firstCellIdx,
                    turnCalculation: action.turnCalculation,
                    paused:action.paused,
                    name: action.name,
                    color: action.color,
                    speed: action.speed
                }
            ]
        case 'ADD_CELL_TO_COLONY':
            const currentColony = state[action.colonyID];
            currentColony.ownCells.push(action.cellIdx);
            
            return [...state]
        default:
            return state
    }
}

export default colonies
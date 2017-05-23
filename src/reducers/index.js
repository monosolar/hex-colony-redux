import { combineReducers } from 'redux'
import colonies from './colonies'
import cell from './cell'

const appReducers = combineReducers({
    colonies, cell
})

export default appReducers
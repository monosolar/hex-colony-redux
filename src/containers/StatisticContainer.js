import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGroupedObject} from '../utils/Utils'
import { mapColumns, mapRows } from '../consts/MapSizesConsts'

export class StatisticContainer extends Component {
    static propTypes = {
        colonies: PropTypes.arrayOf(PropTypes.shape({
            colonyID: PropTypes.number.isRequired,
            ownCells: PropTypes.array.isRequired,
            name: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
            speed: PropTypes.number.isRequired
        }).isRequired).isRequired
    }

    render() {
        const colonies = this.props.colonies;
        
        const groupedByColorObject = getGroupedObject(colonies,"color");
        const colorPopulations = [];

        const allTerritory = mapColumns * mapRows;
        let freeTerritory = allTerritory;

        Object.keys( groupedByColorObject ).forEach( key => {
            const currentColorItem = {color: key, population: 0}

            groupedByColorObject[key].forEach((colony) => {

                currentColorItem.population += colony.ownCells.length;
            });
            freeTerritory -= currentColorItem.population;
            colorPopulations.push(currentColorItem)
        });

        colorPopulations.sort((a,b) => {
            return a.population - b.population;
        })

        return (
            <div>
                {colorPopulations.map((colorItem, key) =>
                    <p key={key}>
                        {colorItem.color} fascinated { parseInt(colorItem.population / allTerritory * 100)}% of territory;
                    </p>
                )}
                <p>Free territory: { parseInt(freeTerritory / allTerritory * 100)}%</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    colonies: state.colonies
   
})

const ConnectedColoniesList = connect(mapStateToProps)(StatisticContainer)
export default ConnectedColoniesList

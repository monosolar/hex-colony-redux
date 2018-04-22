import React, { Component } from "react";
import GlobalTypes from "../consts/GlobalTypes"

import { connect } from "react-redux";
import { getGroupedObject } from "../utils/Utils";
import { mapColumns, mapRows } from "../consts/MapSizesConsts";

const allTerritory = mapColumns * mapRows;
export class StatisticContainer extends Component {
  static propTypes = {
    ...GlobalTypes.colonies,
  };

  render() {
    const colonies = this.props.colonies;

    const groupedByColorObject = getGroupedObject(colonies, "color");
    const colorPopulations = [];

    let freeTerritory = allTerritory;

    Object.keys(groupedByColorObject).forEach(key => {
      const currentColorItem = {
        color: key,
        population: groupedByColorObject[key].reduce(
          (sum, current) => sum + current.ownCells.length,
          0
        )
      };

      freeTerritory -= currentColorItem.population;
      colorPopulations.push(currentColorItem);
    });

    colorPopulations.sort((firstItem, secondItem) => {
      return firstItem.population - secondItem.population;
    });

    return (
      <div>
        {colorPopulations.map((colorItem, key) => (
          <p key={key}>
            {colorItem.color.substr(0, 1).toUpperCase() +
              colorItem.color.substr(1).toLowerCase() +
              " "}
            fascinated{" "}
            <strong>
              {(colorItem.population / allTerritory * 100).toFixed(1)}%
            </strong>{" "}
            of territory;
          </p>
        ))}
        <p>
          Free territory:{" "}
          <strong>{(freeTerritory / allTerritory * 100).toFixed(1)}%</strong>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colonies: state.colonies
});

export default connect(mapStateToProps)(StatisticContainer);

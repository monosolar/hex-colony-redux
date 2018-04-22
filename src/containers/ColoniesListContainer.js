import React, { Component } from "react";
import GlobalTypes from "../consts/GlobalTypes"
import { connect } from "react-redux";
import { getNameOfColor } from "../consts/ColorConstants";

export class ColoniesListContainer extends Component {
  static propTypes = {
    ...GlobalTypes.colonies,
  };

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const colonies = this.props.colonies;

    return (
      <div className="table-scroll-wrap">
        <table className="table-fixed">
          <tbody>
            {colonies.map(colony => (
              <tr key={colony.colonyID}>
                <td>{colony.name}</td>
                <td>
                  <input
                    type="color"
                    value={getNameOfColor(colony.color)}
                    disabled="true"
                  />
                </td>
                <td>{colony.speed}ms</td>
                <td>{colony.ownCells.length - 1} cells</td>
                <td className="td-delete-hovered">
                  <div className="colony-entry-delete">
                    <span className="glyphicon glyphicon-remove" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colonies: state.colonies
});

export default connect(mapStateToProps)(ColoniesListContainer);

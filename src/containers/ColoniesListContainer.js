import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getNameOfColor } from '../consts/ColorConstants'

export class ColoniesListContainer extends Component {

    static propTypes = {
        colonies: PropTypes.arrayOf(PropTypes.shape({
            colonyID: PropTypes.number.isRequired,
            ownCells: PropTypes.array.isRequired,
            name: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
            speed: PropTypes.number.isRequired
        }).isRequired).isRequired
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const colonies = this.props.colonies;

        return (
            <div className="table-scroll-wrap" >
                <table className="table-fixed">
                    <tbody>
                    {colonies.map(colony =>
                        <tr key={colony.colonyID}>
                            <td>{colony.name}</td>
                            <td><input type="color" value={getNameOfColor(colony.color)} disabled="true"/></td>
                            <td>{colony.speed}ms</td>
                            <td className="td-delete-hovered">
                                <div className="colony-entry-delete">
                                    <span className="glyphicon glyphicon-remove"></span>
                                </div>
                            </td>
                            <td>{colony.ownCells.length-1} cells</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    colonies: state.colonies
   
})

const ConnectedColoniesList = connect(mapStateToProps)(ColoniesListContainer)
export default ConnectedColoniesList

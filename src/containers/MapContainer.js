import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as d3 from "d3";
import { Colors } from "../consts/ColorConstants";
import * as actions from "../actions";
import {
  mapWidth,
  mapHeight,
  mapColumns,
  mapRows,
  mapMargin
} from "../consts/MapSizesConsts";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

const d3Hexbin = require("d3-hexbin");

export class MapContainer extends Component {
  state = { colonies: [], cell: {} };

  svgArray = [];

  static propTypes = {
    colonies: PropTypes.arrayOf(
      PropTypes.shape({
        colonyID: PropTypes.number,
        ownCells: PropTypes.array,
        name: PropTypes.string,
        color: PropTypes.string,
        speed: PropTypes.number
      }).isRequired
    ).isRequired,
    cell: PropTypes.shape({
      colonyID: PropTypes.number,
      ownCells: PropTypes.array,
      name: PropTypes.string,
      color: PropTypes.string,
      speed: PropTypes.number
    }).isRequired,
    actions: PropTypes.any
  };

  draw() {
    const currentDOM = this["divRef"];

    if (!currentDOM) return;

    const hexRadius = d3.min([
      mapWidth / ((mapColumns + 0.5) * Math.sqrt(3)),
      mapHeight / ((mapRows + 1 / 3) * 1.5)
    ]);

    const hexbin = d3Hexbin.hexbin().radius(hexRadius);

    const points = [];
    for (var i = 0; i < mapRows; i++) {
      for (var j = 0; j < mapColumns; j++) {
        points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
      }
    }

    const svg = d3
      .select(currentDOM)
      .append("svg")
      .attr("width", mapWidth + mapMargin.left + mapMargin.right)
      .attr("height", mapHeight + mapMargin.top + mapMargin.bottom)
      .append("g")
      .attr(
        "transform",
        "translate(" + mapMargin.left + "," + mapMargin.top + ")"
      );

    this.svgArray = svg
      .append("g")
      .selectAll(".hexagon")
      .data(hexbin(points))
      .enter()
      .append("path")
      .attr("class", "hexagon")
      .attr("color", "0xFF")

      .attr("d", function(d) {
        return "M" + d.x + "," + d.y + hexbin.hexagon();
      })
      .attr("index", function(d, i) {
        return i;
      })
      .attr("stroke", function(d, i) {
        return "#ddd";
      })
      .attr("stroke-width", "1px")
      .style("fill", function(d, i) {
        return "#fff";
      })
      .on("click", this.onCellClicked);
  }

  onCellClicked = (e, clickedCellIdx) => {
    const clickedCell = d3.select(this.svgArray._groups[0][clickedCellIdx]);

    if (clickedCell.attr("color") !== "0xFF") return;

    //temporary solution
    this.props.actions.addColony(
      this.svgArray._groups[0],
      this.props.colonies.length,
      clickedCellIdx,
      "SomeName",

      [
        Colors.FUCHSIA,
        Colors.MAROON,
        Colors.OLIVE,
        Colors.AQUA,
        Colors.SILVER,
        Colors.GREEN
      ][parseInt(Math.random() * 6)],

      [100][parseInt(Math.random() * 5)]
    );
  };

  handleClearMap = () => {
    const color = "0xFFFFFF";

    d3
      .select(this.svgArray._groups[0])
      .transition()
      .attr("color", color)
      .style("fill", color)
      .style("stroke", color);

  }

  handleStartClicked = () => {
    this.props.actions.startColony(0, false);
  };

  handleStopClicked = () => {
    this.props.actions.pauseColony(0)
  };

  fillCell(cellIdx, color) {
    d3
      .select(this.svgArray._groups[0][cellIdx])
      .transition()
      .attr("color", color)
      .style("fill", color)
      .style("stroke", color);
  }

  componentDidMount() {
    this.draw();
  }

  componentWillReceiveProps(nextProps) {
    //new colonies check:
    if (nextProps.colonies.length > this.props.colonies.length) {
      const nextColony = nextProps.colonies[nextProps.colonies.length - 1];
      this.props.actions.startColony(nextColony, true);
    }

    //is some cell need to be filled:
    if (nextProps.cell !== this.props.cell) {
      this.fillCell(nextProps.cell.cellIdx, nextProps.cell.color);
      this.props.actions.addCellToColony(
        nextProps.cell.cellIdx,
        nextProps.cell.colonyID
      );
    }

    if (!nextProps.colonies.length) {
      this.fillCell(nextProps.cell.cellIdx, nextProps.cell.color);
      this.props.actions.addCellToColony(
        nextProps.cell.cellIdx,
        nextProps.cell.colonyID
      );
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={4} md={4}>
            <div
              className="colony-entry-delete control-button"
              onClick={this.handleStartClicked}
            >
              Start
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div
              className="colony-entry-delete control-button"
              onClick={this.handleStopClicked}
            >
              Stop
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div
              className="colony-entry-delete control-button"
              onClick={this.handleClearMap}
            >
              Clear
            </div>
          </Col>
        </Row>

        <div ref={c => (this["divRef"] = c)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colonies: state.colonies,
  cell: state.cell
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

const ConnectedMap = connect(mapStateToProps, mapDispatchToProps)(MapContainer);
export default ConnectedMap;

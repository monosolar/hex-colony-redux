import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/lib/Row";

export default class SectionComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <Row className="section-component">
        <div className="section-header">{this.props.title}</div>
        <div className="section-body">{children}</div>
      </Row>
    );
  }
}

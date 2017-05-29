import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row  from 'react-bootstrap/lib/Row';

export default class SectionComponent  extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        contentComponent: PropTypes.func
    }

    render() {
        return (
            <Row className="section-component">
                <div className="section-header">
                    {this.props.title}
                </div>
                <div className="section-body">
                    {
                        this.props.contentComponent ?
                            React.createElement(this.props.contentComponent, {}, null) :
                            ""
                    }
                </div>
            </Row>
        )
    }
}

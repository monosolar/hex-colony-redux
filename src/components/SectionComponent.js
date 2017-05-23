import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SectionComponent  extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        contentComponent: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="row section-component">
                <div className="section-header">
                    {this.props.title}
                </div>
                <div className="section-body">
                    { React.createElement(this.props.contentComponent, {}, null) }
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import MapContainer from '../containers/MapContainer'
import SectionComponent from '../components/SectionComponent'
import ColoniesListContainer from '../containers/ColoniesListContainer'
import StatisticContainer from '../containers/StatisticContainer'


class App extends Component {
	render() {
		return(
			<div className="container main-container">

				<div className="row">
					<p className="title-label">Colonies</p>
					<hr className="title-hr"/>
				</div>

				<div className="row">
					<div className="col-lg-7" >
						<SectionComponent title="Map" contentComponent={ MapContainer } />
					</div>
					<div  className="col-lg-5">
						<div className="row section-component" >
							<SectionComponent title="Colonies List" contentComponent={ ColoniesListContainer } />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6" >
						<div className="row section-component" >
							<SectionComponent title="Statistic" contentComponent={ StatisticContainer } />
						</div>
					</div>
					<div className="col-md-6"></div>
				</div>
			</div>
		)}
}

export default App
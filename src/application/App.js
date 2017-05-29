import React, { Component } from 'react'
import Grid  from 'react-bootstrap/lib/Grid';
import Col  from 'react-bootstrap/lib/Col';
import Row  from 'react-bootstrap/lib/Row';
import MapContainer from '../containers/MapContainer'
import SectionComponent from '../components/SectionComponent'
import ColoniesListContainer from '../containers/ColoniesListContainer'
import StatisticContainer from '../containers/StatisticContainer'

class App extends Component {

	componentDidMount(){
		document.body.className="body-style"
	}

	render() {
		return(
			<Grid className="main-container">
				<Row>
					<p className="title-label">Colonies</p>
					<hr className="title-hr"/>
				</Row>

				<Row>
					<Col lg={7} md={7}>
						<SectionComponent title="Map" contentComponent={ MapContainer } />
					</Col>
					<Col lg={5} md={5}>
						<SectionComponent title="Colonies List" contentComponent={ ColoniesListContainer } />
					</Col>
				</Row>

				<Row>
					<Col lg={6} md={6}>
						<SectionComponent title="Statistic" contentComponent={ StatisticContainer } />
					</Col>
					<Col lg={6} md={6}>
						<SectionComponent title="Empty"  />
					</Col>
				</Row>
			</Grid>
		)}
}

export default App
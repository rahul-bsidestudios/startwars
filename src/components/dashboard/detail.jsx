import React from 'react';
import { connect } from "react-redux";
import {
  Row,
  Col
} from "react-bootstrap";

const mapStateToProps = (state, ownProps) => {
  return { planet: ownProps.planet };
}

const PlanetDetail = ({ planet }) => (
	<Row>
		<Col md={12}>
			<h1>Planet Details</h1>
			<div><label>Name:</label><span>{planet.name}</span></div>
			<div><label>Population:</label><span>{planet.population}</span></div>
			<div><label>Rotation Period:</label><span>{planet.rotation_period}</span></div>
			<div><label>Orbital Period:</label><span>{planet.orbital_period}</span></div>
			<div><label>Diameter:</label><span>{planet.diameter}</span></div>
			<div><label>Climate:</label><span>{planet.climate}</span></div>
			<div><label>Gravity:</label><span>{planet.gravity}</span></div>
			<div><label>Terrain:</label><span>{planet.terrain}</span></div>
			<div><label>Surface Water:</label><span>{planet.surface_water}</span></div>
	  </Col>
	</Row>
)

export default connect(mapStateToProps)(PlanetDetail);
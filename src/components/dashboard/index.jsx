import React, { Component } from 'react';
import planetActions from '../../actions/planet.actions';
import Header from '../../components/header/index.jsx';
import PlanetDetail from './detail.jsx';
import { connect } from 'react-redux';
import _ from 'lodash';
import {quantileRank} from 'simple-statistics';
import {
  Container,
  Row,
  Col
} from "react-bootstrap";

import '../../assets/styles/dashboard.css?v=1.2';

const mapStateToProps = state => {
  return { user: state.user.user, planets: state.planet.planets, loading: state.planet.loading, error: state.planet.error };
}

const mapDispatchToProps = dispatch => {
  return {
    search: (input) => dispatch(planetActions.search(input))
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      selected: null,
      lastMinuteSearches: 0,
      lastMinuteSearchTime: null
    };
  }

  getFontSize(planet) {
    let all = _.map(this.props.planets, (item) => { return parseInt(item.population) });
    console.log(all);
    let rank = quantileRank(all, parseInt(planet.population));
    console.log(rank);
    return 50*rank;
  }

  selectItem(item) {
    this.setState({selected: item});
  }

  search(e) {
    this.setState({input: e.target.value, full: false, selected: null});
    if(!e.target.value) {
      return;
    }
    if(!this.state.lastMinuteSearchTime) {
      this.setState({lastMinuteSearches: 1, lastMinuteSearchTime: new Date()});
      this.props.search(e.target.value);
    }
    else {
      if((new Date().getTime() - this.state.lastMinuteSearchTime.getTime())/1000 > 60) {
        this.setState({lastMinuteSearches: 1, lastMinuteSearchTime: new Date()});
        this.props.search(e.target.value);
      }
      else if(this.state.lastMinuteSearches < 15) {
        this.setState({lastMinuteSearches: this.state.lastMinuteSearches + 1, lastMinuteSearchTime: new Date()});
        this.props.search(e.target.value);
      }
      else {
        if(this.props.user === 'Luke Skywalker') {
          this.setState({lastMinuteSearches: this.state.lastMinuteSearches + 1, lastMinuteSearchTime: new Date()});
          this.props.search(e.target.value);
        }
        else {
          this.setState({full: true});
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Container fluid className="wrapper">
          <Row>
            <Col md={6}>
              <Row>
                <Col md={12} className="input-wrap">
                  <input type="text" onChange={this.search.bind(this)} value={this.state.input} placeholder="Enter the name to search" />
                  {this.props.loading && 
                    <img alt="" className="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
                </Col>
              </Row>
              {this.state.full && <Row className="error">
                <Col md={12}>
                  Please wait. Only 15 searches are allowed within a minute.
                </Col>
              </Row>}
              {this.state.input && this.props.planets.length && !this.props.loading ? <Row className="list">
                <Col md={12}>
                  <ul>
                    {this.props.planets.map((planet, index) => {
                      return (
                        <li title={planet.name + ' - Click to view details'} onClick={this.selectItem.bind(this, planet)} key={index} style={{fontSize: this.getFontSize(planet)}}  >{planet.name}</li>
                      )
                    })}
                  </ul>
                </Col>
              </Row> : ''}
            </Col>
            {this.state.selected && this.state.input && <Col md={6}>
              <PlanetDetail planet={this.state.selected} />
            </Col>}
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

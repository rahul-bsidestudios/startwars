import React, { Component } from "react";
import { connect } from 'react-redux';
import userActions from '../../actions/user.actions';
import {
  Container,
  Row,
  Col
} from "react-bootstrap";

import '../../assets/styles/login.css?v=1.2';

const mapDispatchToProps = dispatch => {
  return { 
    login: (userName, password) => dispatch(userActions.login(userName, password)),
    logout: () => dispatch(userActions.logout()),
  };
}

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      userName: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { userName, password } = this.state;
    if (userName && password) {
      this.props.login(userName, password);
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { userName, password, submitted } = this.state;
    return (
      <div className="content login-box">
        <Container fluid>
          <Row>
            <Col md={12} className="login-box">
              <h1>Star Wars Login</h1>
              <form name="loginForm" onSubmit={this.handleSubmit}>
                <Row>
                  <Col md={12}>
                    <input
                      label = "User Name"
                      type = "text"
                      className = "form-control"
                      placeholder = "User Name"
                      value = {userName}
                      name = "userName"
                      onChange = {this.handleChange}
                    />
                  </Col>
                </Row>
                {submitted && !userName && <div className="help-block">User name is required</div>}
                <Row>
                  <Col md={12}>
                    <input
                      label = "Password"
                      type = "password"
                      className = "form-control"
                      placeholder = "Password"
                      value = {password}
                      autoComplete = "false"
                      name = "password"
                      onChange = {this.handleChange}
                    />
                  </Col>
                </Row>
                {submitted && !password && <div className="help-block">Password is required</div>}
                <button disabled={loggingIn} onClick={this.handleSubmit} className="btn btn-info" type="button">
                  Login
                </button>
                {loggingIn && 
                  <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                {this.props.error && <div className="error">{this.props.error}</div>}
                <div className="clearfix" />
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, error } = state.user;
  return {
    loggingIn,
    error
  };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);

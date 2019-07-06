import { Provider } from 'react-redux'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })
import store from '../stores/testStore.js';
import Login from '../components/login';
import fetchMock from 'fetch-mock';
import config from '../config/index.jsx';
import React from 'react';
import { Router } from 'react-router-dom';
import { history } from '../helpers/history';

window.store = store;

delete window.location;
window.location = {pathname: '/login'};

const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

beforeAll(() => {
  global.objectStore = {};
  global.localStorage = {
  	getItem: function(key){
  		return objectStore[key];
  	},
  	setItem: function(key, value){
  		objectStore[key] = value;
  	},
  	removeItem: function(key) {
      delete objectStore[key]
    },
    clear: function() {
      objectStore = {}
    }
  };
});

describe('Login Component', () => {

	let preventDefault, wrapper;

	beforeAll(() => {
		preventDefault = jest.fn();
    wrapper = mount(shallow(<Login store={store} />).get(0));
	});

  afterEach(() => {
    fetchMock.restore();
  })

  it('should render login box', () => {
    expect(wrapper.find('.login-box').exists()).toBe(true)
  });

  it('should render a form', () => {
  	expect(wrapper.find('form[name="loginForm"]').exists()).toBe(true)
 	});

  it('renders a userName input', () => {
	  expect(wrapper.find('input[name="userName"]').length).toEqual(1)
	});

	it('renders a password input', () => {
	  expect(wrapper.find('input[name="password"]').length).toEqual(1)
	});

	it('renders heading', () => {
	  expect(wrapper.find('h1').text()).toEqual('Star Wars Login');
	});

  it('renders a button', () => {
    expect(wrapper.find('.btn-info').length).toEqual(1)
  });

	it('should warn for required fields', () => {
   	wrapper.find('button').simulate('click', {preventDefault: preventDefault});
    expect(wrapper.state('submitted')).toEqual(true);
    expect(wrapper.find('.help-block').at(0).text()).toEqual('User name is required');
    expect(wrapper.find('.help-block').at(1).text()).toEqual('Password is required');
  });

	it('should change userName', () => {
   	wrapper.find('input[name="userName"]').simulate('change', {target: {name: 'userName', value: 'test'}});
  	expect(wrapper.state('userName')).toEqual('test');
    wrapper.update();
    wrapper.instance().forceUpdate();
  });

  it('should change password', () => {
   	wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: '22222222'}});
  	expect(wrapper.state('password')).toEqual('22222222');
  });

	it('should return Email or password is invalid', async () => {
    fetchMock.getOnce(config.apiUrl+'people/?search=' + wrapper.state('userName'), {status: 200, body: {results: []}});
    wrapper.find('button').simulate('click', {preventDefault: preventDefault});
   	expect(wrapper.state('submitted')).toEqual(true);
    await flushAllPromises();
    expect(store.getState().user.error).toEqual('Invalid User');
  });

  it('should change userName', () => {
    wrapper.find('input[name="userName"]').simulate('change', {target: {name: 'userName', value: 'Lucy'}});
    expect(wrapper.state('userName')).toEqual('Lucy');
  });

	it('should set the user name in localstorage', async () => {
    fetchMock.getOnce(config.apiUrl+'people/?search=' + wrapper.state('userName'), {status: 200, body: {results: [{name: 'Lucy', birth_year: '22222222'}]}});
		wrapper.find('button').simulate('click', {preventDefault: preventDefault});
    expect(wrapper.state('submitted')).toEqual(true);
    await flushAllPromises();
    expect(store.getState().user.isLoggedIn).toEqual(true);
  });

});
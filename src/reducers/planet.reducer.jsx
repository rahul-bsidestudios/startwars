import {
  PLANET_REQUEST,
  PLANET_SUCCESS,
  PLANET_FAILURE
} from '../constants';

export default (state = {planets: []}, action) => {
  switch (action.type) {
    case PLANET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case PLANET_SUCCESS:
      return {
        ...state,
        loading: false,
        planets: action.planets,
      };
    case PLANET_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

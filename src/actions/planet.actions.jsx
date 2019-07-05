import {
  PLANET_REQUEST,
  PLANET_SUCCESS,
  PLANET_FAILURE
} from '../constants';
import { planetService } from '../services/planet.services';

export default {
  search
};

function search(name) {
  return dispatch => {
    dispatch(request({ name }));

    planetService.search(name).then(
      data => {
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(name) {
    return { type: PLANET_REQUEST, name };
  }
  function success(planets) {
    return { type: PLANET_SUCCESS, planets };
  }
  function failure(error) {
    return { type: PLANET_FAILURE, error };
  }
}
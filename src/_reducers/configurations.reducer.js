import { configurationConstants } from '../_constants';

export function configurations(state = {}, action) {
  switch (action.type) {
    case configurationConstants.GET_ALL_REQUEST:
      return {
        loading: true
      };
    case configurationConstants.GET_ALL_SUCCESS:
      return {
        items: action.configurations
      };
    case configurationConstants.GET_ALL_FAILURE:
      return {
        error: action.error
      };
    case configurationConstants.CREATE_FAILURE:
      return {
        error: action.error
      };
    case configurationConstants.UPDATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

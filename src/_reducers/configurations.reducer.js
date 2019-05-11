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
    case configurationConstants.UPDATE_REQUEST:
      return {
        ...state,
        isSyncing: true
      };
    case configurationConstants.UPDATE_SUCCESS:
      return {
        ...state,
        isSyncing: false
      };
    case configurationConstants.UPDATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

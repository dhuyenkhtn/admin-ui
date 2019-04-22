import { customerConstants } from '../_constants';

export function customers(state = {}, action) {
  switch (action.type) {
    case customerConstants.GET_ALL_REQUEST:
      return {
        loading: true
      };
    case customerConstants.GET_ALL_SUCCESS:
      return {
        items: action.customers
      };
    case customerConstants.GET_ALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}

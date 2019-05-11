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
      
    case customerConstants.UPDATE_REQUEST:
      return {
        ...state,
        requesting: true
      };
    case customerConstants.UPDATE_SUCCESS:
      return {
        ...state,
        requesting: false
      };
      
    case customerConstants.UPDATE_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.error,
      };
    default:
      return state
  }
}

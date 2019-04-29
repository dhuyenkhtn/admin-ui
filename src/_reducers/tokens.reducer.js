import { tokenConstants } from '../_constants';

export function tokens(state = {}, action) {
  switch (action.type) {
    case tokenConstants.GET_ALL_REQUEST:
      return {
        loading: true
      };
    case tokenConstants.GET_ALL_SUCCESS:
      return {
        items: action.tokens
      };
    case tokenConstants.GET_ALL_FAILURE:
      return {
        error: action.error
      };
    case tokenConstants.GENERATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

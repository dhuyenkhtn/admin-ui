import { customerConstants } from '../_constants';

export function register(state = {}, action) {
  switch (action.type) {
    case customerConstants.REGISTER_REQUEST:
      return {
        ...state,
        requesting: true
      };

    case customerConstants.REGISTER_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        account: action.customer
      };

    case customerConstants.REGISTER_VALID_TOKEN: {
      const canUseDomains = action.data ? action.data.canUseDomains : [];
      return {
        requesting: false,
        isValidToken: true,
        canUseDomains
      };
    }
    case customerConstants.REGISTER_INVALID_TOKEN: {
      return {
        requesting: false,
        isValidToken: false,
         canUseDomains: [],
        error: action.error
      };
    }

    case customerConstants.REGISTER_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
}

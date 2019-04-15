import { domainsConstants } from '../_constants';

export function domains(state = {}, action) {
  switch (action.type) {
    case domainsConstants.GET_ALL_REQUEST:
      return {
        loading: true
      };
    case domainsConstants.GET_ALL_SUCCESS:
      return {
        items: action.domains
      };
    case domainsConstants.GET_ALL_FAILURE:
      return {
        error: action.error
      };
    case domainsConstants.CREATE_FAILURE:
      return {
        error: action.error
      };
    case domainsConstants.UPDATE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

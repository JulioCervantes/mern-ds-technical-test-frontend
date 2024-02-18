import sessionActions from "../actions/sessionActions";
import initialState from "../initial-state";

export default function sessionReducer(state = {...initialState.session}, action) {
  switch (action.type) {
    case sessionActions.SET_SESSION:
      return {
        ...initialState.session,
        ...action.payload,
      };
    case sessionActions.REMOVE_SESSION:
      return {...initialState.session};
    default:
      return state;
  }
}
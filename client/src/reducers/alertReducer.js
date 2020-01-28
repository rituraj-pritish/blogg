import { SET_ALERT, REMOVE_ALERT } from "../types";


const initialState = []

export default (state = initialState, action) => {
  const {type, payload} = action
  switch(type) {
    case SET_ALERT:
      return [payload]
    case REMOVE_ALERT:
      return []
    default:
      return state;
  }
}
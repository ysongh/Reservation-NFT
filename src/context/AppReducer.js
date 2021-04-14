export default (state, action) => {
  switch(action.type){
    case "SET_NAVIGATION":
      return{
        ...state,
        navigation: action.payload
      }
    default:
      return state;
  }
}
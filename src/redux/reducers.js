const launches = (state = [] , action) => {

  switch(action.type) {
    case 'FETCH_LAUNCHES_SUCCESS':
      return action.payload
    default:
      return state
  }
}

export default launches

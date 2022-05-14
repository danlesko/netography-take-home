import axios from 'axios'

//synchronous action creator
const fetchLaunchesSuccess = launches => ({
  type: 'FETCH_LAUNCHES_SUCCESS',
  payload: { launches }
})

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchLaunches =  () => {
  return async dispatch => {
    try {
      let launches = await axios.get('https://api.spacexdata.com/v3/launches/past')
      dispatch(fetchLaunchesSuccess(launches.data)) //store first five posts
    }
    catch(e){
      console.log(e)
    }
  }
}

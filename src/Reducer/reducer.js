const  initialState= {

  status:false,
  statusForm:true,
  refreshFeed:false,
  toastType:"error"

}

const reducer = (state=initialState, action)=>{

  if (action.type==="SWITCH") {
    const updatedState={...state}
    updatedState.status=!state.status
    return updatedState
  }
  if (action.type==="SWITCHFORM") {
    const updatedState={...state}
    updatedState.statusForm=!state.statusForm
    return updatedState
  }
  if (action.type==="REFRESH") {
    const updatedState={...state}
    updatedState.refreshFeed=!state.refreshFeed
    console.log(updatedState.refreshFeed)
    return updatedState
  }
  if (action.type==="TOAST") {
    const updatedState={...state}
    updatedState.toastType=action.toastType
    return updatedState
  }

  if (action.type==="LOGOUT") {
    const updatedState={...initialState}

    return updatedState
  }


    return state
}
export default reducer;

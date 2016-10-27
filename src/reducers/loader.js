const SHOW_LOADER = "SHOW_LOADER"

const handlers = {
  [SHOW_LOADER](state, value){
    return value
  }

}

const actions = {
  showLoader(yes){
    return {
      type:SHOW_LOADER,
      value:yes
    }
  }
}


function loader(state=false, action){
  let handler = handlers[action.type]
  return handler ? handler(state, action.value) : state
}

// export function incrementIfOdd() {
//   return (dispatch, getState) => {
//     const { counter } = getState();

//     if (counter % 2 === 0) {
//       return;
//     }

//     dispatch(increment());
//   };
// }

export default {actions, loader}

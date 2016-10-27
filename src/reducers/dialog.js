
const SHOW_DIALOG = "SHOW_DIALOG"

const handlers = {
  [SHOW_DIALOG](state, value){
    return value
  }

}

const actions = {
  showDialog(yes){
    return {
      type:SHOW_DIALOG,
      value:yes
    }
  }
}


function dialog(state=false, action){
  let handler = handlers[action.type]
  return handler ? handler(state, action.value) : state
}

export default {actions, dialog}

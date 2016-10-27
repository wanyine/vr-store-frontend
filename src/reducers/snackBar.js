const OPEN_SNACK = 'openSanckBar'

const handlers = {
  [OPEN_SNACK](state, value){
    return {open:true, message:value}
  }
}

const actions = {
  openSnackBar(msg){
    return {
      type:OPEN_SNACK,
      value:msg
    }
  }
}

const initial = { open: false, message:''}

function snackBar(state = initial , action) {
  let handler = handlers[action.type]
  return handler ? handler(state, action.value) : initial
}

export default {actions, snackBar}

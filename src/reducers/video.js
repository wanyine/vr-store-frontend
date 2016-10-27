const SET_VIDEOS = "SET_VIDEOS"

const handlers = {
  [SET_VIDEOS](state, value){
    return value
  }

}

const actions = {
  setVideos(videos){
    return {
      type:SET_VIDEOS,
      value:videos
    }
  }
}

function video(state=[], action){
  let handler = handlers[action.type]
  return handler ? handler(state, action.value) : state
}

export default {actions, video}

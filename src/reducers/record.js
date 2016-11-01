
const SET_RECORD_GROUPS = "SET_RECORD_GROUPS"
const SET_DAILY_RECORDS = "SET_DAILY_RECORDS"
const SELECT_DATE ="SELECT_DATE"
const SELECT_PERIOD ="SELECT_PERIOD"

const handlers = {
  [SET_RECORD_GROUPS](state, recordGroups){
    return Object.assign({}, state, {recordGroups})
  },

  [SET_DAILY_RECORDS](state, dailyRecords){
    return Object.assign({}, state, {dailyRecords})
    
  },
  [SELECT_DATE](state, date){
    return Object.assign({}, state, {date})
  },
  [SELECT_PERIOD](state, period){
    return Object.assign({}, state, {period})
  }
}

const actions = {
  setRecordGroups(groups){
    return {
      type:SET_RECORD_GROUPS,
      value:groups
    }
  },
  setDailyRecords(daily){
    return {
      type:SET_DAILY_RECORDS,
      value:daily
    }
  },
  select_period(period){
    return {
      type:SELECT_PERIOD,
      value:period
    }
  },
  select_date(date){
    return {
      type:SELECT_DATE,
      value:date
    }
  }

}


function record(state={recordGroups:[], dailyRecords:{}}, action){
  let handler = handlers[action.type]
  return handler ? handler(state, action.value) : state
}

export default {actions, record}

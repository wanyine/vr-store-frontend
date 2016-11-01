import React from 'react'
import LoginForm from '../components/LoginForm'
import RoDialog from '../components/RoDialog'
import RecordSummaryTable from '../components/RecordSummaryTable'
import RecordDetailTable from '../components/RecordDetailTable'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Layout from './Layout'
import ActionVisible from 'material-ui/svg-icons/action/visibility';
import {actions as snackBarActions} from '../reducers/snackBar'
import {actions as dialogActions} from '../reducers/dialog'
import {actions as recordActions} from '../reducers/record'

import client from '../http/client'

const DataPage = props => {

  const {recordState, dialogState, ...actions} = props

  const loadRecords = ({date, period=1, grouped=false}) => {

    let params = {beginDay:date, days:period}
    if(grouped){
      params.groupByDate = 1
    } 

    client.get('/records', {params})
      .then(res => {
        if(grouped){
          actions.setRecordGroups(res.data)
        } else{
          actions.setDailyRecords({date, records:res.data})
          actions.showDialog(true)
        }
      })
      .catch(err => actions.openSnackBar(err.message))
  }

  return (
    <Layout>
    <RecordSummaryTable 
    
      recordState={recordState}
      onWatch={ date => loadRecords({date})} 
      onQuery={ () => loadRecords({grouped:true, period:recordState.period, date:recordState.date})}
      select_date={actions.select_date}
      select_period={actions.select_period}
      />
      <RoDialog
        title = {recordState.dailyRecords.date}
        open={dialogState}
        onConfirm={event => actions.showDialog(false)}
      >
        <RecordDetailTable records={recordState.dailyRecords.records}/>
      </RoDialog>
    </Layout>
  )
}

export default connect(
  state =>({recordState:state.record, dialogState:state.dialog}),
  dispatch => bindActionCreators(Object.assign(snackBarActions, dialogActions, recordActions), dispatch)
)(DataPage);

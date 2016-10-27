import React, { Component } from 'react'
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

  const loadRecords = ({date, period=1, grouped=false}) => {

    let params = {beginDay:date, days:period}
    if(grouped){
      params.groupByDate = 1
    } 

    client.get('/records', {params})
      .then(res => {
        if(grouped){
          props.setRecordGroups(res.data)
        } else{
          props.setDailyRecords({date, records:res.data})
          props.showDialog(true)
        }
      })
      .catch(err => props.openSnackBar(err.message))
  }

  return (
    <Layout>
    <RecordSummaryTable 
      records={props.recordGroups} 
      onWatch={ date => loadRecords({date})} 
      onQuery={() => loadRecords({grouped:true, ...props})}
      select_date={props.select_date}
      select_period={props.select_period}
      period ={props.period}
      />
      <RoDialog
        title = {props.dailyRecords.date}
        open={props.showed}
        onConfirm={() => props.showDialog(false)}
      >
        <RecordDetailTable records={props.dailyRecords.records}/>
      </RoDialog>
    </Layout>
  )
}

export default connect(
  ({record:{recordGroups, dailyRecords, date, period}, dialog}) => {
    return {recordGroups, dailyRecords, date, period, showed:dialog}
  },
  dispatch => bindActionCreators(Object.assign(snackBarActions, dialogActions, recordActions), dispatch)
)(DataPage);

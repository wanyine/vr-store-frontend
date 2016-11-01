import React, { Component } from 'react'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionVisible from 'material-ui/svg-icons/action/visibility';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const RecordSummaryTable = props => (
      <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
        <TableHeaderColumn colSpan={2}>
          <DatePicker hintText="起始日期" onChange={(event,date) => props.select_date(date)}/>
        </TableHeaderColumn>
        <TableHeaderColumn colSpan={1}> 
          <DropDownMenu openImmediately={true} value={props.recordState.period} onChange={(event,index,value) => props.select_period(value)}>
            <MenuItem value={3} primaryText="3 天" />
            <MenuItem value={7} primaryText="1 周" />
            <MenuItem value={14} primaryText="2 周" />
            <MenuItem value={30} primaryText="1 月" />
          </DropDownMenu>
        </TableHeaderColumn>
        <TableHeaderColumn> <RaisedButton label="查询" primary={true} onClick={event => props.onQuery()}/></TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn> Date </TableHeaderColumn>
          <TableHeaderColumn> Time </TableHeaderColumn>
          <TableHeaderColumn> Times</TableHeaderColumn>
          <TableHeaderColumn> Detail</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody stripedRows={true} displayRowCheckbox={false} >
      {
        props.recordState.recordGroups.map(record => (
          <TableRow key={record.date}>
            <TableRowColumn> {record.date} </TableRowColumn>
            <TableRowColumn> {record.time} </TableRowColumn>
            <TableRowColumn> {record.times} </TableRowColumn>
            <TableRowColumn> 
              <IconButton onClick={event => props.onWatch(record.date)}> <ActionVisible/> </IconButton> 
            </TableRowColumn>
          </TableRow>
        ))
      }
      </TableBody>
      <TableFooter >
        <TableRow>
          <TableRowColumn> 总计 </TableRowColumn>
          <TableRowColumn> {props.recordState.recordGroups.reduce((pre,cur) => pre + cur.time, 0)} </TableRowColumn>
          <TableRowColumn> {props.recordState.recordGroups.reduce((pre,cur) => pre + cur.times, 0)} </TableRowColumn>
          <TableRowColumn> </TableRowColumn>
        </TableRow>
      </TableFooter>
      </Table>
    )

export default RecordSummaryTable

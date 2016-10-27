import React, { Component } from 'react'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionVisible from 'material-ui/svg-icons/action/visibility';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class RecordSummaryTable extends Component {

  render() {

    let {records, period, onWatch, select_date, select_period, onQuery}= this.props

    return (
      <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
        <TableHeaderColumn colSpan={2}>
          <DatePicker hintText="Start Day" onChange={(event,date) => select_date(date)}/>
        </TableHeaderColumn>
          <TableHeaderColumn> 
            <DropDownMenu value={period} onChange={(event,index,value) => select_period(value)}>
              <MenuItem value={3} primaryText="3 days" />
              <MenuItem value={7} primaryText="1 week" />
              <MenuItem value={30} primaryText="1 month" />
            </DropDownMenu>
          </TableHeaderColumn>
          <TableHeaderColumn> <RaisedButton label="查询" primary={true} onClick={onQuery}/></TableHeaderColumn>
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
        records.map(record => (
        
          <TableRow key={record.date}>
            <TableRowColumn> {record.date} </TableRowColumn>
            <TableRowColumn> {record.time} </TableRowColumn>
            <TableRowColumn> {record.times} </TableRowColumn>
            <TableRowColumn> 
              <IconButton onClick={event => onWatch(record.date)}> <ActionVisible/> </IconButton> 
            </TableRowColumn>
          </TableRow>
        ))
      }
      </TableBody>
      <TableFooter >
        <TableRow>
          <TableRowColumn> 总计 </TableRowColumn>
          <TableRowColumn> {records.reduce((pre,cur) => pre + cur.time, 0)} </TableRowColumn>
          <TableRowColumn> {records.reduce((pre,cur) => pre + cur.times, 0)} </TableRowColumn>
          <TableRowColumn> </TableRowColumn>
        </TableRow>
      </TableFooter>
      </Table>
    )
  }
}

export default RecordSummaryTable

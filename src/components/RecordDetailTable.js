import React, { Component } from 'react'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class RecordDetailTable extends Component {

  render() {

    let {records} = this.props

    return (
      <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn> Date </TableHeaderColumn>
          <TableHeaderColumn> Game </TableHeaderColumn>
          <TableHeaderColumn> Time </TableHeaderColumn>
          <TableHeaderColumn> Mac </TableHeaderColumn>
        </TableRow>
      </TableHeader>

      <TableBody stripedRows={true} displayRowCheckbox={false} >
      {
        records.map(record => (
        
          <TableRow key={record.created}>
            <TableRowColumn> {(new Date(record.created)).toLocaleTimeString()} </TableRowColumn>
            <TableRowColumn> {record.videoName} </TableRowColumn>
            <TableRowColumn> {record.time} </TableRowColumn>
            <TableRowColumn> {record.mac} </TableRowColumn>
          </TableRow>
        ))
      }
      </TableBody>
      </Table>
    )
  }
}

export default RecordDetailTable

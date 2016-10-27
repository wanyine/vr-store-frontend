import React, { Component, PropTypes } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Dialog from 'material-ui/Dialog'


export default (props) => {

  return (
    <Dialog 
      modal={true}
      open={props.loading}
    >

    正在请求服务器...
    </Dialog>
  )
  
}

    // <div style={{textAlign:'center'}}>
    //    <RefreshIndicator
    //     percentage={30}
    //     size={40}
    //     left={10}
    //     top={0}
    //     status="loading"
    //     />
    // </div>

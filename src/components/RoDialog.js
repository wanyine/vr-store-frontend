import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

class RoDialog extends React.Component {
  render(){
    const {onConfirm, children, ...other} = this.props;
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={onConfirm}
      />,
    ];

    return(
      <Dialog 
        modal={true}
        actions={actions}
        {...other}
      >
      {children}
      </Dialog>
    )
  }
}

export default RoDialog;

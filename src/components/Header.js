
import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {Link} from 'react-router'
import Snackbar from 'material-ui/Snackbar'

export default function(){
  return(
  
    <AppBar
      title="锐瞳CMS"
      showMenuIconButton={true}
      iconElementLeft={
        <IconMenu 
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem primaryText={<Link to="/"> Game </Link>}/>
          <MenuItem primaryText={<Link to="/data"> Data </Link>}/>
        </IconMenu>
      }
      iconElementRight={<FlatButton label="Logout" primary={true} href="#/logout" /> }
      >
    </AppBar>
  ) 
}

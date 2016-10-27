import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Loader from '../components/Loader'
import styles from './Styles'

import { connect } from 'react-redux';

import Snackbar from 'material-ui/Snackbar'

class App extends Component {

  render() {

    const {children, snackBar, loading} = this.props;

          // <BottomNavigation>
          //   <BottomNavigationItem label="© 上海锐瞳网络科技" icon={<IconLocationOn/>} disabled={true}/>
          // </BottomNavigation>
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div style={styles.app}>
          {children}
          <footer></footer>
          <Loader loading={loading}/>
          <Snackbar open={snackBar.open} message={snackBar.message} autoHideDuration={3000}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapState(state){
  return {snackBar:state.snackBar, loading:state.loader}
}

export default connect(mapState)(App);

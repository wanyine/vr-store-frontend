import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import auth from '../http/auth'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {actions as snackBarActions}  from '../reducers/snackBar'

import styles from './Styles';

import { SubmissionError } from 'redux-form'

class Login extends Component {
  render() {

    const {router, location, openSnackBar} = this.props;

    return (
      <div style={styles.page}>
        <LoginForm router={router} openSnackBar={openSnackBar}/>
      </div>
    )
  }
}

export default connect(state => state, dispatch => bindActionCreators(snackBarActions, dispatch))(Login);

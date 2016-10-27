import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
// import {Checkbox, TextInput,Text, TitleBar, Button, Window, ProgressCircle, View} from 'react-desktop/windows';
import {reduxForm} from 'redux-form'
import FontIcon from 'material-ui/FontIcon';
import auth from '../http/auth'

export const fields = ['name',  'pass']

const domOnlyProps = ({
  initialValue,
  autofill,
  onUpdate,
  valid,
  invalid,
  dirty,
  pristine,
  active,
  touched,
  visited,
  autofilled,
  ...domProps }) => domProps 

// Object.assign(domProps, {disable:false, onChange : e => console.log(e)})

class LoginForm extends Component {
  
  render(){
    const submit = values => {
      auth.login(values.name, values.pass)
      .then(() => router.replace( location.state && location.state.nextPathname || '/'))
      .catch(err => openSnackBar(err.message))
    }

    const {fields:{name, pass}, router, openSnackBar, handleSubmit, submitting} = this.props

    return (
        <form onSubmit={handleSubmit(submit)}>
          <TextField floatingLabelText="Username" {...({floatingLabelFixed:false}, domOnlyProps(name))}/><br/>
          <TextField floatingLabelText="Password" type="password" {...(domOnlyProps(pass))}/><br/>
          <RaisedButton fullWidth={true} primary={true} icon={submitting ? <FontIcon className="fa fa-spinner fa-spin"/> : <FontIcon className="fa fa-paper-plane"/>} 
            label="登录" type="submit" disabled={submitting} />
        </form>
    )
  }
}

export default reduxForm({
  form:'login',
  fields
})(LoginForm)

import React, { Component, PropTypes } from 'react';

import Header from '../components/Header'
import Loader from '../components/Loader'
import styles from './Styles'

export default class Layout extends Component {
  render(){
    return (
      <div style={styles.app}>
        <Header/>
        <div style={styles.page}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

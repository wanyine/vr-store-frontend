import React, { Component, PropTypes } from 'react';

import fs from 'fs'
import path from 'path'
import getmac from 'getmac'
import child_process from 'child_process'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {actions as videoActions} from '../reducers/video'
import {actions as snackBarActions} from '../reducers/snackBar'
import Header from '../components/Header'
import styles from './Styles'
import Layout from './Layout'

import {List, ListItem} from 'material-ui/List';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import ActionInfo from 'material-ui/svg-icons/action/info'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import {Card, CardMedia, CardTitle, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';

import client from '../http/client'

class Home extends Component {
  static propTypes = {
    openSnackBar : PropTypes.func.isRequired,
    videos: PropTypes.array.isRequired,
  };

  componentDidMount(){
  
    const gamesDir = path.join(process.cwd(), 'games')
    fs.exists(gamesDir, yes => {
    
      if(yes){
        const games = fs.readdirSync(gamesDir)
        this.props.setVideos( 
          games.map(
            game => ({
              name: game, 
              cover: path.join( gamesDir,  game, 'cover.jpg'), 
              state:"idle" 
            })
          )
        )
      }

    })
  }

  render(){

    const {videos, loading, openSnackBar } = this.props;

    const fireGame = (name, index) => {

      new Promise((resolve, reject) =>{
        getmac.getMac((err, mac) => {
          if(err){
            reject(err)
          }else{
            resolve(mac)
          }
        })
      })
      .then(mac => {
        return client.post('/records', {videoName:name, date:Date.now(), mac})
      })
      .then(res => {
        return new Promise((resolve, reject) => {
          let token_file = path.join('games', name, 'token.txt');
          fs.writeFile(token_file, res.data.token, function(err){
            if(err){
              reject(err)
            }else{
              resolve(res.data.id)
            }
          });
        })
      })
      .then(id => {
        let exe_file = path.join('games', name, 'exe', name + '.exe');
        return new Promise((resolve, reject) => {
          fs.exists(exe_file, function(exist){
            if(exist){
              let begin = Date.now()
              child_process.exec(exe_file, function(err){
                if(err){
                  reject(err)
                }else{
                  resolve({id, time:Math.floor((Date.now() - begin) / 1000)})
                }
              })
            } else {
              reject(new Error('Exectutable file lost.'))
            }
          })
        })
      })
      .then(({id, time}) => {
        return client.patch(`/records/${id}`, {time})
      })
      .catch(err=> {
        openSnackBar(err.message);
      })
    }

  
                      // overlay={<CardTitle title="灵：月蚀" subtitle="大空间呈现惊悚梦境"/>}
                    // icon={v.downloading ? <FontIcon className="fa fa-spinner fa-spin"/> : <PlayArrow /> }
    return (
      <Layout>
        <ul style={{columnCount:1}}>
          {videos.map((v, i) => 
            <li key={i} style={{marginBottom:'20px'}}>
                  <Card>
                    <CardHeader
                        avatar="electron.png"
                        title="锐瞳科技"
                        subtitle="不止于VR"
                    />
                    <CardMedia
                      overlay={<CardTitle subtitle={v.name} /> }
                    >
                      <img src={v.cover} width="600px" height="300px"/>
                    </CardMedia>

                  <CardActions>
                  <FlatButton 
                    label="start"
                    icon={<PlayArrow /> }
                    onClick={ ()=> fireGame(v.name, i) }
                    >
                    </FlatButton>
                  </CardActions>
                  </Card>
            </li>
               
              
          )}
        </ul>
      </Layout>
    )
  }
}

          // <ListItem 
          // key={i} 
          // primaryText={v.name} 
          // rightIcon={} 
          // onClick={ ()=> fireGame(v.name, i) }
          // />

function mapStateToProps(state) {
  return {
    videos: state.video,
    snackBar:state.snackBar
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(videoActions,  snackBarActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


import React, { Component}  from 'react';
import queryString from 'query-string';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './App.css';
import lineLogo from './LINE@_APP_typeA.png';
import userDefaultImg from './user_default.png';
import { Grid, Menu, Image, Header, Button, Segment, Loader } from 'semantic-ui-react'
import EditReplies from './EditReplies';

export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: '修改圖文選單',
      hasSendRequest: true,
      hasLoggedIn: true,
      userId: "",
      userName: "尚未登入",
      userImageUrl: userDefaultImg
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const login_code = values.code;
    const login_state = values.state;
    console.log("code: " + login_code + "\nstate: " + login_state);

    if(login_code !== undefined) {
      this.setState({
        hasSendRequest: true
      });
      const server_login_url = "https://nogerm-demo-test.herokuapp.com/login";
      const headers = {
        'Content-Type': 'application/json'
      }
      const data = {
        code: login_code,
        state: login_state
      }
      axios.post(server_login_url, data, headers)
      .then(response => {
        const decoded = jwt_decode(response.data.id_token);
        console.log("[login]\nuser id: " + decoded.sub + "\nuser name: " + decoded.name + "\nuser image url: " + decoded.picture);
        this.setState({
          userId: decoded.sub || "",
          userName: decoded.name || "",
          userImageUrl: decoded.picture || "",
          hasLoggedIn: true
        });
      })
      .catch(error => {
        console.log("[login] error" + error);
      });
    }
  }

  handleLoginClicked = () => {
    const loginUrl = "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1554176659&redirect_uri=https://nogerm.github.io/church-backend&state=1234&scope=openid%20profile";
    window.location.href = loginUrl;
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderBody = () => {
    const { activeItem } = this.state
    const hasSendRequest = this.state.hasSendRequest;
    const hasLoggedIn = this.state.hasLoggedIn;
    if(hasSendRequest && hasLoggedIn) {
      return (
        <Grid.Row columns={2}>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular style={{fontFamily: 'Noto Sans TC'}}>
              <Menu.Item name='修改圖文選單' active={activeItem === '修改圖文選單'} onClick={this.handleItemClick}/>
              <Menu.Item name='修改聚會時間' active={activeItem === '修改聚會時間'} onClick={this.handleItemClick}/>
              <Menu.Item name='修改交通資訊' active={activeItem === '修改交通資訊'} onClick={this.handleItemClick}/>
              <Menu.Item name='修改主日信息影音' active={activeItem === '修改主日信息影音'} onClick={this.handleItemClick}/>
              <Menu.Item name='修改官網/FB' active={activeItem === '修改官網/FB'} onClick={this.handleItemClick}/>
              <Menu.Item name='修改小組聚會資訊' active={activeItem === '修改小組聚會資訊'} onClick={this.handleItemClick}/>
              <Menu.Item name='修改週報/News' active={activeItem === '修改週報/News'} onClick={this.handleItemClick}/>
              <Menu.Item name='修改加入好友' active={activeItem === '修改加入好友'} onClick={this.handleItemClick}/>
              <Menu.Item name='修改今日聖言' active={activeItem === '修改今日聖言'} onClick={this.handleItemClick}/>
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <EditReplies/>
          </Grid.Column>
        </Grid.Row>
      )
    } else if(hasSendRequest && !hasLoggedIn) {
      return (
        <Loader active inline='centered' />
      )
    } else {
      return (
        <Header as='H1' style={{color:'#484848', margin:'auto', fontFamily: 'Noto Sans TC'}}>請先登入</Header>
      )
    }
  }

	render() {
    const renderBody  = this.renderBody;
    const userName = this.state.userName;
    const userImageUrl = this.state.userImageUrl;
    return (
      <Grid>
        <Grid.Row columns={1} style={{padding: '0px'}}>
          <Segment raised style={{background: '#37474f', margin: '0px', flex:1}}>
            <div style={{flexDirection: 'row', display: 'flex' }}>
              <Image style={{height:'52px', width:'52px'}} src={lineLogo}/>
              <Header as='h1' style={{color:'white', margin:'0px', padding:'8px', flex:1, fontFamily: 'Roboto'}}>LINE Console</Header>
              <Image avatar src={userImageUrl} style={{width:'52px', height:'52px', padding:'8px'}}/>
              <Header as='h1' style={{color:'white', margin:'0px', minWidth:'100px', padding:'8px', fontFamily: 'Noto Sans TC'}}>{userName}</Header>
              <Button floated='right' style={{color:'white', background:'#00B300', margin:'8px'}} onClick={this.handleLoginClicked}>LINE LOGIN</Button>
            </div>
          </Segment>
        </Grid.Row>
        {renderBody()}
      </Grid>
    );
  }
	
}
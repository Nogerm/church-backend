import React, { Component}  from 'react';
import packageJson from '../../package.json';
import axios from 'axios';
import { Header, Segment, Button, Label, Table, Loader } from 'semantic-ui-react';

export default class ManageRichMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      richmenus: [],
      defaultId: "",
      isLoading: false
    };
  }

  componentDidMount() {
    this.queryRichMenuList();
  }

  queryRichMenuList = () => {
    this.setState({
      isLoading: true
    });
    const get_url = packageJson.server + '/default_rich_menu';
    axios.get(get_url)
    .then(response => {
      console.log("[queryRichMenuList] success");
      this.setState({
        defaultId: response.data.richMenuId
      }, () => {
        const get_url = packageJson.server + '/rich_menu_list';
        axios.get(get_url)
        .then(response => {
          console.log("[queryRichMenuList] success");
          this.setState({
            richmenus: response.data.richmenus,
            isLoading: false
          });
        })
        .catch(error => {
          console.log("[queryRichMenuList] error" + error);
        });
      });
    })
    .catch(error => {
      console.log("[queryRichMenuList] error" + error);
    });
  }

  onDeleteClick = (id) => {
    const url = packageJson.server + '/delete_rich_menu';
    const data = {
      id: id
    }
    axios.post(url, data, {
      headers:{
        'content-type': 'application/json'
      }
    })
    .then(response => {
      console.log("[onDeleteClick] success");
      alert("刪除圖文選單成功: " + id);
      this.queryRichMenuList();
    })
    .catch(error => {
      console.log("[onDeleteClick] error" + error);
      alert("刪除圖文選單失敗，錯誤訊息: " + error);
    });
  }

  booleanToString = (boolean) => {
    if(boolean) return "是";
    else return "否";
  }

  renderDefaultLabel = (id) => {
    if(id === this.state.defaultId) {
      return (
        <Label color='green' horizontal>
          Default
        </Label>
      )
    }
  }

  render() {
    const { isLoading } = this.state;
    const menusArray = this.state.richmenus;
    const renderDefaultLabel = this.renderDefaultLabel;
    const booleanToString = this.booleanToString;
    const onDeleteClick = this.onDeleteClick;
    return(
      <div>
        <Header as="h1" style={{fontFamily: 'Noto Sans TC'}}>{this.props.title}</Header>
        <Segment raised>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine style={{fontFamily: 'Noto Sans TC'}}>選單名稱</Table.HeaderCell>
                <Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}}>聊天列標題</Table.HeaderCell>
                <Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}}>唯一識別碼</Table.HeaderCell>
                <Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}}>預設為顯示</Table.HeaderCell>
                <Table.HeaderCell style={{fontFamily: 'Noto Sans TC'}}>操作</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {isLoading && <Table.Row>
                  <Table.Cell colSpan='5'>
                    <Loader active inline='centered' />
                  </Table.Cell>
                </Table.Row>
              }
              {menusArray.map(function(menu, index){
                return (
                  <Table.Row key={menu.richMenuId}>
                    <Table.Cell>
                      <Header as='h4' style={{fontFamily: 'Noto Sans TC'}}>
                        {menu.name}
                      </Header>
                      {renderDefaultLabel(menu.richMenuId)}
                    </Table.Cell>
                    <Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{menu.chatBarText}</Table.Cell>
                    <Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{menu.richMenuId}</Table.Cell>
                    <Table.Cell singleLine style={{fontFamily: 'Noto Sans TC'}}>{booleanToString(menu.selected)}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button style={{color:'white', background:'#d32f2f'}} onClick={() => onDeleteClick(menu.richMenuId)}>刪除</Button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    )
  }

}
import React from 'react';
import Base from '../common/Base';
import { observer, inject } from "mobx-react";
import Login from '../login/Login';
import RaisedButton from 'material-ui/RaisedButton';

@inject("userStore", "usersStore")
@observer
class Home extends Base {

  render() {
    const { _inited } = this.props.userStore;
    if (!_inited) return (
      <Login />
    )
    const { _nome } = this.props.usersStore;
    return (
      <div style={{ textAlign: 'center' }}>
          <br /> <br /> Olá, <b>{_nome}</b> o que você deseja fazer ?<br /><br /><br />
          <div>
              <RaisedButton
                  style={{ container: { borderRadius: 10 }, minWidth: 200, borderRadius: 10 }}
                  className="loginButton "
                  label="Quero Ajudar!"
                  secondary={true}
                  onClick={() => this.props.userStore.changeRoute(this._const.ROUTE_CONNECT)}
              />
              <br /><br /><br />
              <RaisedButton
                  style={{ container: { borderRadius: 10 }, minWidth: 200, borderRadius: 10 }}
                  className="loginButton "
                  label="Preciso de Ajuda!"
                  secondary={true}
                  onClick={() => this.props.userStore.changeRoute(this._const.ROUTE_CONNECT)}
              />
          </div>
      </div>
  );
  }
}

export default Home;

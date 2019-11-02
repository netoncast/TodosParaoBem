import React from 'react';
import Base from '../common/Base';
import { observer, inject } from "mobx-react";
import Login from '../login/Login';
import Dados from './Dados';

@inject("userStore")
@observer
class Perfil extends Base {

  render() {
    const { _inited } = this.props.userStore;
    if (!_inited) return (
      <Login />
    )
    return (
      <div style={{ textAlign: 'center' }}>
        <br /> 
        <Dados showAll={true} data={this.props.userStore.root.usersStore} />
      </div>
    );
  }
}

export default Perfil;

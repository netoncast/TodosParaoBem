import React from 'react';
import TextField from 'material-ui/TextField';
import Base from '../common/Base';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { observer, inject } from "mobx-react"
import Loader from 'react-loader-spinner'
import RecoveryPass from './RecoveryPass'

//Objeto para aplicar stilo nos textinputs do Login.
export const _loginStyles = {
  errorStyle: {
    color: "#fff"
  },
  underlineStyle: {
    borderColor: "#feaa00"
  },
  floatingLabelStyle: {
    color: "#fff"
  },
  floatingLabelFocusStyle: {
    color: "#fff"
  }
};

/**
 * Classe Login - Cria o formulário de login.
 */
@inject("userStore")
@observer
class Login extends Base {

  checkLogin() {
    this.props.userStore.emailLogin();
  }

  changeLogin(event, newValue) {
    this.props.userStore.changeValue('_email', newValue);
  }

  chagePass(event, newValue) {
    this.props.userStore.changeValue('_pass', newValue);
  }

  render() {
    const { _isChecking, _isOnline, _email, _pass, _version } = this.props.userStore;

    if (_isChecking) return (
      <div style={{ textAlign: 'center' }}>
        <br /><br /> <br />
        <Loader
          type="MutatingDots"
          color="orange"
          height={100}
          width={100}
          timeout={130000} //3 secs
        />
        <div style={{ fontSize: 16 }}> Verificando ...</div>
      </div>
    )

    return (

      <div style={{ textAlign: 'center' }}>
        <br />
        <div style={{ fontSize: 16 }}>
          É novo por aqui, seja bem vindo(a).<br />
          Clique e faça o seu cadastro.
        </div>
        <br />
        <RaisedButton
          style={{ container: { borderRadius: 10 }, minWidth: 200, borderRadius: 10 }}
          disabled={!_isOnline || _isChecking}
          className="loginButton "
          label={!_isOnline ? "Aguarde está offline" : "Cadastre-se"}
          secondary={true}
          onClick={() => this.props.userStore.changeRoute(this._const.ROUTE_CADASTRO)} />
        <br />

        <div style={{ fontSize: 16 }}>
          <br />
          Agora se já possui conta, faça o login.
        </div>

        <div>
          <FontIcon className="iconsLogin material-icons">mail</FontIcon>&nbsp;&nbsp;
          <TextField
            autoComplete='off'
            value={_email}
            onChange={this.changeLogin.bind(this)}
            hintText=" "
            underlineStyle={_loginStyles.underlineStyle}
            underlineFocusStyle={_loginStyles.underlineStyle}
            floatingLabelStyle={_loginStyles.floatingLabelStyle}
            floatingLabelFocusStyle={_loginStyles.floatingLabelStyle}
            floatingLabelText="E-mail" />
        </div>
        <div>
          <FontIcon className="material-icons iconsLogin">lock</FontIcon>&nbsp;&nbsp;
          <TextField
            value={_pass}
            hintText=""
            onChange={this.chagePass.bind(this)}
            underlineStyle={_loginStyles.underlineStyle}
            underlineFocusStyle={_loginStyles.underlineStyle}
            floatingLabelStyle={_loginStyles.floatingLabelStyle}
            floatingLabelFocusStyle={_loginStyles.floatingLabelStyle}
            type="password"
            floatingLabelText="Senha" />
        </div>
        <br />
        <RaisedButton
          style={{ container: { borderRadius: 10 }, minWidth: 200, borderRadius: 10 }}
          disabled={!_isOnline || _isChecking}
          className="loginButton "
          label={!_isOnline ? "Aguarde está offline" : "Login"}
          secondary={true}
          onClick={this.checkLogin.bind(this)} />
        <br />
        <RecoveryPass store={this.props.userStore} />
        <div style={{fontSize: 9}}>v{_version}</div>
        <br /> <br /> <br /> <br />

      </div>
    )
  }
}
export default Login
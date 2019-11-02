import React from 'react';
import Router from '../../routes/Router';
import Base from '../common/Base';
import logo from '../../assets/logo.svg'
import { isMobile, isTablet } from "react-device-detect";
import { inject, observer } from "mobx-react"
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import Sair from 'material-ui/svg-icons/action/input';
import Profile from 'material-ui/svg-icons/action/perm-contact-calendar';
import Cons from 'material-ui/svg-icons/social/share';

import Snack from './Snack'

@inject("userStore")
@observer
class AppBox extends Base {

    render() {
        const { _currentPage, _inited, _isChecking } = this.props.userStore
        return (
            <div>
                <div className='header' style={{ width: '100%', backgroundColor: '#fff', textAlign: 'center', padding: 20, }}>
                    <img onClick={() => this.props.userStore.changeRoute(this._const.ROUTE_HOME)} src={logo} alt=' ' style={{ width: isMobile ? isTablet ? 330 : 200 : 400 }} />
                </div>
                { (_inited || _currentPage === this._const.ROUTE_CADASTRO )  && !_isChecking &&
                    <div style={{ textAlign: 'center' }}>
                        <br />
                        <IconButton style={{ backgroundColor: _currentPage === this._const.ROUTE_HOME ? 'orange' : null }} tooltip="Home" onClick={() => this.props.userStore.changeRoute(this._const.ROUTE_HOME)}>
                            <ActionHome />
                        </IconButton>
                        {_inited &&
                            <span>
                                <IconButton style={{ backgroundColor: _currentPage === this._const.ROUTE_CONNECT ? 'orange' : null }} tooltip="Minhas Conexões" onClick={() => this.props.userStore.changeRoute(this._const.ROUTE_CONNECT)}>
                                    <Cons />
                                </IconButton>
                                <IconButton style={{ backgroundColor: _currentPage === this._const.ROUTE_PERFIL ? 'orange' : null }} tooltip="Meus Dados" onClick={() => this.props.userStore.changeRoute(this._const.ROUTE_PERFIL)}>
                                    <Profile />
                                </IconButton>
                                <IconButton tooltip="Sair" onClick={() => window.location.reload()}>
                                    <Sair />
                                </IconButton>
                            </span>
                        }
                    </div>
                }
                <Router />
                <Snack />
            </div>
        )
    }
}

export default AppBox
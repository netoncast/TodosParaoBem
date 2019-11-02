import React from 'react';
import Base from '../common/Base';
import { observer, inject } from "mobx-react";
import Login from '../login/Login';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { isMobile, isTablet } from "react-device-detect";
import SearchBar from '@opuscapita/react-searchbar';
import Aprove from './Aprove'
import Info from './Info';
import Profile from 'material-ui/svg-icons/action/perm-contact-calendar';
import IconButton from 'material-ui/IconButton';

let _maxW = isMobile ? isTablet ? 400 : 310 : 400;

const style = {
    minHeight: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    width: 300,
    margin: 5,
    textAlign: 'left',
    padding: 10,
    display: 'inline-block',
};


@inject("userStore", "usersStore", "peopleStore")
@observer
class Connect extends Base {

    render() {
        const { _inited, _uid } = this.props.userStore;
        const { _areas, _types, _userConnects } = this.props.usersStore;
        const { _usersSearch, _total } = this.props.peopleStore;
        if (!_inited) return (
            <Login />
        )
        return (
            <div style={{ textAlign: 'center' }}>
                <center>
                    <Aprove />
                    <Info />
                    <div style={{ width: _maxW - 30 }}>
                        <br />
                        <SearchBar style={{ width: '100%' }} inputClassName='inputClass' onClear={() => this.props.peopleStore.clearSearch()} onSearch={(text) => this.props.peopleStore.search(text)} translations={{ searchPlaceHolder: 'Procurar' }} isDynamic={true} />
                        Mostrando: {_usersSearch.length} de {_total}
                        <br /><br />
                    </div>
                    {_usersSearch && _usersSearch.map(data => <div key={data._uid} style={{ width: _maxW }}>
                        <Paper style={style}>
                            {data._nome}
                            <div style={{float: 'right'}}>
                                <IconButton style={{color: 'orange'}} tooltip="Info" onClick={() => this.props.usersStore.showInfoDialog(data, _userConnects && _userConnects[data._uid] && _userConnects[data._uid] === 3)}>
                                    <Profile />
                                </IconButton>
                            </div>
                            <div>
                                {_types && _types.map(xdata => data._userTypes[xdata.id] ? <div key={xdata.id}> - {xdata.title}</div> : <div key={xdata.id} />)}
                                {_areas && _areas.map(xdata => data._userAreas[xdata.id] ? <div key={xdata.id}> - {xdata.title}</div> : <div key={xdata.id} />)}
                                <RaisedButton
                                    style={{ float: 'right', container: { borderRadius: 10 }, minWidth: 120, borderRadius: 10 }}
                                    label={_userConnects && _userConnects[data._uid] ? _userConnects[data._uid] === 3 ? "Conectado" : _userConnects[data._uid] === 2 ? "Aguardando sua Aprovação" : "Solicitação Enviada" : "Conectar"}
                                    secondary={true}
                                    buttonStyle={{ backgroundColor: _userConnects && _userConnects[data._uid] ? '#7a49ef' : '#4e3785' }}
                                    onClick={() => _userConnects && _userConnects[data._uid] ? _userConnects[data._uid] === 2 ? this.props.usersStore.showAproveDialog(data._uid) : null : this.props.usersStore.connect(_uid, data._uid)}
                                />
                            </div>
                        </Paper>

                    </div>)}
                    <br /><br /><br /><br /><br /><br /><br />
                </center>
            </div>
        );
    }
}

export default Connect;

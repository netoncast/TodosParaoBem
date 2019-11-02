import { createSwitchNavigator } from '@react-navigation/core';
import { createBrowserApp } from "@react-navigation/web";
import appC from '../containers/common/Constants';
import Home from '../containers/home/Home'
import Cadastro from '../containers/cadastro/Cadastro';
import Perfil from '../containers/perfil/Perfil';
import Connect from '../containers/connect/Connect';
var _me

if (window.Constants) {
    _me = window.Constants;
}
else {
    _me = new appC();
    window.Constants = _me;
}

function RouterCreate() {
    const SN = createSwitchNavigator(
        {
            [_me.ROUTE_HOME]: {
                screen: Home,
                path: 'home',
                navigationOptions: ({ navigation }) => ({
                    title: ' ',
                    
                }),
            },
            [_me.ROUTE_CADASTRO]: {
                screen: Cadastro,
                path: 'cadastro',
                navigationOptions: ({ navigation }) => ({
                    title: ' ',
                }),
            },
            [_me.ROUTE_PERFIL]: {
                screen: Perfil,
                path: 'perfil',
                navigationOptions: ({ navigation }) => ({
                    title: ' ',
                }),
            },
            [_me.ROUTE_CONNECT]: {
                screen: Connect,
                path: 'conectar',
                navigationOptions: ({ navigation }) => ({
                    title: ' ',
                }),
            },
        },
        {
            initialRouteName: _me.ROUTE_CADASTRO,
        }
    );
    return SN;
};

export default createBrowserApp(RouterCreate());
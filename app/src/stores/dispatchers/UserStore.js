import Base from '../Base';
import { observable, action, toJS } from 'mobx';
import * as firebase from 'firebase';
import fileconfig from './firebaseConfig.json'
let _me;

let config = fileconfig

let app = firebase.initializeApp(config);

export default class UserStore extends Base {

    @observable _isChecking = false;
    @observable _user = false;
    @observable _inited = false;
    @observable _currentPage = false;
    @observable _isOnline = false;
    @observable _email = '';
    @observable _uid = false;
    @observable _pass = '';
    @observable _showSnack = false;
    _snackIsShowing = false;
    @observable _msg = '';

    _version = "1.0.5";
    _navigator = false;
    _lastRoute = false;
    _lastRouteGoBack = false;

    constructor(root) {
        super(root);
        _me = this;
        firebase.database().ref(".info/connected").on("value", function (snap) {
            _me.setOnline(snap.val());
        });
        _me._currentPage = this._const.ROUTE_HOME;
        _me.emailLogin()
    }

    firebase = firebase

    @action showMsg(msg) {
        if (this._snackIsShowing) {
            if (msg !== toJS(this._msg))
                setTimeout(() => {
                    this.showMsg(msg)
                }, 2000);
            return;
        }
        this._msg = msg;
        this._showSnack = true;
        this._snackIsShowing = true;
        setTimeout(() => this.resetSnack(), 3000);
    }

    @action resetSnack() {
        this._showSnack = false;
        this._snackIsShowing = false;
    }

    @action setOnline(s) {
        _me._isOnline = s;
    }

    changeRoute(rota, title) {
        try {
            if (_me._lastRoute === rota) return;
            if (!window._NAVIGATOR) return;
            _me._lastRoute = rota;
            _me._lastRouteGoBack = rota;
            setTimeout(() => {
                _me._lastRoute = null;
            }, 2300);
            window._NAVIGATOR.navigate(rota);
            _me._currentPage = rota;
            if (title) _me._pageTitle = title;
            this.resetSnack()
        }
        catch (e) {
            console.log(e);
        };
    }

    resetValues() {
        _me._pass = '';
        _me._email = '';
    }

    @action recoveryPass(closeDialog) {
        if (!_me._email || _me._email.length < 6) {
            _me.showMsg("Preencha corretamente o seu e-mail.");
            return;
        }
        var check = this.validateEmail(_me._email);
        if (!check) {
            _me.showMsg("Preencha corretamente o seu e-mail.");
            return;
        }
        _me.showMsg("E-mail enviado. Confira sua caixa postal");
        firebase.auth().sendPasswordResetEmail(_me._email);
        if (closeDialog) closeDialog();
    }

    async emailLogin() {
        if (!_me._email || _me._email.length < 6) {
            _me.showMsg("Preencha corretamente o seu e-mail.");
            return;
        }
        var check = this.validateEmail(_me._email);
        if (!check) {
            _me.showMsg("Preencha corretamente o seu e-mail.");
            return;
        }
        if (!_me._pass || _me._pass.length < 4) {
            _me.showMsg("Preencha corretamente a sua senha.");
            return;
        }
        _me._isChecking = true;
        app.auth().signInWithEmailAndPassword(_me._email, _me._pass)
            .then((data) => {
                if (data.user) _me.getUserData(data.user.uid)
                else {
                    _me.showMsg("Este usuário ainda não foi cadastrado ou não existe. Verifique suas credenciais.");
                    _me._isChecking = false;
                }
            })
            .catch((error) => {
                _me._isChecking = false;
                if (error && error.code && error.code === "auth/user-not-found") {
                    _me.showMsg("Este usuário ainda não foi cadastrado ou não existe.  Verifique suas credenciais.");
                }
                else {
                    _me.showMsg("Senha inválida");
                }
            });
    }

    @action getUserData(uid) {
        this._uid = uid;
        firebase.database().ref('users/'+uid).once('value').then(function(snap) {
            if (snap.val()) {
                _me._user = snap.val();
                for ( var i in snap.val()) _me.root.usersStore[i] = snap.val()[i]
                _me._inited = true;
            }
            else {
                _me.showMsg("Este usuário ainda não foi cadastrado ou não existe. Verifique suas credenciais.");
            }
            _me._isChecking = false;
        })
    }

    validateEmail(email) {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}
import Base from '../Base';
import { observable, action, toJS, computed } from 'mobx';
export default class UsersStore extends Base {

    @observable _isSaving = false;
    @observable _steps = 0;
    @observable _userAreas = {}
    @observable _userTypes = {}
    @observable _currentIDforAprove = false;
    @observable _showAproveDialog = false;
    @observable _currentInfo = false;
    @observable _showAInfoDialog = false;
    @observable _showAllInfo = false;
    @observable _userConnects = {}

    @observable _nome = ''
    @observable _email = ''
    @observable _pass = ''
    @observable _desc = ''
    @observable _phone = ''
    @observable _types = []
    @observable _areas = []

    constructor(root) {
        super(root)
        this.getAreas();
        this.getTypes();
    }

    @action getAreas() {
        var me = this;
        this.root.userStore.firebase.database().ref('resources/areasData').on("value", function (snap) {
            if (snap.val) {
                var na = []
                for (var i in snap.val()) na.push(snap.val()[i])
                me.multsortArr(na, ['title'], ['ASC'])
                me._areas = na;
            }
        })
    }

    @action showAproveDialog(id) {
        this._currentIDforAprove =id;
        this._showAproveDialog =true;
    }


    @action showInfoDialog(user, connected) {
        if (connected) this._showAllInfo = true
        else this._showAllInfo = false
        this._currentInfo=user;
        this._showAInfoDialog =true; 
    }



    @action connect(userID, idFriend) {
        if (userID && idFriend) {
            this._userConnects[idFriend] = true;
            this.root.userStore.firebase.database().ref("users/" + userID + '/_userConnects/' + idFriend).set(true)
            this.root.userStore.firebase.database().ref("users/" + idFriend + '/_userConnects/' + userID).set(2)
        }
    }

    @action accept() {
        if (this.root.userStore._uid && this._currentIDforAprove) {
            this._userConnects[this._currentIDforAprove] = 3;
            this.root.userStore.firebase.database().ref("users/" + this.root.userStore._uid + '/_userConnects/' + this._currentIDforAprove).set(3)
            this.root.userStore.firebase.database().ref("users/" + this._currentIDforAprove+ '/_userConnects/' + this.root.userStore._uid).set(3)
            this._currentIDforAprove = false;
            this._showAproveDialog = false;
        }
    }

    @action getTypes() {
        var me = this;
        this.root.userStore.firebase.database().ref('resources/typesData').on("value", function (snap) {
            if (snap.val) {
                var na = []
                for (var i in snap.val()) na.push(snap.val()[i])
                me.multsortArr(na, ['title'], ['ASC'])
                me._types = na;
            }
        })
    }

    @action backStep() {
        this._steps--;
    }

    @action nextStep() {
        var getNext = true;
        switch (toJS(this._steps)) {
            case 0:
                if (!this._nome || this._nome.length < 2) {
                    getNext = false;
                    this.root.userStore.showMsg("Preencha corretamente o seu nome.")
                }
                break;
            case 1:
                if (!this._email || this._email.length < 2) {
                    this.root.userStore.showMsg("Preencha corretamente o seu e-mail.")
                }
                var check = this.root.userStore.validateEmail(this._email);
                if (!check) {
                    this.root.userStore.showMsg("Preencha corretamente o seu e-mail.")
                }
                else {
                    this._isSaving = true;
                    this.checkEmailExist();
                }
                getNext = false;
                break;
            case 2:
                if (!this._pass || this._pass.length < 4) {
                    getNext = false;
                    this.root.userStore.showMsg("Senha inválida: Mínimo de 5 caracteres")
                }
                break
            case 3:
                if (!this._phone || this._phone.length < 2) {
                    getNext = false;
                    this.root.userStore.showMsg("Preencha corretamente o seu telefone.")
                }
                break
            case 4:
                if (Object.keys(this._userTypes).length === 0) {
                    getNext = false;
                    this.root.userStore.showMsg("Marque um item.")
                }
                break;
            case 5:
                if (Object.keys(this._userAreas).length === 0) {
                    getNext = false;
                    this.root.userStore.showMsg("Selecione ao menos um item.")
                }
                break;
            case 6:
                this.saveToFire()
                break;
            default:
                break;
        }
        if (this._steps < 6 && getNext) this._steps++;
    }

    @action checkEmailExist() {
        var me = this;
        this.root.userStore.firebase.auth().fetchSignInMethodsForEmail(this._email).then(function (e, v) {
            if (e && e.length > 0) {
                me.root.userStore.showMsg("Este e-mail já possui um cadastro.")
            }
            else {
                me._steps++;
            }
            me._isSaving = false;
        })
    }


    @computed get _userAreasArr() {
        return toJS(this._userAreas)
    }

    @computed get _userTypesArr() {
        return toJS(this._userTypes)
    }

    @action addRemoveArea(isForAdd, area) {
        if (!area) return;
        if (isForAdd) this._userAreas[area.id] = true;
        else delete this._userAreas[area.id];
    }

    @action addRemoveType(isForAdd, area) {
        if (!area) return;
        if (isForAdd) {
            var o = {}
            o[area.id] = true
            this._userTypes = o;
        }
        else delete this._userTypes[area.id];
    }

    @action saveToFire() {
        this._isSaving = true;
        this.root.userStore._isChecking = true;
        var me = this;
        this.root.userStore.firebase.auth().createUserWithEmailAndPassword(this._email, this._pass)
            .then(function (data) {
                me.saveDataToUser(data.user.uid)
                me.root.userStore._isChecking = false;
            })
            .catch(function (error) {
                if (error) {
                    if (error.code === "auth/email-already-in-use") {
                        me.root.userStore.showMsg("Este e-mail já foi utilizado.");
                        me._steps = 1
                    }
                    else {
                        me.root.userStore.showMsg("Ocorreu um erro ao tentar criar o usuário");
                    }
                }
                me._isSaving = false;
                me.root.userStore._isChecking = false;
            });
    }

    @action saveDataToUser(uid) {
        var me = this;
        me.root.userStore._uid = uid
        var dados = {
            _uid: uid,
            _nome: toJS(this._nome),
            _email: toJS(this._email),
            _phone: toJS(this._phone),
            _desc: toJS(this._desc),
            _userAreas: toJS(this._userAreas),
            _userTypes: toJS(this._userTypes)
        }
        this.root.userStore.firebase.database().ref("users/" + uid).set(dados).then(function (ok) {
            me._isSaving = false;
            me.root.userStore._inited = true
            me.root.userStore.changeRoute(me._const.ROUTE_HOME)
            me.root.userStore.showMsg("Usuário cadastrado com sucesso.");
            me.root.userStore._user = dados;
        })
    }
}
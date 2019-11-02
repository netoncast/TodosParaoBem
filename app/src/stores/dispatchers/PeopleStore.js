import Base from '../Base';
import { observable, action } from 'mobx';

export default class PeopleStore extends Base {

    @observable _isSaving = false;
    @observable _steps = 0;
    @observable _users = []
    @observable _usersSearch = []
    @observable _total = 0;

    constructor(root) {
        super(root)
        this.getPeople();

    }

    @action getPeople() {
        var me = this;
        this.root.userStore.firebase.database().ref('users').on("value", function (snap) {
            if (snap.val) {
                var na = []
                for (var i in snap.val()) na.push(snap.val()[i])
                me.multsortArr(na, ['_nome'], ['ASC'])
                me._usersArr = na;
                me._usersSearch = na.slice(0, 100);
                me._total = na.length;
            }
        })
    }

    @action clearSearch() {
        this._usersSearch = this._usersArr.slice(0, 100);
    }

    async search(str) {
        await this.searchExec(str)
    }

    @action searchExec(str) {
        var _me = this;
        var text = str.toUpperCase();
        if (text.length === 0) return;
        this._isLoading = true;
        var arr = [];
        var count = 0;
        for (var u in _me._usersArr) {
            if (count > 200) break;
            var us = _me._usersArr[u];
            if (u && us) {
                if (us._nome && String(us._nome).toUpperCase().includes(text)) {
                    arr.push(us)
                    count++
                    continue
                }
            }
        }
        var na = []
        for (us in arr) {
            u = arr[us]
            na.push(u)
        }
        _me.multsortArr(na, ['_nome'], ['ASC'])
        _me._usersSearch = arr;
        this._isLoading = false;
    }

}
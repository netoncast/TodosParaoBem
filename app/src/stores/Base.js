
import Numeral from "numeral";
import "numeral/locales/pt-br";
import BaseClass from "../containers/common/Base"
import { action } from 'mobx';

export default class Base extends BaseClass {

    constructor(root) {
        super();
        this.root = root;
        this.fireStore = root.fireStore;
        this.apiStore = root.apiStore;
        Numeral.locale('pt-br');
    }
    _isDebug = true;

    @action changeValue(what, value) {
        this[what] = value;
    }
   
}
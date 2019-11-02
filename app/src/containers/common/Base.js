import { Component } from 'react';
import appC from './Constants';
import Numeral from "numeral";
import "numeral/locales/pt-br";

class Base extends Component {

    constructor(props) {
        super(props);
        if (window.Constants) {
            this._const = window.Constants;
        }
        else {
            this._const = new appC();
            window.Constants = this._const;
        }
        Numeral.locale('pt-br');
        if (props && props.navigation && !window._NAVIGATOR) {
            window._NAVIGATOR = props.navigation
            window._NAVIGATOR.navigate(this._const.ROUTE_HOME);
        }
    };


    formatNumber(n, f) {
        return Numeral(n).format(f);
    }

    getDate(data, inverse) {
        var d = data.trim();
        if (inverse) {
            let nd = this.formataCampo(d, '0000/00/00');
            return nd.split('/').reverse().join('/');
        }
        else {
            return this.formataCampo(d, '00/00/0000');
        }
    }

    formataCampo(campo, Mascara) {
        var boleanoMascara;
        let campoSoNumeros = campo;
        var posicaoCampo = 0;
        var NovoValorCampo = "";
        var TamanhoMascara = campoSoNumeros.length;;
        let i;
        for (i = 0; i <= TamanhoMascara; i++) {
            boleanoMascara = ((Mascara.charAt(i) === "-") || (Mascara.charAt(i) === ".") || (Mascara.charAt(i) === "/"))
            boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === "(") || (Mascara.charAt(i) === ")") || (Mascara.charAt(i) === " "))
            if (boleanoMascara) {
                NovoValorCampo += Mascara.charAt(i);
                TamanhoMascara++;
            } else {
                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                posicaoCampo++;
            }
        }
        return NovoValorCampo;

    }


    dateCheckValue(n) {
        return (n < 10 ? '0' : '') + n;
    }

    getDateFormated(ago, time, d) {
        let date = d ? d : new Date();
        if (ago) date.setDate(date.getDate() - time);
        return this.dateCheckValue(date.getDate()) + '/' + this.dateCheckValue(date.getMonth() + 1) + '/' + date.getFullYear();
    }

    getDateFormatedClean(ago, time, d) {
        let date = d ? d : new Date();
        if (ago) date.setDate(date.getDate() - time);
        return date.getFullYear() + this.dateCheckValue(date.getMonth() + 1) + this.dateCheckValue(date.getDate());
    }

    debug(msg) {
        this.root.appStore.log(msg);
    }

    generateID() {
        let loc1 = new Date();
        let key = parseInt(loc1.valueOf(), 10);
        return key;
    }

    toTitleCase(str) {
        try {
            return str.replace(/\w\S*/g, function (txt) {
                return txt
                    .charAt(0)
                    .toUpperCase() + txt
                        .substr(1)
                        .toLowerCase();
            });
        } catch (e) {
            //console.log(e);
            return str;
        }
    };

    multsortArr(arr, columns, order_by) {
        var x;
        if (typeof columns === 'undefined') {
            columns = []
            for (x = 0; x < arr[0].length; x++) {
                columns.push(x);
            }
        }
        if (typeof order_by === 'undefined') {
            order_by = [];
            for (x = 0; x < arr[0].length; x++) {
                order_by.push('ASC');
            }
        }
        function multisort_recursive(a, b, columns, order_by, index) {
            var direction = order_by[index] === 'DESC' ? 1 : 0;
            var is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);
            var x = is_numeric ? +a[columns[index]] : a[columns[index]].toLowerCase();
            var y = is_numeric ? +b[columns[index]] : b[columns[index]].toLowerCase();
            if (x < y) {
                return direction === 0 ? -1 : 1;
            }
            if (x === y) {
                return columns.length - 1 > index ? multisort_recursive(a, b, columns, order_by, index + 1) : 0;
            }
            return direction === 0 ? 1 : -1;
        }
        return arr.sort(function (a, b) {
            return multisort_recursive(a, b, columns, order_by, 0);
        });
    }
}

export default Base;
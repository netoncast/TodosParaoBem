import React from 'react';
import Base from '../common/Base';
import TextField from 'material-ui/TextField';
import { observer, inject } from "mobx-react"
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/navigation/arrow-back';
import { CSSTransition } from "react-transition-group";
import Loader from 'react-loader-spinner'

const styles = {
    bounce: {
        textAlign: 'center', color: "#fff"
    },
}

const _loginStyles = {
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

let _maxW = 330;

@inject("usersStore")
@observer
class Cadastro extends Base {

    state = {
        show: true
    }

    render() {
        const { _isSaving, _desc, _email, _nome, _pass, _phone, _areas, _steps, _types, _userAreasArr, _userTypesArr } = this.props.usersStore;
        const _store = this.props.usersStore;
        const _showAll = this.props.showAll
        if (_isSaving) return (
            <div style={styles.bounce}>
                <br /><br /> <br />
                <Loader
                    type="MutatingDots"
                    color="orange"
                    height={100}
                    width={100}
                    timeout={130000} //3 secs
                />
                <div style={{ fontSize: 16 }}> Aguarde ...</div>
            </div>
        )
        return (
            <CSSTransition in={this.state.show} timeout={2200} classNames="my-node" unmountOnExit>
                <div style={styles.bounce}>
                    <br />
                    {(_steps === 0 || _showAll) &&
                        <div>
                            <div style={{ fontSize: 24 }}> Qual o seu nome ?</div>
                            <TextField
                                id='x'
                                floatingLabelText="Nome:"
                                underlineStyle={_loginStyles.underlineStyle}
                                underlineFocusStyle={_loginStyles.underlineStyle}
                                floatingLabelStyle={_loginStyles.floatingLabelStyle}
                                floatingLabelFocusStyle={_loginStyles.floatingLabelStyle}
                                onChange={(event, newValue) => _store.changeValue('_nome', newValue)}
                                value={_nome} />
                        </div>
                    }
                    {(_steps === 1 || _showAll) &&
                        <div>
                            <div style={{ fontSize: 24 }}> Qual o seu e-mail ?</div>
                            <TextField
                                id='y'
                                floatingLabelText="E-mail:"
                                underlineStyle={_loginStyles.underlineStyle}
                                underlineFocusStyle={_loginStyles.underlineStyle}
                                floatingLabelStyle={_loginStyles.floatingLabelStyle}
                                floatingLabelFocusStyle={_loginStyles.floatingLabelStyle}
                                onChange={(event, newValue) => _store.changeValue('_email', newValue)}
                                value={_email} />
                        </div>
                    }
                    {(_steps === 2) &&
                        <div>
                            <div style={{ fontSize: 24 }}> Digite sua senha</div>
                            <TextField
                                id='ys'
                                floatingLabelText="Senha:"
                                type="password"
                                underlineStyle={_loginStyles.underlineStyle}
                                underlineFocusStyle={_loginStyles.underlineStyle}
                                floatingLabelStyle={_loginStyles.floatingLabelStyle}
                                floatingLabelFocusStyle={_loginStyles.floatingLabelStyle}
                                onChange={(event, newValue) => _store.changeValue('_pass', newValue)}
                                value={_pass} />
                        </div>
                    }
                    {(_steps === 3 || _showAll) &&
                        <div>
                            <div style={{ fontSize: 24 }}> Qual o seu telefone ?</div>
                            <TextField
                                id='z'
                                floatingLabelText="DDD + Telefone:"
                                underlineStyle={_loginStyles.underlineStyle}
                                underlineFocusStyle={_loginStyles.underlineStyle}
                                floatingLabelStyle={_loginStyles.floatingLabelStyle}
                                floatingLabelFocusStyle={_loginStyles.floatingLabelStyle}
                                onChange={(event, newValue) => _store.changeValue('_phone', newValue)}
                                value={_phone} />
                        </div>
                    }
                    {(_steps === 4 || _showAll) &&
                        <div>
                            <div style={{ textAlign: 'center' }}>
                                <center>
                                    <div style={{ maxWidth: _maxW, textAlign: "left" }}>
                                        <div style={{ fontSize: 24 }}> Como se identifica ?</div>
                                        <br />
                                        {_types && _types.map(data => <Checkbox
                                            checkedIcon={<ActionFavorite color='#000' />}
                                            uncheckedIcon={<ActionFavoriteBorder />}
                                            key={'check_' + data.id} label={data.title} checked={_userTypesArr[data.id] ? true : false} onCheck={(e, checked) => _store.addRemoveType(checked, data)}
                                        />
                                        )}
                                    </div>
                                </center>
                            </div>
                        </div>
                    }
                    {(_steps === 5 || _showAll) &&
                        <div>
                            <div style={{ textAlign: 'center' }}>
                                <center>
                                    <div style={{ maxWidth: _maxW, textAlign: "left" }}>
                                        <div style={{ fontSize: 24 }}>Quem você quer impactar ?</div>
                                        <br />
                                        {_areas && _areas.map(data =>
                                            <Checkbox key={'check_' + data.id}
                                                checked={_userAreasArr[data.id] ? true : false}
                                                onCheck={(e, checked) => _store.addRemoveArea(checked, data)}
                                                checkedIcon={<ActionFavorite color='#000' />}
                                                uncheckedIcon={<ActionFavoriteBorder />}
                                                label={data.title}
                                            />)}
                                    </div>
                                </center>

                            </div>
                        </div>
                    }
                      {(_steps === 6 || _showAll) &&
                        <div>
                            <div style={{ fontSize: 18 }}> Nos conte um pouco sobre os seus projetos ?</div>
                             <TextField
                                id='z'
                                //floatingLabelText="Breve descrição:"
                                rows={5}
                                multiLine={true}
                                rowsMax={7}
                                underlineStyle={_loginStyles.underlineStyle}
                                underlineFocusStyle={_loginStyles.underlineStyle}
                                floatingLabelStyle={_loginStyles.floatingLabelStyle}
                                floatingLabelFocusStyle={_loginStyles.floatingLabelStyle}
                                onChange={(event, newValue) => _store.changeValue('_desc', newValue)}
                                value={_desc} />
                                 <div style={{ fontSize: 12 }}> ** Este campo não é obrigatório</div>
                        </div>
                    }
                    <br /> <br />
                    {!_showAll &&
                        <div>
                            <RaisedButton
                                style={{ container: { borderRadius: 10 }, minWidth: 200, borderRadius: 10 }}
                                className="loginButton "
                                label={_steps === 6 ? "Cadastrar" : "Próximo"}
                                secondary={true}
                                onClick={() => this.props.usersStore.nextStep()}
                            />
                        </div>
                    }
                    {_steps > 0 && !_showAll &&
                        <div>
                            <IconButton tooltip="Anterior" onClick={() => this.props.usersStore.backStep()}>
                                <ActionHome />
                            </IconButton>
                        </div>
                    }
                </div>
            </CSSTransition>
        )
    }
}

export default Cadastro
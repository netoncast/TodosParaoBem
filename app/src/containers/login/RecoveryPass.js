import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Forget from 'material-ui/svg-icons/communication/vpn-key';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { observer } from "mobx-react"

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
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
@observer
class RecoveryPass extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { _email } = this.props.store;
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Enviar"
                primary={true}
                keyboardFocused={true}
                onClick={()=> this.props.store.recoveryPass(this.handleClose)}
            />,
        ];

        return (
            <div >
                <div style={{ fontSize: 10 }}> <center><br />Esqueceu a senha?</center></div>
                <IconButton tooltip="Esqueceu a senha?" onClick={this.handleOpen}>
                    <Forget />
                </IconButton>
                <Dialog
                    bodyStyle={{ backgroundColor: '#4e3785' }}
                    titleStyle={{ backgroundColor: '#4e3785' }}
                    actionsContainerStyle={{ backgroundColor: '#4e3785' }}
                    title="Recuperar senha:"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div>
                        <TextField
                            style={{ color: 'black' }}
                            autoComplete='off'
                            value={_email}
                            onChange={(event, newValue) => this.props.store.changeValue("_email", newValue)}
                            hintText=" "
                            underlineStyle={_loginStyles.underlineStyle}
                            underlineFocusStyle={_loginStyles.underlineStyle}
                            floatingLabelStyle={_loginStyles.floatingLabelStyle}
                            floatingLabelFocusStyle={_loginStyles.floatingLabelStyle}
                            floatingLabelText="Digite seu e-mail" />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default RecoveryPass
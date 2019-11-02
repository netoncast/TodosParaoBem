import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { observer, inject } from "mobx-react";
import Dados from '../perfil/Dados';

@inject("usersStore")
@observer
class Info extends React.Component {
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
    const store = this.props.usersStore;
    const { _currentInfo, _showAInfoDialog, _showAllInfo } = store;
    const actions = [
      <FlatButton
        label="Fechar"
        primary={true}
        onClick={() => store.changeValue('_showAInfoDialog', false)}
      />,

    ];

    return (
      <div>
        <Dialog
          bodyStyle={{ backgroundColor: '#4e3785' }}
          titleStyle={{ backgroundColor: '#4e3785' }}
          actionsContainerStyle={{ backgroundColor: '#4e3785' }}
          title="Detalhes"
          actions={actions}
          modal={true}
          open={_showAInfoDialog}
        >
          <Dados data={_currentInfo} doNotshowExtra={true} showAllInfo={_showAllInfo}/>
        </Dialog>
      </div>
    );
  }
}
export default Info
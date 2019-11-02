import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { observer, inject } from "mobx-react";

@inject("usersStore")
@observer
class Aprove extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const store = this.props.usersStore;
    const { _showAproveDialog  } = store;
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={()=> store.changeValue('_showAproveDialog', false)}
      />,
      <FlatButton
        label="Aprovar"
        primary={true}
        onClick={()=> store.accept()}
      />,
    ];

    return (
      <div>
        <Dialog
       bodyStyle={{ backgroundColor: '#4e3785' }}
       titleStyle={{ backgroundColor: '#4e3785' }}
       actionsContainerStyle={{ backgroundColor: '#4e3785' }}
          title="Deseja aprovar a conexão ?"
          actions={actions}
          modal={true}
          open={_showAproveDialog }
        >
        </Dialog>
      </div>
    );
  }
}
export default  Aprove
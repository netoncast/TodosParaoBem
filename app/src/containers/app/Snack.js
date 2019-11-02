import React from 'react';
import Base from '../common/Base';
import { inject, observer } from "mobx-react"
import ReactSnackBar from "react-js-snackbar";
import SnackIcon from 'material-ui/svg-icons/action/info-outline';

@inject("userStore")
@observer
class Snack extends Base {

    render() {
        const { _msg, _showSnack } = this.props.userStore
        return (
            <ReactSnackBar Icon={<SnackIcon />} Show={_showSnack}>
           {_msg}
          </ReactSnackBar>
        )
    }
}

export default Snack
  
import React from 'react';
import { Provider } from 'mobx-react';
import RootStore from '../../stores/index';
import Base from '../common/Base';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBox from './AppBox';
const store = new RootStore();

//Defininindo a cores do tema que será usado pelo http://www.material-ui.com
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#fff",
    textColor: "#fff",
    disabledColor: "#feaa00",
    accent1Color: "#feaa00",
  },
  raisedButton: {
    disabledColor: "#906309",
  },
  textField: {
    textColor: "#fff",
  }
});

class App extends Base {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Provider {...store}>
          <AppBox />
        </Provider>
      </MuiThemeProvider>
    )
  }
}


export default App; 
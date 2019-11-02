import React from 'react';
import Base from '../common/Base';
import Responsive from 'react-responsive';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const Tablet = ({ children }) => <Responsive maxWidth={768} children={children} />;
const Desktop = ({ children }) => <Responsive minWidth={769} children={children} />;

let _me;

function Title(props) {
    return <div className='mobileAppBar'>  <span className='mobileTitleAppBar'>{_me.props.title}</span></div>;
}

function TitleDesk(props) {
    return <div> <FontIcon className="material-icons desktopIconAppBar" >{_me.props.icon}</FontIcon> <span className='desktopTitleAppBar'>{_me.props.title}</span></div>;
}

export default class ToolBar extends Base {

    constructor(props) {
        super(props);
        _me = this;
    }

    render() {
        return (
            <div>
                <Tablet>
                    <AppBar className="appBar" title={<Title />} onLeftIconButtonTouchTap={_me.goback}
                        iconElementRight={_me.props.rIcon &&
                            <FloatingActionButton mini={true} onTouchTap={() => _me.props.rFunction()}>
                                <FontIcon className="material-icons mobileIconAppBar" >{_me.props.rIcon}</FontIcon>
                            </FloatingActionButton>
                        }
                        iconElementLeft={_me.props.lIcon ?
                            <FloatingActionButton mini={true} onTouchTap={() => _me.props.lFunction()}>
                                <FontIcon className="material-icons mobileIconAppBar" >{_me.props.lIcon}</FontIcon>
                            </FloatingActionButton>
                            : < IconButton > <NavigationArrowBack /> </IconButton>
                        } 
                        
                    >
                        <div className='BoxYellowForMenu'> </div>
                    </AppBar>
                </Tablet>
                <Desktop>
                    <div style={{ padding: '10px' }}>
                        <AppBar className="desktopAppBar" showMenuIconButton={_me.props.lIcon ? true : false} title={<TitleDesk />}
                            iconElementRight={_me.props.rIcon &&
                                <FloatingActionButton mini={true} onTouchTap={() => _me.props.rFunction()}>
                                    <FontIcon className="material-icons mobileIconAppBar" >{_me.props.rIcon}</FontIcon>
                                </FloatingActionButton>
                            }
                            iconElementLeft={_me.props.lIcon &&
                                <FloatingActionButton mini={true} onTouchTap={() => _me.props.lFunction()}>
                                    <FontIcon className="material-icons mobileIconAppBar" >{_me.props.lIcon}</FontIcon>
                                </FloatingActionButton>
                            } />
                    </div>
                </Desktop>
            </div>
        );
    }
}



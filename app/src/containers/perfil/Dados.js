import React from 'react';
import Base from '../common/Base';
import { observer } from "mobx-react"
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { CSSTransition } from "react-transition-group";

const styles = {
    bounce: {
        textAlign: 'center', color: "#fff", padding: 20, overflow: 'scroll'
    },
}

const _maxW = 330;

@observer
class Dados extends Base {

    state = {show: true}

    render() {
        const { _email, _nome, _phone, _areas, _types, _userAreasArr, _userTypesArr, _desc } = this.props.data;
        return (
            <CSSTransition in={this.state.show} timeout={2200} classNames="my-node" style={{overflow: 'scroll'}} unmountOnExit>
                <div style={styles.bounce}>
                    <div style={{ textAlign: 'center' }}>
                        <center>
                            <div style={{ maxWidth: _maxW, textAlign: "left" }}>
                                <u>Nome</u>: {_nome}<br />
                                {this.props.showAllInfo && <div><u>E-mail</u>: {_email}<br /></div>}
                                {this.props.showAllInfo && <div><u>Telefone</u>: {_phone}<br /></div>}
                            </div>
                        </center>
                    </div>

                    {!this.props.doNotshowExtra &&
                        <div style={{ textAlign: 'center' }}>
                            <br />
                            <center>
                                <div style={{ maxWidth: _maxW, textAlign: "left" }}>
                                    <div> Como se identifica ?</div>
                                    <br />
                                    {_types && _types.map(data => <Checkbox key={'check_' + data.id} label={data.title} checked={_userTypesArr[data.id] ? true : false} />)}
                                </div>
                            </center>
                            <br />
                        </div>
                    }
                    {!this.props.doNotshowExtra &&
                        <div style={{ textAlign: 'center' }}>
                            <center>
                                <div style={{ maxWidth: _maxW, textAlign: "left" }}>
                                    <div>Quem você quer impactar ?</div>
                                    <br />
                                    {_areas && _areas.map(data =>
                                        <Checkbox key={'check_' + data.id}
                                            checked={_userAreasArr[data.id] ? true : false}
                                            checkedIcon={<ActionFavorite color='#000' />}
                                            uncheckedIcon={<ActionFavoriteBorder />}
                                            label={data.title}
                                        />)}
                                </div>
                            </center>
                        </div>
                    }
                    <div style={{ textAlign: 'center' }}>
                        <center>
                            <div style={{ maxWidth: _maxW, textAlign: "left" }}>
                                <br />
                                <div><u>Breve descrição</u>:</div>
                                {_desc}
                            </div>
                        </center>
                    </div>
                    {!this.props.doNotshowExtra && <div><br /><br /><br /><br /><br /></div>}
                </div>
            </CSSTransition>
        )
    }
}

export default Dados
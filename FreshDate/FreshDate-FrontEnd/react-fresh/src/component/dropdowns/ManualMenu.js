import React from 'react';
import Backdrop from './Backdrop';
import classes from '../dropdowns/modal.module.css';
import { Modal } from 'bootstrap';

const manualMenu = props => {
    return(
        <>
        <Backdrop show={props.show} clicked={props.manualMenuClosed}/>
        <div className={classes.ManualMenu} style={{
            transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity : props.show ? 1 : 0
        }}>
            {props.children}
        </div></>
    )
    
}
export default manualMenu;
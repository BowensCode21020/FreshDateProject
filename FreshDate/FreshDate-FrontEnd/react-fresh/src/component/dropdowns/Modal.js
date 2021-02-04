import { Modal } from 'bootstrap';
import React from 'react';
import Backdrop from './Backdrop';
import classes from '../dropdowns/modal.module.css';

const modal = props => {
    return (
        <>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal} style={{
            transform:props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity : props.show ? 1 : 0
        }}>
            {props.children}
        </div></>
    );
};

export default modal;
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../context/Context';

export default function ModalWrapper({ title, children, showActionButton }) {
    const { modal } = useContext(Context)
    const { show, setShow } = modal;
    // console.log(modal)

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body> {children} </Modal.Body>
                {
                    showActionButton ? <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary">OK</Button>
                    </Modal.Footer> : ''
                }
            </Modal>
        </>
    );
}


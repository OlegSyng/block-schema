import { ReactElement } from "react";
import classes from "./Modal.module.css";

type ModalProps = {
    open: boolean
    categoryButton: ReactElement
    serviceButton: ReactElement
}

function Modal({ open, categoryButton, serviceButton }: ModalProps) {
    if (!open) return null;

    return (
        <div className={classes['modal-container']}>
            <h4 className={classes['modal-title']}>What do you want to create?</h4>
            <div className={classes['modal-buttons']}>
                {categoryButton}
                {serviceButton}
            </div>
        </div>
    )
}

export default Modal;
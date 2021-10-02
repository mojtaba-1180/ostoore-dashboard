import React  from 'react'
import ReactDOM from 'react-dom'
import './modal.css'
const  Modal = props => {
    return ReactDOM.createPortal(
        <>
            <div className="modal modal-md" >
                {props.children}
            </div>
        </>
    ,document.getElementById('modals'))
}
export default Modal
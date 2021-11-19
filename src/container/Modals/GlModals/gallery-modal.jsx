import * as React from 'react';
import { createPortal } from 'react-dom';
import Gallery from '../../../pages/Gallery/gallery';

import './modal.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: '20px',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    backgroundColor: 'var(--main-bg)',
    boxShadow: 24,
    p: 4,
    zIndex: 9999,
    borderRadius: '20px'
};

export default function GalleryModal(props) {
    const [open, setOpen] = React.useState(props.modal);
    open && window.addEventListener('click', () => {
        setOpen(false)
    })
    return createPortal(
        <>
        {
            open ? (
                <div style={style} className="open">
                <Gallery />
            </div>
            ) :
            null
        }
        </>
        ,
        document.getElementById('modals_gallery')
    );
}
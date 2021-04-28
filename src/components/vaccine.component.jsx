import React, {useEffect, useState} from 'react';
import { Modal } from 'react-bootstrap';

const VaccineCenter = ({city, vaccine_centers}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
        <button 
            className="fab"
            onClick={handleShow}>
                Vaccine Center
        </button>
        <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={show} 
            onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{city} Vaccination</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    vaccine_centers.map(center=>{
                        return(
                            <div className="vac-center">
                            <span className="name">{center.name}</span>
                            { center.mobile ? <a href={`tel:${center.mobile}`} className="call">Call</a> : null }
                            <span className="address">{center.address}</span>
                        </div>
                        );
                    })
                }
            </Modal.Body>
        </Modal>
        </>
    )
}

export default VaccineCenter;

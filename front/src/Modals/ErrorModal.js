import { Button, Modal } from "react-bootstrap";

function ErrorModal({err= "", show=false, changeShow = () => {}}) {
    return (
        <div className="modal show">
            <Modal show={show} onHide={()=> {changeShow(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>{err}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>La requête a echoue pour la raison suivante : {err}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-warning" onClick={() => { changeShow(false) }}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ErrorModal;
import { Toast, ToastContainer } from "react-bootstrap";
import "./GenericToast.css"

function GenericToast ({type = "Succes", text = "Action realisee avec succes", show = false , setShow}) {

    const typeToVariant = {
        error: 'danger',
        success: 'success',
        warn: 'warning',
        black: 'dark',
        primary: 'primary'
    };

    return (
        <ToastContainer id="generic-toast" position="bottom-center" className="position-fixed">
            <Toast delay={5000} autohide={true} bg={typeToVariant[type]} show={show} onClose={()=> {setShow(false)}} >
                <Toast.Header>
                    <strong className="me-auto">{type[0]?.toUpperCase() + type?.substring(1)}</strong>
                </Toast.Header>
                <Toast.Body className={['danger', 'dark'].includes(typeToVariant[type]) && 'text-white'}>
                    {text}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default GenericToast;
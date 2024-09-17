import { Toast } from "react-bootstrap";
import "./GenericToast.css"

function GenericToast ({variant = "primary", type = "Succes", text = "Action realisee avec succes" }) {
    return (
        <div id="generic-toast">
            <Toast delay={5000} bg={variant}>
                <Toast.Header>
                    <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                    />
                    <strong className="me-auto">{type}</strong>
                </Toast.Header>
                <Toast.Body className={bg === 'Dark' && 'text-white'}>
                    {text}
                </Toast.Body>
            </Toast>
        </div>
    )
}

export default GenericToast;
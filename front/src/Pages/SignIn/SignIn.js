import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ErrorModal from "../../Modals/ErrorModal";
import { useState } from "react";

function SignIn () {

    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");

    const submitForm = (event) => {
        event.preventDefault();
        setErr("moman")
    };

    return (
        <Container fluid className="container-signin">
            <Row>
                <Col md={{span:3, offset:4}}>
                    <div className='Signin'>
                        <Form id="signin" onSubmit={submitForm}>
                            <Form.Group className="mb-3" controlId="user-nickname">
                                <Form.Label>Pseudo</Form.Label>
                                <Form.Control type="text" placeholder="Pseudo"></Form.Control>
                            </Form.Group>
                            <Button onClick={submitForm}>Creer son compte</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
            <ErrorModal show={show} changeShow={setShow} err={err}></ErrorModal>
        </Container>
    )
}

export default SignIn;
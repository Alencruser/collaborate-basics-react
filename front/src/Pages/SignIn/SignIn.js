import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ErrorModal from "../../Modals/ErrorModal";
import apiFetch from "../../Utils/api";

function SignIn () {

    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");
    
    const [queryParams] = useSearchParams();
    const [isRegister, setIsRegister] = useState();

    useEffect(()=> {
        setIsRegister(queryParams.get("type") === "register");
    }, [queryParams,setIsRegister]);

    const connectWithMyInfos = (connectInfos) => {

        localStorage.setItem("pseudo", connectInfos.pseudo);
        localStorage.setItem("role", connectInfos.role);
    }

    const submitForm = async (event) => {
        event.preventDefault();
        const action = isRegister ? "register" : "connect";
        const formData = new FormData(document.querySelector("#signin"))
        const body = formData.keys().reduce((acc,key) => {
            if(formData.get(key))acc[key] = formData.get(key);
            return acc;
        }, {});
        // Ajouter des verifs cote front (required devrait suffir ?)
            const response = await apiFetch(action, { method: "POST", body: JSON.stringify(body) })
            if(!response?.ok){
                setErr(response.data);
                setShow(true);
            } else {
                connectWithMyInfos(response.data)
                document.querySelector("#signin").reset();
            }


    };

    return (
        <Container fluid className="container-signin">
            <Row>
                <Col md={{span:3, offset:4}}>
                    <div className='Signin'>
                        <Form id="signin" onSubmit={submitForm}>
                            <Form.Group className="mb-3" controlId="user-nickname">
                                <Form.Label>Pseudo</Form.Label>
                                <Form.Control type="text" placeholder="Pseudo" name="user-nickname"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="user-mail" hidden={!isRegister}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" name="user-mail"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="user-pass">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control type="password" placeholder="Mot de passe" name="user-pass"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="user-birthdate" hidden={!isRegister}>
                                <Form.Label>Date de naissance</Form.Label>
                                <Form.Control type="date" placeholder="Date de naissance" name="user-birthdate"></Form.Control>
                            </Form.Group>
                            <Button onClick={submitForm}>{isRegister? `Creer son compte` : `Se connecter`}</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
            <ErrorModal show={show} changeShow={setShow} err={err} />
        </Container>
    )
}

export default SignIn;
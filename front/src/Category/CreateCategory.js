import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./CreateCategory.css";
import ErrorModal from "../Modals/ErrorModal";
import { useState } from "react";

function CreateCategory() {

    const [show, setShow] = useState(false);
    const [err, setErr] = useState("");

    const submitForm = async (event) => {
        event.preventDefault();
        const titleValue = document.querySelector("#category-label")?.value;
        const tryToCreate = await fetch(`http://localhost:8080/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ title:titleValue })
        });
        const data = await tryToCreate.json();
        if(data?.success) return true;
        else {
            setErr(data?.err);
            setShow(true);
        }
        document.querySelector("#create-category").reset();
    };

    return (

        <Container fluid className="container-create-category">
            <Row>
                <Col md={{span:3, offset:4}}>
                    <div className='CreateCategory'>
                        <Form id="create-category">
                            <Form.Group className="mb-3" controlId="category-label">
                                <Form.Label>Titre de la categorie</Form.Label>
                                <Form.Control type="text" placeholder="Titre de la categorie"></Form.Control>
                            </Form.Group>
                            <Button onClick={submitForm}>Faire la demande de creation de categorie</Button>
                        </Form>
                    </div>
                </Col>   
            </Row>
            <ErrorModal show={show} changeShow={setShow} err={err}></ErrorModal>
        </Container>
    );
}

export default CreateCategory;
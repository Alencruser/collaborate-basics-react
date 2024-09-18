import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import GenericToast from '../../GenericToast/GenericToast';
import apiFetch from "../../Utils/api";
import "./CreateCategory.css";

function CreateCategory() {

    const [showToast, setShowToast] = useState(false);
    const [textToast, setTextToast] = useState('');
    const [typeToast, setTypeToast] = useState('');

    const submitForm = async (event) => {
        event.preventDefault();
        const titleValue = document.querySelector("#category-label")?.value;
        const response = await apiFetch("category", { method: "POST", body: JSON.stringify({ title:titleValue })})
        if(!response?.ok) {
            setTextToast(response?.data);
            setTypeToast('error');
        } else {
            setTextToast('Action réalisée avec succès');
            setTypeToast('success')
        }
        setShowToast(true);
        document.querySelector("#create-category").reset();
    };

    return (

        <Container fluid className="container-create-category position-relative">
            <Row className="justify-content-center">
                <Col md={{span:3}}>
                    <div className='CreateCategory'>
                        <Form id="create-category" onSubmit={submitForm}>
                            <Form.Group className="mb-3" controlId="category-label">
                                <Form.Label>Titre de la categorie</Form.Label>
                                <Form.Control type="text" placeholder="Titre de la categorie"></Form.Control>
                            </Form.Group>
                            <Button onClick={submitForm}>Faire la demande de creation de categorie</Button>
                        </Form>
                    </div>
                </Col>   
            </Row>
            <GenericToast type={typeToast} text={textToast}  show={showToast} setShow={setShowToast} />
        </Container>
    );
}

export default CreateCategory;
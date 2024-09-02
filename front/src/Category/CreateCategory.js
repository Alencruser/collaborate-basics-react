import TextInput from "../Inputs/TextInput";
import "./CreateCategory.css";

function CreateCategory() {
    const submitForm = async (event) => {
        event.preventDefault();
        const titleValue = document.querySelector("[name='Titre']")?.value;
        const tryToCreate = await fetch(`http://localhost:8080/category`, {
            method: "POST",
            body: { title:titleValue }
        });
        const data = await tryToCreate.json();
        if(data?.success) return true;
        else {
            // message d'erreur
        }
        document.querySelector("#create-category").reset();
    };

    return (
        <div className='CreateCategory'>
            <form id="create-category">
                <TextInput name="Titre" placeholder="Titre de la categorie" />
                <button onClick={submitForm}>Faire la demande de creation de categorie</button>
            </form>
        </div>
    );
}

export default CreateCategory;
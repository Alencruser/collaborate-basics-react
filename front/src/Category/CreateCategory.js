import TextInput from "../Inputs/TextInput";
import "./CreateCategory.css";

function CreateCategory() {
    return (
        <div className='CreateCategory'>
            <TextInput name="Titre" placeholder="Titre de la categorie" />
        </div>
    );
}

export default CreateCategory;
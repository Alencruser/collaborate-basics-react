import "./TextInput.css";

function TextInput({placeholder, name, value = ""}) {
    return (
        <input type="text" name={name} placeholder={placeholder} defaultValue={value}/>
    )
}

export default TextInput
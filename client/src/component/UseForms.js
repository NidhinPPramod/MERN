import {useState} from "react";

const UseForms = (initialValue) => {
    const [state, setState] = useState(initialValue)

    return [
        state,
        (event) => {
            setState({...state, [event.target.name]: event.target.value})
        }]
}

export default UseForms

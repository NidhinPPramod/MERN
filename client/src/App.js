import './App.css';
import UseForms from "./component/UseForms"
import Axios from "axios";
import {useEffect, useState} from "react";

function App() {

    const [value, handleChange] = UseForms({name: "", age: ""})
    const [list, setList] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/read').then((response) => {
            setList(response.data)
        }).catch(() => {
            console.log("Fetching Failed!!")
        })

    }, [])


    const addFriend = () => {
        Axios.post('http://localhost:3001/addfriend', {name: value.name, age: value.age}).then((response) => {
            setList([...list, {_id: response.data._id, name: value.name, age: value.age}])
        }).catch((err) => {
            alert("Posting Failed!! ")
        })
    }

    const updateFriend = (id) => {
        const newAge = prompt("Enter New Age");
        Axios.put('http://localhost:3001/update', {newAge: newAge, id: id}).then(() => {
            setList(list.map((obj) => {
                return (obj._id === id ? {_id: id, name: obj.name, age: newAge} : obj)
            }))
        })
    }

    const deleteFriend = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
            setList(list.filter((obj) => {
                return obj._id !== id
            }))
        })
    }

    return (
        <div className="App">
            <div className="inputs">
                <input type="text" placeholder="Name" name="name" value={value.name} onChange={handleChange}/>
                <input type="number" placeholder="Age" name="age" value={value.age} onChange={handleChange}/>
                <button onClick={addFriend}>ADD FRIEND</button>
            </div>
            {list.map((value, key) => {
                return (
                    <div className="friend-bar" key={key}>
                        <div className="friend-list">
                            <div className="friend-details">
                                <p>Name:{value.name}</p>
                                <p>Age:{value.age}</p>
                            </div>
                            <div className="icons">
                                <i onClick={() => {
                                    updateFriend(value._id)
                                }} className="fa-solid fa-pen-to-square"/>
                                <i onClick={() => {
                                    deleteFriend(value._id)
                                }} className="fa-solid fa-trash"/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default App;

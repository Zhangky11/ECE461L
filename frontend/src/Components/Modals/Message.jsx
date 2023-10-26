import React, {useState, useContext} from 'react'
import { UserContext } from '../../App'
import './Modal.css'
import { useNavigate } from 'react-router-dom';

const Message = () => { 
    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
    <>
        {modal && (
            <h1>PlaceHolder</h1>
        )}
    </>
    );
}

export default Message
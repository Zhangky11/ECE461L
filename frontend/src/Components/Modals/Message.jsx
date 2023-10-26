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
            <div className='modal'>
                <div onClick={toggleModal} className="overlay"></div>
                <div className='content'>
                    <h2>Success!</h2>
                    <h3>Request was processed</h3>
                    <button className="close" onClick={toggleModal}>
                        OK
                    </button>
                </div>
            </div>
        )}
    </>
    );
}

export default Message
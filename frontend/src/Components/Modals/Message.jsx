import React, {useState, useContext} from 'react'
import { UserContext } from '../../App'
import './Modal.css'
import { useNavigate } from 'react-router-dom';

const Message = () => { 
    const[modal, setModal] = useState(true)

    const toggleModal = () => {
        setModal(false)
    }

    return (
    <>
        {modal && (
            <div className='modal'>
                <div className="overlay"></div>
                <div className='content'>
                    <div>
                        <h2>Success!</h2>
                        <h3>Request was processed</h3>
                        <p>Here is the success or failure Message regarding
                            what the return message was from the server
                        </p>
                    </div>
                    <div>
                        <button  onClick={toggleModal}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

export default Message
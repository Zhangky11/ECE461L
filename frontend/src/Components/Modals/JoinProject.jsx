import React, {useState, useContext} from 'react'
import { UserContext } from '../../App'
import './Modal.css'
import { useNavigate } from 'react-router-dom';

const JoinProject = () => {
    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
    <>
        {modal && (
            <div className='modal'>
                <div className='overlay'></div>
                <div className='content'>
                    <h2>Join Project</h2>
                    <div>
                        <h3>Project ID</h3>
                        <input></input>
                    </div>
                    <div className='buttons'>
                        <button onClick={toggleModal}>Back</button>
                        <button>Join</button>
                    </div>
                </div>
            </div>
        )}
    </>
    );

}

export default JoinProject
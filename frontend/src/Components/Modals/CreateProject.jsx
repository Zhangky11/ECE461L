import React, {useState, useContext} from 'react'
import { UserContext } from '../../App'
import './Modal.css'
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const[modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    //TODO: add ok button functionality
    //TODO: add CSS styling
    return (
    <>
        {modal && (
            <div className='modal'>
                <div className='overlay'></div>
                <div className='content'>
                    <h2>Create Project</h2>
                    <div>
                        <h3>Project ID</h3>
                        <input></input>
                    </div>
                    <div>
                        <h3>Project Name</h3>
                        <input></input>
                    </div>
                    <div>
                        <h3>Project Description</h3>
                        <input></input>
                    </div>
                    <div className='buttons'>
                        <button>OK</button>
                        <button onClick={toggleModal}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

export default CreateProject
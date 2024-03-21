//Version 3 - temporary
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Version 3
import React, { useState } from "react";
import { Navbar } from '../../components/Navbar';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getNGOs, deleteNGO } from '../../features/ngos/ngoSlice';
import '../../indexs.css';

function AdminLanding() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState("");

    const openModal = (button) => {
        setModalOpen(true);
        setSelectedButton(button);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleButtonClick = (action) => {
        // Handle the button click based on the selected action
        console.log(`Performing ${action} action for ${selectedButton}`);
        closeModal(); // Close the modal after performing the action
    };

    const getPopupTitle = () => {
        switch (selectedButton) {
            case "NGO":
                return "NGO Options";
            case "VOLUNTEER":
                return "Volunteer Options";
            case "COUNSELLOR":
                return "Counsellor Options";
            default:
                return "";
        }
    };
    const { ngos } = useSelector((state) => state.ngos);
    const adminId = useSelector(state => state.admins.admin?._id); // Using optional chaining to avoid errors
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getNGOs());
    }, [dispatch]);

    if (!adminId) {
        return <div>No admin found.</div>;
    }

    if (!ngos || ngos.length === 0) {
        return <div>Loading...</div>; // Display a loading indicator while waiting for data - Jannat 
    }

    const filteredNGO = ngos.filter(item => item.admin === adminId);

    const handleDelete = (ngoId) => {
        console.log(ngoId)
        dispatch(deleteNGO(ngoId))
          .then((response) => {
            console.log(response)
            toast.success('NGO Deleted Successfully');
            window.location.reload()
            navigate('/AdminLanding')
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }


    return (
        <div className="admin-landing-container">
            <Navbar />
            <h1 className="welcome-text">Welcome, Admin</h1>
            <div className="button-container">
                <button className="action-button" onClick={() => openModal("NGO")}>
                    NGO
                </button>
                <button className="action-button" onClick={() => handleButtonClick("View Case")}>
                    VIEW CASE
                </button>
                <button className="action-button" onClick={() => openModal("VOLUNTEER")}>
                    VOLUNTEER
                </button>
                <button className="action-button" onClick={() => openModal("COUNSELLOR")}>
                    COUNSELLOR
                </button>
            </div>

            {isModalOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className="popup-title">{selectedButton} Options</div>
                {selectedButton !== " VIEW CASE" && selectedButton !== "COUNSELLOR" && selectedButton!=="VOLUNTEER" && (
                    <>
                    {filteredNGO.length === 0 ? (
                        // When no NGOs are found for the admin
                        <>
                        {/* Version -3  */}
                           <Link to={'/AddNGO/'} className='btn btn-reverse btn-sm'>
                                            Add 
                            </Link>
                        </>
                    ) : (
                        // When NGOs are found for the admin
                        <>
                            <div>
                                {filteredNGO.map(ngo => (
                                    <div key={ngo._id}>
                                        <Link to={`/ViewNGO/${ngo._id}`} className='btn btn-reverse btn-sm'>
                                            View
                                        </Link>
                                        <button onClick={() => handleDelete(ngo._id)} className="btn btn-sm btn-danger mx-3">Delete</button>

                                        <Link to={`/UpdateNGO/${ngo._id}`} className='btn btn-reverse btn-sm'>
                                            Update  
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    </>)}
                    {selectedButton !== "VIEW CASE" && selectedButton !== "COUNSELLOR" && selectedButton!=="NGO" && (
                    <>
                        <>
                            <div>
                                <button className="btn btn-sm btn-danger mx-3">Delete Requirements</button>
                                <button onClick={() => handleButtonClick("add")}>Add Requirements</button>
                                <button onClick={() => handleButtonClick("view")}>View Requirements</button>
                                <button onClick={() => handleButtonClick("volunteer requests")}>Volunteer Requests</button>
                            </div>
        
                        </>
                  
                    </>)}
                    { selectedButton !== "VIEW CASE" && selectedButton !== "VOLUNTEER" && selectedButton!=="NGO"  && (
                    <>
                        <>
                            <div>
                                <button onClick={() => handleButtonClick("register")}>Register Counsellor</button>
                                <button onClick={() => handleButtonClick("view")}>View Counsellor</button>
                            </div>
        
                        </>
                  
                    </>)}
               
                </div>    
            </div>
                
            )}
        </div>
    );
}

export default AdminLanding;
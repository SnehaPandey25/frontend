import React from 'react';
import {  Link } from 'react-router-dom';
import CounsellorHeader from '../../components/Counsellor/CounsellorHeader';
import '../../indexs.css'; 
//Version 3.2
import { useSelector } from 'react-redux';

function CounsellorLanding() {

  //Version 3.2
  const { counsellor } = useSelector((state) => state.counsellors)

  return (
    <>
      <CounsellorHeader />
      <div className="counsellor-case-landing">
        <h1>Welcome, Counsellor</h1>
        <div className="options-container">
        <button className="option-button">Update Your Details</button>
        {/* Version 3.2 */}
        <div key={counsellor._id}>
        <Link to={`/ViewCounsellor/${counsellor._id}`} className='btn btn-reverse btn-sm'>
                View Your Details
        </Link>
        </div>

        <Link to='/CaseRegister' className='btn btn-reverse btn-sm'>
                Register Case
        </Link>
        <button className="option-button">Case Actions</button>
        </div>
    </div>
    </>
  );
}

export default CounsellorLanding;




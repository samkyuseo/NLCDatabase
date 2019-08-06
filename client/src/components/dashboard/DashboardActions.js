import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i class='fas fa-user-circle text-primary' /> Edit Current Research
        Topic
      </Link>
    </div>
  );
};

export default DashboardActions;

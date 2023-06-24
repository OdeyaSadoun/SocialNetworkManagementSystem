import React from 'react';
function Info() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div><div className="info">
      <div className="container">
        <h2 className="heading">User Information</h2>
        <p className="value">
          <span className="label">Name:</span> {user.name}
        </p>
        <p className="value">
          <span className="label">Username:</span> {user.username}
        </p>
        <p className="value">
          <span className="label">Email:</span> {user.email}
        </p>

        <p className="value">
          <span className="label">Phone:</span> {user.phone}
        </p>
        <p className="value">
          <span className="label">Website:</span> {user.website}
        </p>

      </div>

      </div>
    </div>
  );
}


export default Info;




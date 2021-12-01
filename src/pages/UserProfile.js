import React from "react";

// NOTE: This page should query another user based on the user ID
// get the current user's information

function UserProfile({ userInformation }) {
  return (
    <div className="PageWrapper">
      <h1>User Profile</h1>
      <p>EMAIL: {userInformation.email}</p>
      <p>PASSWORD: {userInformation.displayName}</p>
      <p>UID: {userInformation.uid}</p>
    </div>
  );
}

export default UserProfile;

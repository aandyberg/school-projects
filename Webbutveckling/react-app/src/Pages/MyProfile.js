import React from "react";

function MyProfile() {
  return (
    <div className="container">
      <div className="text-container-about">
        <h1 className="h1-about">MyProfile</h1>
        <p>Name: {window.myAppData.username}</p>
      </div>
    </div>
  );
}

export default MyProfile;

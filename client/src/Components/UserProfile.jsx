/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

function UserProfile({ BASE_URL, token, user, setUser }) {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Function to update the user
  const updateUser = async () => {
    if (!token) {
      // You may want to handle this differently based on your requirements
      console.error("User is not logged in.");
      return;
    }

    const userId = user.id; // Assuming you have user data available
    const updatedFields = {};

    if (newEmail) {
      updatedFields.email = newEmail;
    }

    if (newPassword) {
      updatedFields.password = newPassword;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        setUpdateSuccess(true);
        console.log("User updated successfully:", updatedUserData);
      } else {
        console.error("Failed to update user.");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setUser(result.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [BASE_URL, token]);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Display other user information here */}
          <div>
            <label>New Email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button onClick={updateUser}>Update User</button>

          {updateSuccess && <p>User updated successfully!</p>}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default UserProfile;
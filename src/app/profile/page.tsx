"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './ProfilePage.css'; // Import CSS file for styling

const page: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [editableFields, setEditableFields] = useState({
    height:0,
    weightInKg: 0,
    goal: '',
    activityLevel: ''
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUserData(data.data);
        setEditableFields({
          height:data.data.height,
          weightInKg: data.data.weightInKg,
          goal: data.data.goal,
          activityLevel: data.data.activityLevel
        });
      } else {
        toast.error(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('An error occurred while fetching user data');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editableFields)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        // Refresh profile data after successful update
        fetchProfileData();
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating profile');
    }
  };

  const handleFieldChange = (fieldName: string, value: string | number) => {
    setEditableFields(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const formatDOB = (dob: string) => {
    const date = new Date(dob);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`; // Format: dd-mm-yyyy
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-avatar">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile" />
        </div>
        <div className="profile-details">
          <h1>{userData.name}</h1>
          <p>Date of Birth: {formatDOB(userData.dob)}</p>
        </div>
      </div>
      <div className="profile-form">
        <label>Weight (kg):</label>
        <input
          type="number"
          value={editableFields.weightInKg}
          onChange={(e) => handleFieldChange('weightInKg', e.target.value)}
        />
        <label>Height (cm):</label>
        <input
        type="number"
        value={editableFields.height} // Update state and handle change event
        onChange={(e) => handleFieldChange('height', e.target.value)}
          />

        <label>Goal:</label>
        <select
          value={editableFields.goal}
          onChange={(e) => handleFieldChange('goal', e.target.value)}
        >
          <option value="weightLoss">Lose</option>
          <option value="weightMaintain">Maintain</option>
          <option value="weightGain">Gain</option>
        </select>
        <label>Activity Level:</label>
        <select
          value={editableFields.activityLevel}
          onChange={(e) => handleFieldChange('activityLevel', e.target.value)}
        >
          <option value="sedentary">Sedentary</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
          <option value="veryActive">Very Active</option>
        </select>
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    </div>
  );
};

export default page;

"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const page: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [editableFields, setEditableFields] = useState({
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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <p>Name: {userData.name}</p>
        <p>Date of Birth: {userData.dob}</p>
      </div>
      <div>
        <label>Weight (kg):</label>
        <input
          type="number"
          value={editableFields.weightInKg}
          onChange={(e) => handleFieldChange('weightInKg', e.target.value)}
        />
      </div>
      <div>
        <label>Goal:</label>
        <select
          value={editableFields.goal}
          onChange={(e) => handleFieldChange('goal', e.target.value)}
        >
          <option value="weightLoss">Lose</option>
          <option value="weightMaintain">Maintain</option>
          <option value="weightGain">Gain</option>
        </select>
      </div>
      <div>
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
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default page;

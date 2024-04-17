"use client"
import React from 'react'
import './bmiCalculator.css'

const page = () => {

  const [height, setHeight] = React.useState<number>(null);
  const [weight, setWeight] = React.useState<number>(null);
  const [bmi, setBmi] = React.useState<number | null>(null);
  const [message, setMessage] = React.useState<string>('');

  const calculateBmi = () => {
    if (height <= 0 || weight <= 0) {
      alert('Please enter valid height and weight');
      return;
    }
    const heightInMeters = height / 100; // converting height from cm to meters
    const bmiResult = weight / (heightInMeters * heightInMeters);
    setBmi(bmiResult);
    if (bmiResult > 25) {
      setMessage('You need to lose weight.');
    } else if (bmiResult < 18.5) {
      setMessage('You need to gain weight.');
    } else {
      setMessage('You are having healthy weight,Keep going!!');
    }
  };

  return (
    <div className="bmiCalculator">
  <h2>BMI Calculator</h2>
  <div className="inputs">
    <label htmlFor="height">Height (cm):</label>
    <input
      type="number"
      id="height"
      value={height}
      onChange={(e) => setHeight(Number(e.target.value))}
    />
    <label htmlFor="weight">Weight (kg):</label>
    <input
     type="number"
      id="weight"
      value={weight}
      onChange={(e) => setWeight(Number(e.target.value))}
    />
  </div>
  <div className='button'>
  <button onClick={calculateBmi}>Calculate BMI</button>
  </div>
  <div className="bmiResult">
    {bmi!== null && <p>Your BMI is: {bmi.toFixed(2)}</p>}
    {message && <p>{message}</p>}
  </div>
</div>
  );
};

export default page

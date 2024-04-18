import React from 'react';

//import './Home.css';

function Home() {

  const handleSignupButtonClick = () => {
    window.location.href = '/SignUp'; 
  };

  return (
    <div>
      <div className="content">
        <h2>Welcome to FitLife!</h2>
        <p>Start your fitness journey today.</p>
        <button className="signup-button" onClick={handleSignupButtonClick}>Sign Up Now</button>
      </div>
    </div>
  );
}

export default Home;

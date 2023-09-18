// Define global imports here
import React from 'react';

// Define relative imports here
import Title from './components/Title';
import DisplayContainer from './components/DisplayContainer';
import ReviewContainer from './components/ReviewContainer';

/**
 * This is the root component of your React App.
 * All classes and components will be imported into the project when included in this class.
 */
const App = () => {
  return (
    <div className="App">
      <Title teamName="your_team_name" ></Title>
      <ReviewContainer/>
      <DisplayContainer />
      
    </div>
  );
}

export default App;

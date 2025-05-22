import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State for the selected number type and the results from the API
  const [numberType, setNumberType] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the API call
  const fetchData = async (numberType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${numberType}`);
      setResponseData(response.data);
    } catch (err) {
      setError('Failed to fetch data from the server.');
    }
    setLoading(false);
  };

  // Function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (numberType) {
      fetchData(numberType);
    } else {
      setError('Please select a valid number type.');
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Number Type: </label>
          <select
            value={numberType}
            onChange={(e) => setNumberType(e.target.value)}
          >
            <option value="">--Choose an option--</option>
            <option value="p">Prime</option>
            <option value="f">Fibonacci</option>
            <option value="e">Even</option>
            <option value="r">Random</option>
          </select>
        </div>

        <button type="submit">Get Numbers</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h2>Results:</h2>
          <p><strong>Previous Window State:</strong> {JSON.stringify(responseData.windowPrevState)}</p>
          <p><strong>Current Window State:</strong> {JSON.stringify(responseData.windowCurrState)}</p>
          <p><strong>Numbers Received:</strong> {JSON.stringify(responseData.numbers)}</p>
          <p><strong>Average:</strong> {responseData.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;

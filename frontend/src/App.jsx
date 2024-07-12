import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthWrapper } from "../src/utils/AuthWrapper.jsx"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper />
      
      </BrowserRouter>      
    </div>
  );
}

export default App;
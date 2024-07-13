import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthWrapper } from "../src/utils/AuthWrapper.jsx"
import { ThemeProvider } from './components/component/theme-provider';

function App() {
  return (
    
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>      
      </ThemeProvider>
  );
}

export default App;
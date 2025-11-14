import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SuggestionProvider } from './Context/SuggestionContext.jsx'
import { LocationProvider } from './Context/LocationContext.jsx'
import { KeySuggestionProvider } from './Context/KeyBoardContext.jsx'
import "./input.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SuggestionProvider>
      <LocationProvider>
        <KeySuggestionProvider>
    <App />
    </KeySuggestionProvider>
    </LocationProvider>
    </SuggestionProvider>
    </BrowserRouter>
  </StrictMode>,
)

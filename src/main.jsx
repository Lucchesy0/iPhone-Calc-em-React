import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './componentes/App/App'
import Button from './componentes/Button/Button'
import utils from './componentes/utils/commafy'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

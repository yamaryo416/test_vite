import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './route/Router'
import { ChakraBaseProvider } from '@chakra-ui/react'
import theme from './theme/theme'

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraBaseProvider>
  )
}

export default App
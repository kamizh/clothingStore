import { useState } from 'react'
import Footer from './components/footer.jsx'
import Index from './routes/index.jsx'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/header.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
function App() {

  return (
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Index />
          <Footer/>
        
      </BrowserRouter>
    </AuthProvider>

    
  )
}

export default App

import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import './App.css'
import People from './components/People'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { ALL_PEOPLE } from './queries'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PEOPLE, {
    pollInterval: 2000
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const Notify=({errorMessage})=>{
    if(!errorMessage){
      return null; 
    }
    return (
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    )
  }

  return (
    <div>
      <Notify 
        errorMessage={errorMessage} 
      />
      <People
        people = { result.data.allPersons } 
      />
      <PersonForm
        setError={notify}
      />
      <PhoneForm
        notify={notify}
      />
    </div>
  )  
}

export default App;

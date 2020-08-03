import { useApolloClient, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import People from './components/People'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { ALL_PEOPLE } from './queries'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  // When called, useQuery makes the query it receives as a parameter. 
  // It returns an object with multiple fields. The field loading is true if the query has not received a response yet.
  // Apollo: useQuery returns an object from Apollo Client that contains loading, error, and data properties you can use to render your UI
  const result = useQuery(ALL_PEOPLE, {
    pollInterval: 2000
  })
  const [token, setToken] = useState(null)
  const client = useApolloClient()

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

  if (result.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div class='container'>
      <button onClick={logout}>Log Out</button>
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

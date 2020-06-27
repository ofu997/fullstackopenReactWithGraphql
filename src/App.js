import { useQuery } from '@apollo/client'
import React from 'react'
import './App.css'
import People from './components/People'
import PersonForm from './components/PersonForm'
import { ALL_PEOPLE } from './queries'

function App() {
  const result = useQuery(ALL_PEOPLE, {
    pollInterval: 2000
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <People
        people = { result.data.allPersons } 
      />
      <PersonForm
      />
    </div>
  )  
}

export default App;

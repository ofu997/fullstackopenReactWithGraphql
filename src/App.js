import { gql, useQuery } from '@apollo/client';
import React from 'react';
import './App.css';
import People from './components/People';

const ALL_PEOPLE = gql`
query {
  allPersons  {
    name
    phone
    id
  }
}
`

function App() {
  const result = useQuery(ALL_PEOPLE)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <People
        people = { result.data.allPersons } 
      />
    </div>
  )  
}

export default App;

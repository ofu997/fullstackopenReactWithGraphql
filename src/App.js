import { gql, useQuery } from '@apollo/client';
import React from 'react';
import './App.css';
import People from './components/People';

const ALL_PEOPLE = gql`
query {
  allPeople  {
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
        people = { result.data.allPeople } 
      />
    </div>
  )  

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

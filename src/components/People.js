import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FIND_PERSON } from '../queries';

const People = ({ people }) => {
  // does not immediately execute its associated query. Instead, it returns a function in its result tuple that you can call whenever you're ready to execute the query
  const [getPerson, result] = useLazyQuery(FIND_PERSON) 
  const [person, setPerson] = useState(null)

  // When a person's "show address" button is clicked, its event handler showPerson is executed, and makes a GraphQL query to fetch the persons details
  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result])

  if (person) {
    return(
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    )
  }  
  console.log(people);
  return (
    <div>
      <h2>People</h2>
      {people.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>
            show address
          </button>
        </div>  
      )}
    </div>
  )
}

export default People
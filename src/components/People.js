import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone 
      id
      address {
        street
        city
      }
    }
  }
`

const People = ({ people }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON) 
  const [person, setPerson] = useState(null)

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
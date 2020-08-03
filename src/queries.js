import { gql } from '@apollo/client'

// operation name (i.e. mutation createPerson)is arbitrary
// addPerson is defined in server repository
export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
  addPerson(
    name: $name,
    street: $street, 
    city: $city,
    phone: $phone,
  ) {
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

export const FIND_PERSON = gql`
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

export const ALL_PEOPLE = gql`
query {
  allPersons  {
    name
    phone
    id
  }
}
`

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
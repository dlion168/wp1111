import { gql } from '@apollo/client';
export const CREATE_MESSAGE_MUTATION = gql`
 mutation createMessage($name: String!, $to: String!, $body: String!) {
  createMessage(name: $name, to: $to, body: $body) {
      sender
      body
  }
 }
`
;
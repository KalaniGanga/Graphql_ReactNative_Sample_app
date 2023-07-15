import { gql } from "@apollo/client";

export const insertFavNumMutation = gql`
  mutation ($number: String!, $user_id: String!) {
    insert_fav_num(objects: {number: $number, user_id: $user_id}) {
      returning {
        id
        number,
        user_id,
        created_at
      }
    }
  }
`;

export const insertUserMutation = gql`
  mutation ($email: String!, $name: String!, $user_id: String!) {
    insert_users(objects: {email: $email, name:$name, user_id: $user_id}) {
      returning {
        id
        email,
        user_id,
        created_at
      }
    }
  }
`;

export const insertFavNumHistoryMutation = gql`
  mutation ($number: String!, $user_id: String!, $fav_num_id: Int!) {
    insert_fav_num_history(objects: {number: $number, user_id: $user_id, fav_num_id: $fav_num_id}) {
      returning {
        id
        number,
        user_id,
        fav_num_id,
        created_at
      }
    }
  }
`;

export const updateFavNumMutation = gql`
  mutation ($number: String!, $user_id: String!) {
    update_fav_num(_set: { number: $number }, where: { user_id: { _eq: $user_id } }) {
      affected_rows
      returning {
        id
        number
      }
    }
  }
`;


export const getUsers = gql`
query getUsers{
  users {
    id
    name
  }
}
`;

export const getFavNumber = gql`
query ($user_id: String!){
  fav_num(where: {user_id: {_eq: $user_id}}) {
    id,
    number
  }
}
`;


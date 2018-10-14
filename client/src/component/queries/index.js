import {gql}from 'apollo-boost';

export const GET_ALL_RECIPIES =gql`
query{
    getAllRecipes{
      _id
        name
      imageUrl
        description
        instructions
        category
        likes
        createdDate
        username
    }
}

`
export const GET_RECIPE =gql`
query($_id:ID!){
  getRecipe(_id:$_id){
    name
    imageUrl
  category
  description
  likes
  instructions
  createdDate
  username
  _id
  }
}

`
export const SEARCH_RECIPES =gql`
query($searchTerm:String){
  searchRecipes(searchTerm:$searchTerm){
    name
    imageUrl
  category
  description
  likes
  instructions
  createdDate
  username
  _id
  }
}

`

export const ADD_RECIPE =gql`
mutation($name:String!,
        $description:String!,
        $imageUrl: String!
        $category:String!,
        $instructions:String!,
        $username:String){
          addRecipe(name:$name,
        description:$description,
        imageUrl: $imageUrl
        category:$category,
        instructions:$instructions,
        username:$username){
          _id
        name
        imageUrl
        description
        instructions
        category
        likes
        createdDate
        username
    }
}
`
export const GET_USER_RECIPES = gql`
 
 query($username:String!){
  getUserRecipes(username:$username){
    name
    imageUrl
  likes
  category
  _id
  }
}
 
`
export const GET_CURRENT_USER = gql`
 
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites{
        _id
        name
      }
    }
  }
 
`
export const DELETE_USER_RECIPE = gql`
  mutation($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`;

export const LIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    likeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;
export const UNLIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }

`;
export const UPDATE_USER_RECIPE = gql`
  mutation(
    $_id: ID!
    $name: String!
    $imageUrl: String!
    $description: String!
    $category: String!
  ) {
    updateUserRecipe(
      _id: $_id
      name: $name
      imageUrl: $imageUrl
      description: $description
      category: $category
    ) {
      _id
      name
      likes
      category
      imageUrl
      description
    }
  }
`;
export const SIGNUP_USER =gql`
mutation($username:String!,$email:String!,$password:String!){
    signupUser(username:$username,email:$email,password:$password){
      token
    }
}

`
export const SIGNIN_USER =gql`
mutation($username:String!,$password: String!) {
  signinUser(username: $username, password: $password) {
    token
  }
}
`

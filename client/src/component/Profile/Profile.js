import React from 'react'
import withAuth from '../withAuth';
import UserInfo from './UserInfo'
import UserRecipe from './UserRecipes'
const UserProfile = ({session}) => {
    return(<div className="text-center">
    <div className="row ">
        <UserInfo  session={session} />
       <UserRecipe  username={session.getCurrentUser.username}  />
        </div>
        
        </div>
  );
}

export default withAuth(session=>session && session.getCurrentUser)(UserProfile)
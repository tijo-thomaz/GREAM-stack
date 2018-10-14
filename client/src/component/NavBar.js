import React from 'react'

import MainNav from './MainNav'
const UnauthLink=[
    {
        path:'/',
        label:'Home'
    },
    {
        path:'/search',
        label:'Search'
    },
    {
        path:'/signin',
        label:'Sign In'
    },
    {
        path:'/signup',
        label:'Sign Up'
    },
]
const AuthLink=[
    {
        path:'/',
        label:'Home'
    },
    {
        path:'/search',
        label:'Search'
    },
    {
        path:'/recipe/add',
        label:'Add Recipe'
    }
    
]
const NavBar = ({session}) => {
    return(
       <div>
       {
           session&&session.getCurrentUser?<MainNav AuthLink={AuthLink} sessionData={session} />:
           <MainNav UnauthLink={UnauthLink} />
       }
       </div>
   
     
    
    )
}


export default NavBar
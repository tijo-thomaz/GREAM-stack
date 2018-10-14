import React from 'react';
import {withRouter} from 'react-router-dom';
import{Query} from 'react-apollo';
import {GET_RECIPE} from '../queries'
import RecipeDetails from './RecipeDetails'
import Spinner from "../Spinner";
 const RecipePage = ({match}) => {
     const {_id}=match.params;
    return(
        <Query query={GET_RECIPE} variables={{_id}}>
        {(data,loading,error)=>{
            if(loading)return<div><Spinner/></div>
            if(error)return<div>error...</div>
          if(!data){
            return(
                <div>....</div>
            ) 
          }else{
            return(
                <div className="profile row"><RecipeDetails _id={_id} details={data.data?data.data:''} /></div>
            )
          }
            
        }}
        </Query>
    )
}

export default withRouter(RecipePage)
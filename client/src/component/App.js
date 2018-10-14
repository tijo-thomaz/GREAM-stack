import React,{Component} from 'react';
import {Query} from 'react-apollo';
import './App.css';
import Spinner from "./Spinner";
import RecipeItem from './Recipe/RecipeItem'
import {GET_ALL_RECIPIES} from './queries'


class App extends Component {

  render(){  return(<div className="App">
  <h1 className="main-title">
          Find Recipes You <strong><i className="icon-heart5"></i></strong>
        </h1>
          <Query query={GET_ALL_RECIPIES}>
                    {
                    ({data,loading,error})=>{
                      if(loading)return<div><Spinner /></div>
                      if(error)return<div>error...</div>
     
                      return(<div>{
                        data.getAllRecipes.map(recipe=><RecipeItem key={recipe._id} {...recipe}  />
                          )
                        
                      }</div>)
                    }
                    }
          </Query>

    
  </div>)
}
}
export default App;
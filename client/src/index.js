import React,{Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router ,Route,Switch,Redirect} from 'react-router-dom'
import App from './component/App';
import SignIn from './component/Auth/Signin';
import SignUp from './component/Auth/Signup';
import Search from './component/Recipe/Search'
import AddRecipe from './component/Recipe/AddRecipe'
import RecipePage from './component/Recipe/RecipePage'
import Profile from './component/Profile/Profile'
import NavBar from './component/NavBar'
import withSession from './component/withSession'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
    // prod 
    //uri:'https://recipe-blog-app.herokuapp.com/graphql',
    // dev
    uri:'http://localhost:8888/graphql',
    fetchOptions:{
        credentials:'include'
    },
    request:operation=>{
        const token =localStorage.getItem('token');
        operation.setContext({
            headers:{
                authorization:token
            }
        })
    },
    onError:({networkError})=>{
        if(networkError){
            console.error(networkError);
            if(networkError.statusCode===401){
                localStorage.removeItem('token');
            }
        }
    }
});
const Root =(props)=>(
    <Router>
    <Fragment>
    <NavBar session={props.session}/>
    <div className="page-container">

    
    <div className="page-content">
  
  
        <div className="content-wrapper">
  
       
            <div className="content pb-20">
  
    <Switch>
    <Route exact path='/' component={App} />
    <Route  path='/search' component={Search} />
    <Route  path='/recipe/add' render={()=><AddRecipe  session={props.session}/>} />
    <Route  path='/recipes/:_id' component={RecipePage} />
    <Route  path='/profile' render={()=><Profile session={props.session}/>} />
    <Route path='/signup' render={()=><SignUp refetch={props.refetch} />} />
    <Route path='/signin' render={()=><SignIn refetch={props.refetch} />} />
    <Redirect to="/" />
    </Switch>
    </div>
    </div>
    </div>
    </div>

    </Fragment>
    
    
    
    </Router>
);

const RootWithSession = withSession(Root);


ReactDOM.render(<ApolloProvider client={client}>
    <RootWithSession />
    </ApolloProvider> , document.getElementById('root'));

import React from 'react'
import {ApolloConsumer} from 'react-apollo'
import {withRouter} from 'react-router-dom'
const handelSignOut=(client,history)=>{
    localStorage.removeItem('token');
    client.resetStore();
    history.push('/');
}

const SignOut = ({history}) => {
    return(
        <ApolloConsumer>
        {
            client=>{
              
                return(
                    <a onClick={()=>{
                        handelSignOut(client,history)
                    }}><i className="icon-switch2"></i> Logout</a>
                )
            }
        }
       
        </ApolloConsumer>
            )
}

export default withRouter(SignOut)
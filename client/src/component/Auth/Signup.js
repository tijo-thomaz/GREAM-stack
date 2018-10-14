import React, { Component } from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import {Mutation} from 'react-apollo';
import {SIGNUP_USER} from '../queries'
import ErrorMessage from '../ErrorMessage';
const initialState={
    username:"",
    email:"",
    password:"",
    passwordConfirmation:""
}
class SignUp extends Component {
    constructor(props){
        super(props)
        this.state={...initialState}
        
    }
    componentDidMount() {
        $("body").addClass("login-container login-cover");
    }

    clearState=()=>{
        this.setState({...initialState});
    }
    validateForm=()=>{
        const {username,email,password,passwordConfirmation}=this.state
        const isInValid = !username||!email||!password||password!==passwordConfirmation
        return isInValid
    }
    handelChange=(e)=>{
        const {name,value}=e.target

        this.setState({
            [name]:value
        })
    }
    handelSubmit=(event,signupUser)=>{
        event.preventDefault();
        signupUser().then(async ({data:{signupUser}})=>{
            localStorage.setItem('token',signupUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/')
        })
    }
    render () {
        const {username,email,password,passwordConfirmation}=this.state
        return (
          
    
                    <Mutation mutation={SIGNUP_USER} variables={{username,email,password}}>{(signupUser,{data,loading,error})=>{
                        return(
                            <form onSubmit={event=>this.handelSubmit(event,signupUser)}>
                            <div className="panel panel-body login-form">
                                <div className="text-center">
                                    <div className="icon-object border-success text-success"><i className="icon-plus3"></i></div>
                                    <h5 className="content-group">Create account <small className="display-block">All fields are required</small></h5>
                                </div>
    
                                <div className="content-divider text-muted form-group"><span>Your credentials</span></div>
    
                                <div className="form-group has-feedback has-feedback-left">
                                    <input type="text" className="form-control" name="username" placeholder="Username" onChange={this.handelChange} value={username} />
                                    <div className="form-control-feedback">
                                        <i className="icon-user-check text-muted"></i>
                                    </div>
                                   </div>
    
                                
    
                                <div className="content-divider text-muted form-group"><span>Your privacy</span></div>
    
                                <div className="form-group has-feedback has-feedback-left">
                                    <input type="text" className="form-control" name="email" placeholder="Your email"  onChange={this.handelChange} value={email}/>
                                    <div className="form-control-feedback">
                                        <i className="icon-mention text-muted"></i>
                                    </div>
                                </div>
                                <div className="form-group has-feedback has-feedback-left">
                                        <input type="password" className="form-control" name="password" placeholder="Create password" onChange={this.handelChange} value={password} />
                                        <div className="form-control-feedback">
                                            <i className="icon-user-lock text-muted"></i>
                                        </div>
                                </div>
                                <div className="form-group has-feedback has-feedback-left">
                                <input type="password" className="form-control" name="passwordConfirmation" placeholder="Confirm password" onChange={this.handelChange} value={passwordConfirmation}/>
                                <div className="form-control-feedback">
                                    <i className="icon-user-lock text-muted"></i>
                                </div>
                                 </div>

                                <button type="submit"
                                 className="btn bg-pink-400 btn-block btn-lg" 
                                 disabled={loading||this.validateForm()}
                                 
                                 >Register <i className="icon-circle-right2 position-right"></i></button>
                                {error   &&	<ErrorMessage error={error}/>	}
                                </div>
                        </form>
                        
                        );
                    }}
                        </Mutation>

        )
    }
}

export default withRouter(SignUp);
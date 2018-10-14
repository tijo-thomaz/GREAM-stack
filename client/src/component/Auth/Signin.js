import React, { Component } from 'react'
import $ from 'jquery'
import {withRouter} from 'react-router-dom';
import {Mutation} from 'react-apollo';
import {SIGNIN_USER} from '../queries'
import ErrorMessage from '../ErrorMessage';
const initialState={
    username:"",
    password:""
}
class SignIn extends Component {
    constructor(props){
        super(props)
        this.state={...initialState};
    }
    componentDidMount(){
        $("body").addClass("login-container login-cover");
       
    }
    clearState=()=>{
        this.setState({...initialState});
    }
    handelChange=(e)=>{
        const {name,value}=e.target
        this.setState({
            [name]:value
        })
    }
    handelSubmit=(event,signinUser)=>{
        event.preventDefault();
        signinUser().then(async ({data:{signinUser}})=>{
            localStorage.setItem('token',signinUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/')
        })
    }
    validateForm=()=>{
        const {username,password}=this.state
        const isInValid = !username||!password
        return isInValid
    }
    render () {
        const {username,password}=this.state
        return (
       
	

            <Mutation mutation={SIGNIN_USER} variables={{username,password}}>{(signinUser,{data,loading,error})=>{
                return(

                <form onSubmit={event=>this.handelSubmit(event,signinUser)} >
                    <div className="panel panel-body login-form">
                        <div className="text-center">
                            <div className="icon-object border-slate-300 text-slate-300"><i className="icon-reading"></i></div>
                            <h5 className="content-group">Login to your account <small className="display-block">Your credentials</small></h5>
                        </div>

                        <div className="form-group has-feedback has-feedback-left">
                            <input type="text" className="form-control" placeholder="Username" name="username" required="required" onChange={this.handelChange} value={username} />
                            <div className="form-control-feedback">
                                <i className="icon-user text-muted"></i>
                            </div>
                        </div>

                        <div className="form-group has-feedback has-feedback-left">
                            <input type="password" className="form-control" placeholder="Password" name="password" required="required" onChange={this.handelChange} value={password} />
                            <div className="form-control-feedback">
                                <i className="icon-lock2 text-muted"></i>
                            </div>
                        </div>

                        <div className="form-group login-options">
                            <div className="row">
                                <div className="col-sm-6 text-right">
                                    <a href="login_password_recover.html">Forgot password?</a>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn bg-pink-400 btn-block"
                            disabled={loading||this.validateForm()}
                            >Login <i className="icon-arrow-right14 position-right"></i></button>
                            {error   &&	<ErrorMessage error={error}/>	}
                        </div>

                       {/* <div className="content-divider text-muted form-group"><span>Don't have an account?</span></div>
                        <span onClick={()=>{
                            this.props.history.push('/signup')
                        }} className="btn btn-default btn-block content-group">Sign up</span> */}
                        <span className="help-block text-center no-margin">By continuing, you're confirming that you've read our <a>Terms &amp; Conditions</a> and <a >Cookie Policy</a></span>
                    </div>
                </form>
              
                );
            }}
                </Mutation>
          

      


        )
    }
}

export default withRouter(SignIn)
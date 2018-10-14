import React,{Fragment} from 'react'
import {NavLink }from 'react-router-dom';
import SignOut from './Auth/Signout' 
function greeting(){
    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
        return greet
}
const Nav = (props) => {
    return(<Fragment>
        <div className="navbar navbar-inverse">
		<div className="navbar-header">
       {props.sessionData? <p className="navbar-text">{greeting()}{'  '}<strong className="text-capitalize">{props.sessionData.getCurrentUser.username}</strong></p>:''}
		</div>

		<div className="navbar-collapse collapse" >
        
        
            <ul className="nav navbar-nav navbar-right">
           
            {props.AuthLink?props.AuthLink.map((element,key)=>{
                if(element.path==='/'){
                    return (<li key={key}>
                        <NavLink to={element.path} exact>{element.label}</NavLink>
                        </li>) 
                }else{
                return (<li key={key}>
                    <NavLink to={element.path}>{element.label}</NavLink>
                    </li>)
            }}):null
        
            }
            {props.UnauthLink?props.UnauthLink.map((element,key)=>{
                if(element.path==='/'){
                    return (<li key={key}>
                        <NavLink to={element.path} exact>{element.label}</NavLink>
                        </li>) 
                }else{
                return (<li key={key}>
                    <NavLink to={element.path}>{element.label}</NavLink>
                    </li>)
            }}):null}
           
            {props.sessionData?<li className="dropdown dropdown-user">
            
            <a className="dropdown-toggle" data-toggle="dropdown">
            <span className="btn bg-primary-400 btn-rounded btn-icon btn-xs legitRipple">
            <span className="letter-icon">{props.sessionData.getCurrentUser.username.charAt(0)}</span>
                </span>
                <span className="text-capitalize p4" style={{padding:'6px'}} >{props.sessionData.getCurrentUser.username}</span>
                <i className="caret"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-right">
                <li> <NavLink to='/profile'><i className="icon-user-plus"></i>My profile</NavLink></li>
                <li><SignOut /></li>
            </ul>
        </li>:null

            }
				
			</ul>
		</div>
    </div>
    </Fragment>
    )
}

export default Nav
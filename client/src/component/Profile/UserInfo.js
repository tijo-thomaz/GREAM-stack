import React from 'react'

import {Link} from 'react-router-dom'

 const UserInfo = ({session}) => {
    return(
        <div className="sidebar-detached col-md-4 " style={{width: '20%'}}>
            <div className="sidebar sidebar-default sidebar-separate">
            <div className="sidebar-content">
                        


     
     <div className="sidebar-category">
									

									
                                    <div className="content-group sidebar thumbnail">
                         <div className="panel-body bg-indigo-400 border-radius-top text-center thumbnail" style={{backgroundsImage: 'url(http://demo.interface.club/limitless/assets/images/bg.png)', backgroundSize: 'contain'}}>
                            <div className="content-group-sm">
                                <h6 className="text-semibold no-margin-bottom text-capitalize">
                                    {session.getCurrentUser.username?session.getCurrentUser.username:''}
                                </h6>
                    
                                <span className="display-block">{session.getCurrentUser.email?session.getCurrentUser.email:''}</span>
                            </div>
                                <ul className="list-inline list-inline-condensed no-margin-bottom">
                                <h6 className="text-semibold no-margin-bottom text-capitalize">
                           {session.getCurrentUser.joinDate?` Date Joined : ${session.getCurrentUser.joinDate}`:''}
                            </h6>
                                </ul>
                      </div>
    
                      <div className="panel no-border-top no-border-radius-top">
                                <h3 className="text-semibold no-margin-bottom text-capitalize">
                           
                            </h3>
                            
                      </div>
        
                     </div>
    			</div>    
            
            




                       <div className="sidebar-category">
									<div className="category-title">
										<span> {session.getCurrentUser.username?session.getCurrentUser.username+' favorites':''}</span>
										
									</div>

									<div className="category-content">
										<ul className="media-list">
										{
                                            session.getCurrentUser.favorites.map((el,key)=>{
                                                return(
                                                    <li className="media" key={key}>
												<div className="media-left">
													<span className="btn border-primary text-primary btn-flat btn-rounded btn-icon btn-sm legitRipple">{el.name.charAt(0)}</span>
												</div>

												<div className="media-body">
													<h6><Link to={`/recipes/${el._id}`}>{el.name}</Link></h6>
												
												</div>
											</li>
                                                )
                                            })
                                        }
                                        {!session.getCurrentUser.favorites.length&& <p>You have no favorites available make some..</p>}
									</ul>
									</div>
								</div>    
            
            

            </div>
                    
            
                   
            </div>
        
        </div>
    )
}

export default UserInfo
import React from 'react'
import {Link} from 'react-router-dom'


const RecipeItem = ({_id,imageUrl,name,category,on}) => {
    return(
      
      <div
    
       className="col-lg-3 col-md-6 fadein py-2" style={{ display: 'flex',flexWrap:'wrap'}}>
       
							<div className="thumbnail no-padding ">
								<div className="thumb">
									<img src={imageUrl} alt="" />
									
								</div>
							
						    	<div className="caption text-center"   >
						    		<h6 className="text-semibold no-margin"><a  className="btn bg-primary-400 btn-rounded btn-icon btn-xs legitRipple" >
                                            <span className="letter-icon" >{name.charAt(0)}</span>
                                        </a>{'   '}{name} <small className="display-block">{category}</small></h6>
					    			<ul className="icons-list mt-15">
                                    <li><Link to={`/recipes/${_id}`}><i className=" icon-arrow-right6"></i></Link></li>
			                    	</ul>
						    	</div>
					    	</div>
						</div>
       
    )
}

export default RecipeItem

 
import React from 'react';
import moment from 'moment'
import LikeRecipe from "./LikeRecipe";
const RecipeDetails = (props) => {
	var sectionStyle = {
		width: "100%",
		backgroundRepeat: "round",
		height: "400px",
		backgroundImage:`url(${props.details.getRecipe?props.details.getRecipe.imageUrl:""}) ` 
	}
	  
    return(
        <div className="panel panel-white col-md-8 ">
						<div className="panel-heading">
							<h6 className="panel-title">Recipe Details<a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
                            <div className="heading-elements">
							<button type="button" className="btn btn-default btn-xs heading-btn legitRipple"><i className="icon-printer position-left"></i> Print</button>
		                	</div>
						</div>

						<div className="panel-body no-padding-bottom ">
							<div className="row">
							<div className="col-sm-12 content-group">
                                <div className="content-group"  >
											<div style={sectionStyle}></div>
							  </div>
                             	</div>
								<div className="col-sm-6 content-group">
                                <div className="content-group">
                                <h6>Name</h6>
                                <p className="text-muted display-block">{props.details.getRecipe?props.details.getRecipe.name:null} 	</p>
                              
                                <h6>Category</h6>
                                <p className="text-muted">{props.details.getRecipe?props.details.getRecipe.category:null}</p>
                                </div>
                             	</div>

								<div className="col-sm-6 content-group">
									<div className="invoice-details">
										<ul className="list-condensed list-unstyled">
											<li>Date: <span className="text-semibold">{moment(props.details.getRecipe?props.details.getRecipe.createdDate:null).format("MMM Do YYYY")}</span></li>
										</ul>
									</div>
								</div>
								
							</div>
							
						</div>

						

						<div className="panel-body">
							<div className="row invoice-payment">
								<div className="col-sm-7">
									<div className="content-group">
										<h6>Description</h6>
										

										<p className="text-muted">{props.details.getRecipe?props.details.getRecipe.description:null}</p>
									</div>
								</div>
							</div>

							<h6>Instructions</h6>
							<p className="text-muted" dangerouslySetInnerHTML={{__html:props.details.getRecipe?props.details.getRecipe.instructions:null}}></p>
							<div className="form-group">
											<label className="control-label no-margin text-semibold">Created By:</label>
											<div className="display-block"><strong >{props.details.getRecipe?props.details.getRecipe.username:null}</strong></div>
										</div>
						
					
						</div>
						<div className="panel-body">
							<div className="row">
								<LikeRecipe _id={props._id}/>
							</div></div>
					</div>
    )
}

export default RecipeDetails
import React,{Component} from 'react'
import {ApolloConsumer }from 'react-apollo'
import RecipeItem from '../Recipe/RecipeItem'
import { SEARCH_RECIPES } from '../queries';
class Search extends Component{
   
	state={
		searchResults:[]
	}

	handelChange=({searchRecipes})=>{
		this.setState({
			searchResults:searchRecipes
		})
	}

	render(){
		const {searchResults}=this.state
    return(
		<ApolloConsumer 
		>
		{
			client=>{
				
				return(
					<div>
					<div className="row profile">
							<div className="col-md-8 panel panel-flat">
								<div className="panel-heading">
									<h5 className="panel-title">Recipe Search<a className="heading-elements-toggle"><i className="icon-more"></i></a></h5>
									
								</div>

								<div className="panel-body">
									<form action="#" className="main-search">
										<div className="input-group content-group col-lg-12">
											<div className="has-feedback has-feedback-left">
												<input type="text" className="form-control input-xlg" placeholder="Search for recipes"
												onChange={async e=>{
													e.persist();
													const {data}=await client.query({
														query:SEARCH_RECIPES,
														variables:{searchTerm:e.target.value}
													});
													this.handelChange(data)
												}}
												/>
												<div className="form-control-feedback">
													<i className="icon-search4 text-muted text-size-base"></i>
												</div>
											</div>

											{/* <div className="input-group-btn">
												<button type="submit" className="btn btn-primary btn-xlg legitRipple">Search</button>
											</div> */}
										</div>
									</form>
								</div>
							</div>
										
					</div>
					<div className="row ">
					{
					searchResults.map(recipe=><RecipeItem key={recipe._id} {...recipe} />
						  ) 
						
					  }	
					</div>
					</div>
				)
			}
		}

	  
					</ApolloConsumer>
	
					)
}
}
export default Search
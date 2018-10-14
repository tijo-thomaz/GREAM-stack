import React from "react";
import { Link } from "react-router-dom";

import { Query, Mutation } from "react-apollo";
import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_ALL_RECIPIES,
  GET_CURRENT_USER,
  UPDATE_USER_RECIPE
 
} from "../queries";

import Spinner from "../Spinner";
const recipeCategory=[
  {
      label:'Breakfast',
      value:'breakfast'
  },{
      label:'Brunch',
      value:'brunch'
  },{
      label:'Lunch',
      value:'lunch'
  },{
      label:'Dinner',
      value:'dinner'
  },{
      label:'Snacks',
      value:'snacks'
  },{
      label:'Rice',
      value:'rice'
  },{
      label:'Noodles',
      value:'noodles'
  },{
      label:'Vegetarian',
      value:'vegitarian'
  },{
      label:'Non-Vegitarian',
      value:'nonveg'
  },{
      label:'Dessert Recipes',
      value:'dessert'
  }
]


class UserRecipes extends React.Component {
  state = {
    _id: "",
    name: "",
    imageUrl: "",
    category: "",
    description: "",
    modal: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDelete = deleteUserRecipe => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmDelete) {
      deleteUserRecipe().then(({ data }) => {
        // console.log(data);
      });
    }
  };

  handleSubmit = (event, updateUserRecipe) => {
    event.preventDefault();
    updateUserRecipe().then(({ data }) => {
      //console.log(data);
      this.closeModal();
    });
  };

  loadRecipe = recipe => {
    this.setState({ ...recipe, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state;
    return (
      <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <div>Error</div>;
          // console.log(data);
          return (
            <div>
              { modal && (
                <EditRecipeModal
                  handleSubmit={this.handleSubmit}
                  recipe={this.state}
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                />
              ) }
            
            <div className="col-md-8 container-detached">
						<div className="content-detached">

							
							<div className="tab-content"  >
								<div className="tab-pane fade in active">
    
                                     <div className="panel panel-flat">
										<div className="panel-heading">
											<h6 className="panel-title">Your Recipes
                                            </h6>
                                           
										</div>
    <hr style={{ margin:' 0px'}} />
										<div className="panel-body">
                            
              {!data.getUserRecipes.length && (
                <p>
                  <strong>You have not added any recipes yet</strong>
                </p>
              )}
              {data.getUserRecipes.map(recipe => (
                                            <div className="col-lg-3 col-md-6" key={recipe._id} style={{border:'1px solid #ddd'}}>
                                           
                                                    <div className="bg-custom-400 border-radius-top thumbnail">
                                                    <div className="thumb thumb-rounded thumb-slide">
                                                    <a  className="btn bg-primary-400 btn-rounded btn-icon btn-xs legitRipple">
                                                    <span className="letter-icon">{recipe.name.charAt(0)}</span>
                                                </a>
                                                    </div>
                                                        <div className="caption text-center">
                                                        <h6 className="text-semibold no-margin">{recipe.name} <small className="display-block">{recipe.likes}</small></h6>
                                                        <ul className="icons-list mt-15">
                                                        <li><Link to={`/recipes/${recipe._id}`}><i className=" icon-arrow-right6"></i></Link></li>
                                                    </ul>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="heading-elements" style={{top: '7%',right: '8px'}}>
                                                        <ul className="icons-list">
                                                            
                                                            <li>
                                                            <Mutation
                    mutation={DELETE_USER_RECIPE}
                    variables={{ _id: recipe._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_RECIPIES },
                      { query: GET_CURRENT_USER }
                    ]}
                    update={(cache, { data: { deleteUserRecipe } }) => {
                      const { getUserRecipes } = cache.readQuery({
                        query: GET_USER_RECIPES,
                        variables: { username }
                      });

                      cache.writeQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                        data: {
                          getUserRecipes: getUserRecipes.filter(
                            recipe => recipe._id !== deleteUserRecipe._id
                          )
                        }
                      });
                    }}
                  >
                    {(deleteUserRecipe, attrs = {}) => (
                      <div>
                        <span
                         style={{cursor:'pointer'}}
                          onClick={() => {
                            this.setState({
                              modal:true
                            })
                          }}
                        >
                          <i className="icon-pencil"></i>
                        </span>
                        <p
                          className="delete-button"
                          onClick={() => this.handleDelete(deleteUserRecipe)}
                        >
                         
                        </p>
                   <span onClick={()=>{this.handleDelete(deleteUserRecipe)}} style={{cursor:'pointer'}}> {attrs.loading ? "deleting..." : <i className="icon-trash"></i>}</span>
                      </div>
                    )}
                  </Mutation>
                                                            
                                                            
                                                      
                                                            
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                         
                                        ))}
              </div>
									</div>
                        
            </div>
            </div>
            </div>
            </div>
     
            
           
              </div>   
          
          );
        }}
      </Query>
    );
  }
}

const EditRecipeModal = ({
  handleSubmit,
  recipe,
  handleChange,
  closeModal
}) => (
  <Mutation
    mutation={UPDATE_USER_RECIPE}
    variables={{
      _id: recipe._id,
      name: recipe.name,
      imageUrl: recipe.imageUrl,
      category: recipe.category,
      description: recipe.description
    }}
  >
    {updateUserRecipe => (
      <div className="modal modal-open">
        <div className="modal-inner">
          <div className="modal-content">
            <form
              onSubmit={event => handleSubmit(event, updateUserRecipe)}
              className="modal-content-inner"
            >
              <h4>Edit Recipe</h4>

              <label htmlFor="name">Recipe Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={recipe.name}
              />
              <label htmlFor="imageUrl">Recipe Image</label>
              <input
                type="text"
                name="imageUrl"
                onChange={handleChange}
                value={recipe.imageUrl}
              />
              <label htmlFor="category">Category of Recipe</label>
              <select
                name="category"
                onChange={handleChange}
                value={recipe.category}
              >
               <option value="-1">select</option>
                                                                {recipeCategory.map((category,key)=>{
                                                                    return (
                                                                        <option key={key} value={category.value}>{category.label}</option>
                                                                    )
                                                                })} 
              </select>
              <label htmlFor="description">Recipe Description</label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={recipe.description}
              />

              <hr />
              <div className="modal-buttons">
                <button type="submit" className="button-primary">
                  Update
                </button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </Mutation>
);

export default UserRecipes;

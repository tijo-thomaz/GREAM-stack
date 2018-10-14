import React,{Component} from 'react';
import {Mutation} from 'react-apollo';
import {withRouter} from 'react-router-dom';
import CKEditor from "react-ckeditor-component";
import {ADD_RECIPE, GET_ALL_RECIPIES,GET_USER_RECIPES} from '../queries'
import ErrorMessage from '../ErrorMessage';
import withAuth from '../withAuth'
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

const initialState={
    name:'',
    category:-1,
    description:'',
    instructions:'',
    username:''
}

class AddRecipe extends Component {
    constructor(props){
        super(props)
        this.state={...initialState};
    }
    clearState=()=>{
        this.setState({...initialState});
    }
    componentDidMount() {
        //console.log(this.props.session.getCurrentUser.username)
        this.setState({
            username:this.props.session.getCurrentUser.username?this.props.session.getCurrentUser.username:""
        })
    }
    handelChange=(e)=>{
        const {name,value}=e.target;
       this.setState({
           [name]:value
       })
    }
    validateForm=()=>{
        const {name,imageUrl,category,description,instructions}=this.state
        const isInValid = !name||!category||!imageUrl||!description||!instructions
        return isInValid
    }
    handelSubmit=(e,addRecipe)=>{
        e.preventDefault();
        addRecipe().then(async ({data})=>{
        //  console.log(data)
      
            this.clearState();

            this.props.history.push('/')
        })
    }
    updateCache=(cache,{data:{addRecipe}})=>{
       const {getAllRecipes}= cache.readQuery({
            query:GET_ALL_RECIPIES
        });
        cache.writeQuery({
            query:GET_ALL_RECIPIES,
            data:{
                getAllRecipes:[addRecipe, ...getAllRecipes]
            }
        })
    }
    handelEditorChange=(e)=>{
        const newContent =e.editor.getData();
        console.log(e)
        this.setState({
            instructions:newContent
        })
    }
    render(){
        const {name,imageUrl,category,description,instructions,username}=this.state
       return( <Mutation mutation={ADD_RECIPE} 
        variables={{name,imageUrl,category,description,instructions,username}}
        update={this.updateCache}
        refetchQueries={() => [
          { query: GET_USER_RECIPES, variables: { username } }
        ]}
        >
       {(addRecipe,{data,loading,error})=>{

        return(
            <div className="row profile">
             <div className="col-md-8">
             <form className="form-horizontal" onSubmit={e=>this.handelSubmit(e,addRecipe)}>
                                    <div className="panel panel-flat">
                                        <div className="panel-heading">
                                            <h5 className="panel-title">Add New Recipe<a className="heading-elements-toggle"><i className="icon-more"></i></a></h5>
                                            {/* <div className="heading-elements">
                                                <ul className="icons-list">
                                                    <li><a data-action="collapse"></a></li>
                                                    <li><a data-action="reload"></a></li>
                                                    <li><a data-action="close"></a></li>
                                                </ul>
                                            </div> */}
                                        </div>
    
                                        <div className="panel-body">
                                            <fieldset>
                                                <legend className="text-semibold">
                                                    <i className="icon-file-text2 position-left"></i>
                                                    Enter your information
                                                    <a className="control-arrow collapsed" data-toggle="collapse" data-target="#demo1" aria-expanded="false">
                                                        <i className="icon-circle-down2"></i>
                                                    </a>
                                                </legend>
    
                                                <div className="collapse" id="demo1" aria-expanded="false" style={{height: "0px"}}>
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Name of recipe:</label>
                                                        <div className="col-lg-9">
                                                            <input type="text" className="form-control" placeholder="Recipe Name" name="name" value={name} onChange={this.handelChange}/>
                                                        </div>
                                                    </div>
    
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Select the category:</label>
                                                        <div className="col-lg-9">
                                                            <select data-placeholder="Select your country" className="select form-control"  tabIndex="-1" aria-hidden="true" name="category" value={category}onChange={this.handelChange}>
                                                                <option value="-1">select</option>
                                                                {recipeCategory.map((category,key)=>{
                                                                    return (
                                                                        <option key={key} value={category.value}>{category.label}</option>
                                                                    )
                                                                })} 
                                                              
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Image Url:</label>
                                                        <div className="col-lg-9">
                                                            <input type="text" className="form-control" placeholder="Url for image" name="imageUrl" value={imageUrl}onChange={this.handelChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Description:</label>
                                                        <div className="col-lg-9">
                                                            <input type="text" className="form-control" placeholder="Add description" name="description" value={description}onChange={this.handelChange} />
                                                        </div>
                                                    </div>
    
                                                    <div className="form-group">
                                                        <label className="col-lg-3 control-label">Instructions:</label>
                                                        <div className="col-lg-9">
                                                           {/*  <textarea rows="5" cols="5" className="form-control" placeholder="Enter your recipe instructions" name="instructions" value={instructions} onChange={this.handelChange}></textarea>
                                                         */}
                                                         <CKEditor
                                                         name="instructions"
                                                         content={instructions}
                                                         events={{change:this.handelEditorChange}}
                                                          />
                                                         </div>
                                                    </div>
                                                </div>
                                            </fieldset>
    
                                    
                                            <div className="text-right">
                                                <button type="submit" disabled={loading||this.validateForm()} className="btn btn-primary legitRipple">Submit <i className="icon-arrow-right14 position-right"></i></button>
                                                {error   &&	<ErrorMessage error={error}/>	}
                                                </div>
                                        </div>
                                    </div>
                                </form>
             </div>
            </div>
        )
       }}
        
        </Mutation>)
}
}
export default withAuth(session => session && session.getCurrentUser)(
    withRouter(AddRecipe));
import React,{useEffect,useContext} from 'react'
import {withRouter,Link} from 'react-router-dom';
import {GlobalContext} from '../../App';
import './profile.styles.scss';
function Profile({match}) {
    const {state,dispatch} = useContext(GlobalContext);
    const {posts} = state;
    const {params} = match
    const handleDelete = (id) => {
      dispatch({type:'DELETE_POST',payload:id});
    }
    useEffect(() => {
        if(!params.id){
            const myPosts = posts.filter(post => post.userId === 2)
            dispatch({type:"FETCH_POSTS",payload:myPosts})
        } else {
            const myPosts = posts.filter(post => post.userId === Number(params.id))
            dispatch({type:"FETCH_POSTS",payload:myPosts})
        }
    },[])
    if(!params.id){
        return (
            <div className="my-posts">
                <h1>This is my profile</h1>
                {/* Implementing CRUD here, quite naive approach */}
                {posts.map(post =>(
                    <div key={post.id} className="my-post">
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <button><Link to={"/profile/"+post.id+"/updatepost"}>Update Post</Link></button>
                        <button onClick={() =>handleDelete(post.id)}>Delete Post</button>
                    </div>
                ))}
                <button className='create-button'><Link to="/createpost">Create Post</Link></button>
            </div>
        )
    } else {
        return(
            <div className="my-posts">
                {posts.map(post =>(
                    <div key={post.id} className="my-post">
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
            
        )
    }
}
export default withRouter(Profile)
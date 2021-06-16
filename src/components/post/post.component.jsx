import React,{useState,useEffect,useReducer,useContext} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import {reducer} from '../../context/AppReducer';
import {GlobalContext} from '../../App';
import './post.styles.scss';
function Post({match}) {
    //Access initialState from Context provider
    const {state,dispatch} = useContext(GlobalContext);
    const {comments} = state
    const [post, setpost] = useState('')
    const {params} = match
    useEffect(() => {
        async function getComments(){
            const comments = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`)
            return comments.data
        }
        async function getPost(){
            const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
            return post.data
        }
        getComments().then(data => dispatch({type:'FETCH_COMMENTS',payload:data}))
        getPost().then(data => setpost(data))
    },[])
    if(comments && post){
        return (
            <div className="container">
                <div className="post">
                    <h5>Post number: {post.id}</h5>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
                <div className="comments">
                    <ol>
                        {comments.map(comment =>(
                            
                                <li key={comment.id}>{comment.name}</li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
    else {
        return(
            <div>Loading....</div>
        )
    }
}
export default withRouter(Post) 
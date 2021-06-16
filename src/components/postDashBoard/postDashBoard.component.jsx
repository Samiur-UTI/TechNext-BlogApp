import React,{useState,useEffect,useContext,useReducer} from 'react'
import {NavLink} from 'react-router-dom'
import './postDashBoard.styles.scss'
import axios from 'axios';
import {GlobalContext} from '../../App'
import {reducer} from '../../context/AppReducer'
export default function PostDashBoard() {
    //Access initialState from Context provider
    const {state,dispatch} = useContext(GlobalContext);
    const {posts} = state
    //Fetch posts on mount
    useEffect(() => {
        async function getPosts() {
            const data = await axios.get('https://jsonplaceholder.typicode.com/posts')
            return data
        }
        getPosts().then(data => dispatch({type:'FETCH_POSTS',payload:data.data}))
    }, [])
    //Component level state to load 10 posts onMount and onclick
    const [blogposts, setblogposts] = useState(posts)
    const [count, setcount] = useState(10)
    //Function to load 10 posts onClick and onMount
    const loadPost = (post,i=10) => {
        if(post){
            const newPost = post.slice(0,i)
            setblogposts(newPost)
            setcount(count + 10)
        }
    }
    useEffect(() => {
        loadPost(posts)
    },[posts])
    if(blogposts){
      return(
          <div className="all-posts">
             {blogposts.map(el => (
                //Post component, used router to avoid prop drilling
                <div className="post" key={el.id}>
                    <NavLink to={"/post/"+el.id}>{el.title}</NavLink>
                    <p>{el.body}</p>
                </div>
            ))}
            <button
            className='button' 
            onClick={() => { 
                loadPost(posts,count)
                }
            }
            >Load more</button>
          </div>
      )
    }
    else {
        return(
            <div>Loading...</div>
        )
    }
}

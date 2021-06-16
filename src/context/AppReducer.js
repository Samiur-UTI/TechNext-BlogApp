export const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                posts:action.payload
            }
        case 'FETCH_USERS':
            return{
                ...state,
                users:action.payload
            }
        case 'FETCH_COMMENTS':
            return{
                ...state,
                comments:action.payload
            }
        case 'CREATE_POST':
            return {
                ...state,
                posts:action.payload
            }
        case 'UPDATE_POST':
            const updatePost = action.payload
            const updatedPost = state.posts.map(post =>{
                if(post.id === updatePost.id){
                    return updatePost
                }else {
                    return post
                }
            })
            return{
                ...state,
                posts:updatedPost
            }
        case 'DELETE_POST':
            return{
                ...state,
                posts:state.posts.filter(post => {
                   return post.id !== action.payload
                })
            }
        default:
            return state
    }
}


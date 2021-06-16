import React,{useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {GlobalContext} from '../../App'
import {useForm} from 'react-hook-form'
import './form.styles.scss'
function FormComponent({match}) {
    const {params} = match
    const {postId} = params
    const {state,dispatch} = useContext(GlobalContext);
    const {posts} = state 
    const update = filterUpdate(posts,postId)
    const {register,handleSubmit} = useForm({defaultValues:update});
    function filterUpdate(list,id) {
        let ids = list.filter(i => i.id === Number(id))
        return ids[0]
    }
    const handleCreate = (data) => {
        data.userId = 2;
        data.id = Math.floor((Math.random() * 100) + 20);
        dispatch({type:'CREATE_POST', payload:[...posts,data]})
    }
    const handleUpdate = (data) => {
        dispatch({type:'UPDATE_POST', payload:data})
    }
    if(!postId){
        return (
            <form className='form' onSubmit={handleSubmit(handleCreate)}>
                <input className='input title' type='text' placeholder='enter title' name="title" {...register('title')}/>
                <input className='input description' type='text' placeholder='enter description' name="body" {...register('body')}/>
                <input type='submit'/>
            </form>
        )
    } else {
        return(
            <form className='form' onSubmit={handleSubmit(handleUpdate)}>
                <input className='input title' type='text' name="title" {...register('title')}/>
                <input className='input description' type='text' name="body" {...register('body')}/>
                <input type='submit'/>
            </form>
        )
    }
}
export default withRouter(FormComponent)

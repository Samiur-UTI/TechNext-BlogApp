import React,{useEffect,useContext,useState} from 'react'
import {withRouter,Link} from 'react-router-dom'
import {GlobalContext} from '../../App'
import {Table,TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar,InputAdornment,IconButton} from '@material-ui/core'
import axios from 'axios'
function Users() {
    const {state,dispatch} = useContext(GlobalContext)
    const {users,posts} = state
    console.log(posts)
    const pages = [3,5,10]
    const headCells = [
        {id:1, label:'NAME'},
        {id:2, label:'EMAIL'},
        {id:3, label:'WEBSITE'},
    ]
    const [page, setpage] = useState(0)
    const [rowsPerPage, setrowsPerPage] = useState(pages[page])
    const [order, setorder] = useState()
    const [orderBy, setorderBy] = useState()
    const [search, setsearch] = useState({func:items => {return items}})
    useEffect(() => {
        async function getUsers(){
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
            return data
        }
        async function getPosts(){
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
            return data
        }
        getUsers().then(users => dispatch({type:'FETCH_USERS',payload:users}))
        getPosts().then(posts => dispatch({type:'FETCH_POSTS',payload:posts}))
    },[dispatch])
    const handlePageChange= (event,newPage) => {
        setpage(newPage)
    }
    const handleRowsPerPageChange = (event) => {
        setrowsPerPage(parseInt(event.target.value,10))
        setpage(0)
    }
    const handleSearch = (e) => {
        console.log(e)
        let target = e.target.value
        setsearch({
            func:item => {
                if(target ===''){
                    return item
                } else {
                    return item.filter(x => x.name.includes(target))
                }
            }
        })
    }
    const stableSort = (array,comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    const getComparator = (order,orderBy) => {
        return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    const recordsAfterPagingandSorting = () => {
        return stableSort(search.func(users),getComparator(order,orderBy)).slice(page*rowsPerPage,(page+1) * rowsPerPage)
    }
    const handleSorting = (id) => {
        const isAsc = orderBy === id && order === 'asc'
        setorder(isAsc ? 'desc' : 'asc')
        setorderBy(id)
    }
    if(users.length){
        return (
            <div>
                <Toolbar>
                    <TextField 
                        label='Search Users'
                        variant='outlined'
                        onChange = {handleSearch}
                    />
                </Toolbar>
                <Table>
                    <TableHead>
                        {
                            headCells.map(item => (
                            <TableCell key={item.id}>
                                <TableSortLabel
                                    active={orderBy === item.id} 
                                    direction={orderBy === item.id ? order:'asc'}
                                    onClick={() => {handleSorting(item.id)}}>
                                        <h1>{item.label}</h1>
                                </TableSortLabel>
                            </TableCell>
                            ))
                        }
                    </TableHead>
                    <TableBody>
                        {recordsAfterPagingandSorting().map(item =>(
                            <TableRow key={item.id}>
                                 <TableCell><Link to={"/profile/" +item.id}>{item.name}</Link></TableCell>
                                 <TableCell>{item.email}</TableCell>
                                 <TableCell>{item.website}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    page={page}
                    rowsPerPage={rowsPerPage}
                    count={users.length}
                    component='div'
                    rowsPerPageOptions={pages}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                />
            </div>
        )
    } else {
        return <h1>Loading...</h1>
    }
}
export default withRouter(Users)
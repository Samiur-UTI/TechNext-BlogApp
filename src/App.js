import React,{useReducer,createContext} from 'react';
import './App.css'
import {Route,Switch} from 'react-router-dom';
import Home from './pages/home/home.component';
import Nav from './components/navpanel/nav.component'
import Profile from './pages/profile/profile.component'
import Users from './pages/users/users.component'
import Post from './components/post/post.component'
import FormComponent from './components/form/form.component'
import {reducer} from './context/AppReducer'
const initialState = {
    posts:[],
    users:[],
    comments:[]
}
export const GlobalContext = createContext()
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
      <Nav/>
      <Switch>
        <Route exact path="/">
            <GlobalContext.Provider value={{state,dispatch}}>
              <Home/>
            </GlobalContext.Provider>
        </Route>
        <Route exact path="/profile">
            <GlobalContext.Provider value={{state,dispatch}}>
              <Profile/>
            </GlobalContext.Provider>
        </Route>
        <Route exact path="/createpost">
            <GlobalContext.Provider value={{state,dispatch}}>
              <FormComponent/>
            </GlobalContext.Provider>
        </Route>
        <Route exact path="/profile/:id">
            <GlobalContext.Provider value={{state,dispatch}}>
              <Profile/>
            </GlobalContext.Provider>
        </Route>
        <Route exact path="/users">
          <GlobalContext.Provider value={{state,dispatch}}>
              <Users/>
          </GlobalContext.Provider>
        </Route>
        <Route exact path="/post/:id">
          <GlobalContext.Provider value={{state,dispatch}}>
              <Post/>
          </GlobalContext.Provider>
        </Route>
        <Route exact path="/profile/:postId/updatepost">
            <GlobalContext.Provider value={{state,dispatch}}>
              <FormComponent/>
            </GlobalContext.Provider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

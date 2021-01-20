import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import ForumPage from "./pages/ForumPage";
import { Switch, Route } from "react-router-dom";
import DashBoardPage from "./pages/DashBoardPage";
import { fetchUserFromLocalStorage } from "./redux/actions/authActions";
import ApplicationPage from "./pages/ApplicationPage";
import DataAnalysisPage from "./pages/DataAnalysisPage";
import ProfilePage from "./pages/ProfilePage";
/*
Login and register :
1. Redux -> create actions, reducers folders and files and store file
2. Setup store -> import thunk, composeWithDevtools from redux-devtools-extension and createStore
3. createStore(reducer, composeWithDevtools(applyMiddleware(thunk)))
4. Add store, provider in index file

5. authActions file -> login and register actions
6. login action -> login(email, password) -> call login
*/

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={DashBoardPage} />
        <Route exact path="/register" component={LoginRegisterPage} />
        <Route exact path="/login" component={LoginRegisterPage} />
        <Route exact path="/application/:id" component={ApplicationPage} />
        <Route exact path="/analysis" component={DataAnalysisPage} />
        <Route exact path="/forum" component={ForumPage} />
        <Route exact path="/profile" component={ProfilePage} />
      </Switch>
    </div>
  );
}

export default App;

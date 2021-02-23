import React from "react";
import './App.css';
import Header from "./components/Header";
import QuestionBox from "./components/QuestionBox";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
function App() {
  return (
    <Router className="App">
      <Header /> {/* header will be present in all pages */}
      <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <QuestionBox />
          </Route>
      </Switch>
    </Router>
  );
} 

export default App;

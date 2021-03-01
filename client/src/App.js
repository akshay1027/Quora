import React, {useState, useEffect} from "react";
import './App.css';
import Header from "./components/Header";
import QuestionBox from "./components/QuestionBox";
import AnswerBox from "./components/AnswerBox";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import QuesstionList from "./components/QuestionList";
import axios from "axios"

// use callbacks instead of "function App()"

const App = () =>  {
  
  // prop drilling

  const [authStatus, setAuthStatus] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // whenever anything happens in the "App", useEffect is triggered.

  useEffect(()=>{
    
    const url="http://localhost:5000/isLoggedIn";

    axios
        .get(url, {withCredentials: true})
        .then((response)=>{
            setAuthStatus(response.data.authStatus);
            setProfileImage(response.data.profileImage);
        })
        .catch((error)=>{
            console.log(error);
        });
  }, []);

  return (
    <Router className="App">
      <Header profileImage={profileImage}/> {/* header will be present in all pages */}
      <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <QuestionBox authStatus={authStatus} profileimage={profileImage}/>
            <QuesstionList />
          </Route>
          <Route path="/question/id">
            <AnswerBox authStatus={authStatus} profileimage={profileImage}/>
          </Route>

      </Switch>
    </Router>
  );
} 

export default App;

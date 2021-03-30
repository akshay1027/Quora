import React, {useState, useEffect} from "react";
import './App.css';
import Header from "./components/Header";
import QuestionBox from "./components/QuestionBox";
import AnswerBox from "./components/AnswerBox";
import QuestionById from "./components/QuestionById";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import QuesstionList from "./components/QuestionList";
import AnswerList from "./components/AnswerLIst";
import axios from "axios"
import QuestionScreen from "./components/QuestionScreen";

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
        
          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/questions/:id">
            <QuestionScreen authStatus={authStatus} profileImage={profileImage}/>
            
          </Route>

          <Route path="/">
            <QuestionBox authStatus={authStatus} profileImage={profileImage}/>
            <QuesstionList />
          </Route>

    </Router>
  );
} 

export default App;

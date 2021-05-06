import React, {useState, useEffect} from "react";
import './App.css';
import QuestionBox from "./components/QuestionBox";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NavBar from "./components/Navbar"
import QuesstionList from "./components/QuestionList";
import axios from "axios"
import QuestionScreen from "./components/QuestionScreen";
import Background from "./components/Background";

// use callbacks instead of "function App()"


const App = () =>  {
  
  // prop drilling

  const [authStatus, setAuthStatus] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(null);

  // whenever anything happens in the "App", useEffect is triggered.

  useEffect(()=>{

    axios
        .get("/isLoggedIn", {withCredentials: true})
        .then((response)=>{
            setAuthStatus(response.data.authStatus);
            setProfileImage(response.data.profileImage);
            setUsername(response.data.username);
        })
        .catch((error)=>{
            console.log(error);
        });
  }, []);

  return (
    <Router className="App">
      <NavBar profileImage={profileImage}/> {/* header will be present in all pages */}
         <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/questions/:id" render={(props) => (  
            <QuestionScreen authStatus={authStatus} profileImage={profileImage} username={username}
                {...props} />
            )} exact />
        
          <Route path="/">
            <div style={{background:"rgba(25, 28, 31)"}}>
            <Background />
            <QuestionBox authStatus={authStatus} profileImage={profileImage} username={username}/>
            <QuesstionList />
            </div>
          </Route>

          </Switch>
    </Router>
  );
} 

export default App;


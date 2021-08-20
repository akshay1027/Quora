import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
import axios from 'axios';
import Preloader from './screens/preloader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const LazyQuestionBox = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./components/QuestionBox')), 4000);
    });
});

const LazyQuesstionList = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./components/QuestionList')), 4000);
    });
});

const LazyNavBar = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./components/Navbar')), 4000);
    });
});

const LazyBackground = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./components/Background')), 4000);
    });
});

const LazySignUp = React.lazy(() => import('./screens/SignUp'));
const LazySignIn = React.lazy(() => import('./screens/SignIn'));
const LazyQuestionScreen = React.lazy(() => import('./screens/QuestionScreen'));
const LazyFind = React.lazy(() => import('./screens/find'));

// use callbacks instead of "function App()"

const App = () => {
    // prop drilling

    const [authStatus, setAuthStatus] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(null);

    // whenever anything happens in the "App", useEffect is triggered.

    useEffect(() => {
        axios
            .get('/isLoggedIn')
            .then((response) => {
                setAuthStatus(response.data.authStatus);
                setProfileImage(response.data.profileImage);
                setUsername(response.data.username);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    //   <div style={{ display: 'flex', justifyContent: 'center',  marginTop:'50px'}}>Loading...</div>

    return (
        <Router className="App">
            <Suspense fallback={<Preloader />}>
                <LazyNavBar profileImage={profileImage}/> {/* header will be present in all pages */}
                <Switch>
                    <Route path="/signin">
                        <LazySignIn />
                    </Route>

                    <Route path="/signup">
                        <LazySignUp />
                    </Route>

                    <Route path="/questions/:id" render={(props) => (
                        <LazyQuestionScreen authStatus={authStatus} profileImage={profileImage} username={username}
                            {...props} />
                    )} exact />

                    <Route path="/find">
                        <LazyFind />
                    </Route>

                    <Route path="/">
                        <div style={{ background: 'rgba(25, 28, 31)' }}>
                            <LazyBackground />
                            <LazyQuestionBox authStatus={authStatus} profileImage={profileImage} username={username}/>
                            <LazyQuesstionList />
                        </div>
                    </Route>

                </Switch>
            </Suspense>
        </Router>
    );
};

export default App;

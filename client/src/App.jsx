import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Authentication from './components/authentication';
import MainAppBar from './components/mainAppBar';
import { useAppSelector } from './redux/store';
import {
    Box, LinearProgress,
    createStyles, makeStyles,
    Theme
} from '@material-ui/core';

const QuestionBox = lazy(() => import('./components/QuestionBox'));
const QuesstionList = lazy(() => import('./components/QuestionList'));

const SignUp = lazy(() => import('./screens/SignUp'));
const SignIn = lazy(() => import('./screens/SignIn'));
const AnswerScreen = lazy(() => import('./screens/AnswerScreen'));
const Find = lazy(() => import('./screens/find'));

const useStyles = makeStyles((theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
        BackgroundDark: {
            // background: '#121212'
            background: '#0b0f13'
        },
        BackgroundLight: {
            background: '#fafafa'
        }
    })
);

const App = () => {
    const classes = useStyles();

    // prop drilling
    const [authStatus, setAuthStatus] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState(null);
    const darkTheme = useAppSelector(state => state.ui.darkTheme);

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

    return (
        <Router>
            <Route path='/' component={Authentication} />
            <Box display="flex" flexGrow={1} className={ darkTheme ? classes.BackgroundDark : classes.BackgroundLight }>
                <Box className={classes.toolbar} display="flex" flexDirection="column" flexGrow={1}>
                    <Route path='/' component={MainAppBar} />
                    {/* <Route path='/' component={Background} /> */}
                    <Suspense fallback={<LinearProgress />}>
                        <Switch>
                            <Route path="/signin">
                                <SignIn />
                            </Route>

                            <Route path="/signup">
                                <SignUp />
                            </Route>
                            {/* App Routes */}
                            <Route path="/questions/:id" render={(children) => (
                                <AnswerScreen authStatus={authStatus} profileImage={profileImage} username={username}
                                    {...children} />
                            )} exact />

                            <Route path="/find">
                                <Find />
                            </Route>

                            <Route path="/">
                                <QuestionBox authStatus={authStatus} profileImage={profileImage} username={username}/>
                                <QuesstionList />
                            </Route>
                        </Switch>
                    </Suspense>
                </Box>
            </Box>
        </Router>
    );
};

export default App;

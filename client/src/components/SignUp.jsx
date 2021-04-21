import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "../helper/axioshelper";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        PEC Quora
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
    
    // state management

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const history = useHistory(); // Hook to re-direct user
    const SignUpUser = async (e) => {

      // to avoid refresh.

      e.preventDefault();
      
      //FormData Provides a way to easily construct a set of key/value pairs representing form fields and their values,
      //which can then be easily sent using the XMLHttpRequest.send()/axios.send() method.

      const form_data = new FormData();
      form_data.append("username", username);
      form_data.append("password", password);
      form_data.append("image", image);
      
      // saving url in a variable to use it later whenever needed. Best Practises.
      const server1 = process.env.NODE_ENV === "production"
      ? "https://pecquora-backend.herokuapp.com/signup" : "http://localhost:5000/signup";
 
      const url = server1;
  
      try {

        // Making http post request to backend using axios.

        const response = await axios.post("/signup", form_data, {
          withCredentials: true,
        });
        console.log(response);

        // Destructure data and status

        const { data, status } = response;
  
        if (status === 201) {
          
          //if status is created(201 status code), 
          //re-direct user back to sign in page 

          alert(data.msg);
          history.push("/signin");
        }
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    
  const classes = useStyles();

  return (

    //jsx

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="username"
            autoFocus
            //state management. By setting "setUsername" as entered value, we can send it through props and use "username" in other files.
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            //state management. By setting "setPassword" as entered value, we can send it through props and use "password" in other files.
            onChange={(e) => setPassword(e.target.value)}
          />
          <label style={{marginRight:"5px", fontWeight:"700"}}>Select Profile Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={SignUpUser}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from '../helper/axioshelper';
import '../StyleSheet/QuestionList.css';
import '../StyleSheet/QuestionBox.css';
import '../StyleSheet/About.css';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const Find = () => {
    const [users, setUsers] = useState([]);
    // const [search, setSearch] = useState([]);
    // Search has to be string. Imp bug fix
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    useEffect(() => {
        axios.get('/api/users').then((response) => {
            console.log(response.data);
            setUsers(response.data);
        });
    }, []);

    return (
        <div style={{ background: 'rgb(12, 17, 24)', paddingTop: '20px' }}>
            <div className="main__content">
                <h1 id="brand2" style={{ marginBottom: '40px', marginTop: '50px', color: '#4a73b5 !important' }}>
            people
                </h1>
                <Typography className='hidden'
                >
            Use in desktop mode or in pc to get better experience.
                </Typography>
            </div>
            <Grid class='row'>
                <FormControl style={{ minWidth: '200px', marginTop: '-10px', borderBottom: '2px solid #395177', marginBottom: '20px', background: '#19191c' }}>
                    <Select
                        value={filter}
                        onChange={handleChange}
                        displayEmpty
                        style={{ color: '#395177' }}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Filter Search</em>
                        </MenuItem>
                        <MenuItem value={10}>Search username</MenuItem>
                        <MenuItem value={20}>Search department</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <div id="QuestionSearch" style={{ marginTop: '20px', marginBottom: '30px' }}>
                <div className="QuestionBox_inputField" style={{ border: '2px solid #395177 !important' }}>
                    <input
                        type="text"
                        placeholder="Search after choosing a filter"
                        className="QuestionBox_inputfield"
                        id="searchBar"
                        style={{ border: '2px solid #395177 !important' }}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>
            </div>
            <Grid class="row">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                </Grid>

                { filter === 20
                    ? users.filter((val) => {
                        if (search === '') {
                            return val;
                        } else if (
                            val.department.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return val;
                        }
                    }).map((user) => {
                        return (
                            <div class="card2">
                                <div class="card-header2">
                                    <img src={user.profileImage} width="100" height="100" alt="user img" style={{ borderRadius: '50%' }}/>
                                    <div style={{ fontWeight: 700, fontSize: '18px', margin: '10px 0px 0px 0px' }}>{user.username}</div>
                                    <a
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        href={`mailto:${user.gmail}`}
                                        target="_blank"
                                    >
                                        <MailIcon className="developer-icon" />
                                    </a>
                                    <a
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        href={user.linkedin}
                                        target="_blank"
                                    >
                                        <LinkedInIcon className="developer-icon" />
                                    </a>
                                </div>
                                <div class="card-body" id="developer">
                                    <p style={{ fontSize: '17px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>{user.department} | {user.yearPassout}</div>
                                        <br />
                                        <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '14px' }}>
                                            {user.gistAbout}
                                        </div>

                                        <br />
                                    </p>
                                </div>
                            </div>
                        );
                    })

                    : users.filter((val) => {
                        if (search === '') {
                            return val;
                        } else if (
                            val.username.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return val;
                        }
                    }).map((user) => {
                        return (
                            <div class="card2">
                                <div class="card-header2">
                                    <img src={user.profileImage} width="100" height="100" alt="user img" style={{ borderRadius: '50%' }}/>
                                    <div style={{ fontWeight: 700, fontSize: '18px', margin: '10px 0px 0px 0px' }}>{user.username}</div>
                                    <a
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        href={`mailto:${user.gmail}`}
                                        target="_blank"
                                    >
                                        <MailIcon className="developer-icon" />
                                    </a>
                                    <a
                                        style={{ textDecoration: 'none', color: 'black' }}
                                        href={user.linkedin}
                                        target="_blank"
                                    >
                                        <LinkedInIcon className="developer-icon" />
                                    </a>
                                </div>
                                <div class="card-body" id="developer">
                                    <p style={{ fontSize: '17px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', fontWeight: '600' }}>{user.department} | {user.yearPassout}</div>
                                        <br />
                                        <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '14px' }}>
                                            {user.gistAbout}
                                        </div>

                                        <br />
                                    </p>
                                </div>
                            </div>
                        );
                    })

                }
            </Grid>
        </div>
    );
};

export default Find;

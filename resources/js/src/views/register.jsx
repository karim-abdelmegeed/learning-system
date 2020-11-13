import React, {useEffect, useState} from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Card from "../components/Card/Card";
import CardHeader from "../components/Card/CardHeader";
import CardBody from "../components/Card/CardBody";
import CustomInput from "../components/CustomInput/CustomInput";
import CardFooter from "../components/Card/CardFooter";
import Button from "../components/CustomButtons/Button";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import Select from "react-select";
import {useHistory} from "react-router-dom";

function Register() {
    const styles = {
        cardCategoryWhite: {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        cardTitleWhite: {
            color: "#FFFFFF",
            marginTop: "0px",
            minHeight: "auto",
            fontWeight: "300",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            marginBottom: "3px",
            textDecoration: "none"
        }
    };
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [phone, setPhone] = useState('');
    const [full_name, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [educationalLevels] = useState([]);
    const [selected_educational_level, setEducationalLevel] = useState('');
    const [subjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    let history = useHistory();

    if(localStorage.getItem('access_token')){
        history.push('/admin/quizzes');
    }
    useEffect(() => {
        axios.get('/api/educational-levels').then((response) => {
            response.data.map(educationalLevel => {
                educationalLevels.push({'label': educationalLevel.name, 'value': educationalLevel.id});
            })
        });
        axios.get('/api/subjects').then(response => {
            response.data.map(subject => {
                subjects.push({'label': subject.name, 'value': subject.id});
            })
        });
    }, []);
    return (
        <div style={{marginTop: "50px"}}>
            <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Register</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Full Name"
                                        id="full-name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: e => {
                                                setFullName(e.target.value)
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Phone number"
                                        id="phone-number"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: e => {
                                                setPhone(e.target.value)
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="password"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "password",
                                            onChange: e => {
                                                setPassword(e.target.value)
                                            }
                                        }}

                                    />
                                </GridItem>
                                <GridItem xs={6} md={6} sm={6}>
                                    <Select value={selected_educational_level}
                                            placeholder={"Select Educational Level"}
                                            options={educationalLevels}
                                            onChange={option => {
                                                setEducationalLevel(option)
                                            }}
                                    />
                                </GridItem>
                                <GridItem xs={6} md={6} sm={6}>
                                    <Select value={selectedSubject}
                                            placeholder={"Select Subject"}
                                            options={subjects}
                                            onChange={option => {
                                                setSelectedSubject(option)
                                            }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={e => {
                                axios.post("/api/register", {
                                    full_name,
                                    phone,
                                    password,
                                    "subject": selectedSubject.value,
                                    "educational_level": selected_educational_level.value
                                }).then(res => {
                                    history.push("/login");
                                })
                            }}>Register</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Register

import React, {useState} from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Card from "../components/Card/Card";
import CardHeader from "../components/Card/CardHeader";
import CardBody from "../components/Card/CardBody";
import CustomInput from "../components/CustomInput/CustomInput";
import CardFooter from "../components/Card/CardFooter";
import Button from "../components/CustomButtons/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

import axios from "axios";

function Login() {
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
    const [password, setPassword] = useState('');
    let history = useHistory();
    if(localStorage.getItem('access_token')){
        history.push('/admin/quizzes');
    }
    return (
        <div style={{marginTop: "50px"}}>
            <GridContainer>
                <GridItem xs={3} sm={3} md={3}>
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Login</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Phone number"
                                        id="phone-number"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: e => {
                                                setPhone(e.target.value);
                                            }
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="password"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "password",
                                            onChange: e => {
                                                setPassword(e.target.value);
                                            }
                                        }}

                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={e => {
                                axios.post("/api/login", {"phone": phone, "password": password}).then(res => {
                                    if (res.data.status) {
                                        localStorage.setItem("access_token", res.data.data.access_token)
                                        localStorage.setItem("user", JSON.stringify(res.data.data.user));
                                        history.push("/admin/quizzes");
                                    }
                                });
                            }}>Login</Button>
                            <Button color="danger" onClick={e => {
                              history.push('/register')
                            }}>Register</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default Login

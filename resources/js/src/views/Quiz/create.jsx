import React, {useEffect, useState} from 'react';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Select from 'react-select';
import axios from "axios";
import {Card} from "@material-ui/core";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Flatpickr from "react-flatpickr";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import "flatpickr/dist/themes/material_blue.css";
import {useHistory} from "react-router-dom";

function CreateQuiz() {
    const [name, setName] = useState('');
    const [models, setModels] = useState('');
    const [time, setTime] = useState('');
    const [end_date, setEndDate] = useState('');
    const [result, setResult] = useState('');
    const [educationalLevels] = useState([]);
    const [selected_educational_level, setEducationalLevel] = useState('');
    const [subjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    let history=useHistory();

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
        <div>
            <GridContainer>
                <GridItem xs={12} md={12} sm={12}>
                    <Card variant={"outlined"} style={{'height': '400'}}>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} md={9} sm={9}>
                                    <CustomInput
                                        labelText="Quiz Name"
                                        id="quiz_name"
                                        value={name}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: e => {
                                                setName(e.target.value);
                                            }
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} md={9} sm={9}>
                                    <CustomInput
                                        labelText="Models number"
                                        type="number"
                                        id="models"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            onChange: e => {
                                                setModels(e.target.value);
                                            }
                                        }}
                                        value={models}
                                    />
                                </GridItem>
                            </GridContainer>
                            {/* <GridContainer  style={{paddingTop:"25px"}}> */}
                                {/* <GridItem xs={12} md={9} sm={9}>
                                    <Flatpickr
                                        data-enable-time
                                        value={time}
                                        placeholder={"Quiz Time"}
                                        className={"datetime-picker"}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: "H:i",
                                            time_24hr: true
                                        }}
                                        onChange={time => {
                                            setTime(time)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer> */}
                            <GridContainer>
                                <GridItem xs={12} md={9} sm={9}>
                                    <Flatpickr
                                        placeholder={"Quiz End Date"}
                                        value={end_date}
                                        className={"datetime-picker"}
                                        onChange={date => {
                                            setEndDate(date)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} md={9} sm={9}>
                                    <Flatpickr
                                        placeholder={"Quiz Result Date"}
                                        value={result}
                                        className={"datetime-picker"}
                                        onChange={date => {
                                            setResult(date)
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} md={9} sm={9}>
                                    <Select value={selected_educational_level}
                                            placeholder={"Select Educational Level"}
                                            options={educationalLevels}
                                            onChange={option => {
                                                setEducationalLevel(option)
                                            }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer style={{paddingTop:"25px"}}>
                                <GridItem xs={9} md={9} sm={9}>
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
                                axios.post("/api/quiz", {
                                    'name': name,
                                    'time': time[0],
                                    'models': models,
                                    'end_date': end_date[0],
                                    'result_date': result[0],
                                    'educational_level_id': selected_educational_level.value,
                                    'subject_id':selectedSubject.value
                                }).then(res => {
                                    history.push("/admin/quizzes")
                                });
                            }}>Save Quiz</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default CreateQuiz

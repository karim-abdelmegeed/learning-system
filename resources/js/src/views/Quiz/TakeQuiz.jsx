import React, {useEffect, useState} from "react";
import axios from "axios";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {Card} from "@material-ui/core";
import CardBody from "../../components/Card/CardBody";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "../../components/CustomButtons/Button";
import CardFooter from "../../components/Card/CardFooter";


function TakeQuiz() {

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(0);
    const [model, setModel] = useState(null);
    const [nextOrFinish, setNextOrFinish] = useState('NEXT')
    useEffect(() => {
        const getQuestions = async () => {
            return await axios.get('/api/quiz/take', {params: {"quiz_id": 1}})
        }
        getQuestions().then((response) => {
            setQuestions(response.data.data.questions.data);
            setModel(response.data.data.model_id);
        });

    }, []);
    return (
        <div>
            {
                questions.map((question, key) => {
                    return (
                        <GridContainer key={key}>
                            <GridItem xs={12} md={12} sm={12}>
                                <Card variant={"outlined"} style={{'height': '400', marginBottom: '20px'}}>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">{question.description}</FormLabel>
                                                    <RadioGroup name="gender1"
                                                                value={answers}
                                                                onChange={e => {
                                                                    setAnswers(parseInt(e.target.value));
                                                                }}>
                                                        {
                                                            question.choices.map((choice, choiceKey) => {
                                                                return (
                                                                    <FormControlLabel key={choiceKey}
                                                                                      value={choice.id}
                                                                                      control={<Radio/>}
                                                                                      label={choice.choice}/>
                                                                );
                                                            })
                                                        }
                                                    </RadioGroup>
                                                </FormControl>

                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem>
                                <Button color="primary"
                                        onClick={e => {;
                                            const config = {
                                                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                                            };
                                            axios.post("/api/questions/answer", {
                                                    "model_id": model,
                                                    "answer": answers,
                                                    "question_id": question.id
                                                },
                                                config
                                            ).then((response) => {
                                                if (response.data) {
                                                    setQuestions([response.data]);
                                                } else {
                                                    setNextOrFinish('FINISH')
                                                }

                                            })
                                        }}>{nextOrFinish}</Button>
                                            </GridItem>
                                            </GridContainer>
                                            );
                                            })
                                            }
                                            </div>
                                            )
                                            }

                                            export default TakeQuiz

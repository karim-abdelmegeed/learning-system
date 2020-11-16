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


function TakeQuiz() {

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        const getQuestions = async () => {
            return await axios.get('/api/quiz/take', {params: {"quiz_id": 1}})
        }
        getQuestions().then((response) => {
            setQuestions(response.data.data.questions);
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
                                                    <RadioGroup value={answers[key]} name="gender1"
                                                                onChange={e => {
                                                                    let answers_copy = answers.slice();
                                                                    answers_copy[key] = e.target.value;
                                                                    setAnswers([...answers_copy]);
                                                                }}>
                                                        {
                                                            question.choices.map((choice, choiceKey) => {
                                                                return (
                                                                    <FormControlLabel key={choiceKey} value={choice.id}
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
                        </GridContainer>
                    );
                })
            }
        </div>
    )
}

export default TakeQuiz

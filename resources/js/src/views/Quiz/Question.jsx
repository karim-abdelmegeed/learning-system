import React, {useContext, useState} from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import {Card} from "@material-ui/core";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import InputLabel from "@material-ui/core/InputLabel";
import {Checkbox} from '@material-ui/core';
import GlobalState from "../../contexts/GlobalState";

function Question(props) {
    const [choiceCounter, setChoiceCounter] = useState([1]);
    const [correct, setCorrect] = useState([false])
    const [questions, setQuestions,counter,setCounter] = useContext(GlobalState)
    return (
        <div style={{marginTop: "20px"}}>
            <GridContainer>
                <GridItem xs={12} md={12} sm={12}>
                    <Card variant={"outlined"} style={{'height': '400'}}>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel style={{color: "#AAAAAA"}}>Question</InputLabel>
                                    <CustomInput
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            multiline: true,
                                            rows: 5,
                                            onChange: (e) => {
                                                var question_copy = questions.slice();
                                                question_copy[props.order]  = {"question":e.target.value};
                                                setQuestions([...question_copy]);
                                            }
                                        }}
                                    />
                                </GridItem>
                                <input type="file" placeholder={"add image"} style={{"padding": "10px"}}
                                       onChange={e => {
                                           var question_copy = questions.slice();
                                           question_copy[props.order].file = e.target.value
                                           setQuestions([...question_copy]);

                                       }}
                                />
                            </GridContainer>
                            <GridContainer>
                                <a href="#" style={{"padding": "10px"}} onClick={e => {
                                    setChoiceCounter([...choiceCounter, 1]);
                                    setCorrect([...correct, false])
                                }}>Add Choice</a>
                            </GridContainer>
                            <GridContainer>
                                {choiceCounter.map((element, key) => {
                                    return (
                                        <div key={key} style={{"padding": "10px"}}>
                                            <CustomInput
                                                labelText="Add Choice"
                                                formControlProps={{
                                                    fullWidth: false,
                                                    onChange: (e => {
                                                        let question_copy = questions.slice();
                                                        if (question_copy[props.order].choices) {
                                                            question_copy[props.order].choices[key] = e.target.value;
                                                        } else {
                                                            question_copy[props.order]["choices"] = [e.target.value];
                                                        }
                                                        setQuestions([...question_copy]);
                                                    })
                                                }}
                                            />
                                            <Checkbox name="correct" checked={correct[key]}
                                                      onChange={e => {
                                                          let correct_copy = correct.slice();
                                                          correct_copy[key] = e.target.checked;
                                                          setCorrect([...correct_copy]);
                                                          let question_copy = questions.slice();
                                                          if (question_copy[props.order].correct) {
                                                              question_copy[props.order].correct = correct_copy
                                                          } else {
                                                              question_copy[props.order]["correct"] = correct_copy
                                                          }
                                                          setQuestions([...question_copy]);
                                                      }}/>
                                        </div>
                                    );
                                })}
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default Question

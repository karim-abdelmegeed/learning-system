import React, {useState} from "react"
import Question from "./Question";
import GlobalState from "../../contexts/GlobalState";
import axios from "axios";
import Button from '@material-ui/core/Button';

function Model() {
    const [counter, setCounter] = useState([1]);
    const [questions, setQuestions] = useState([{}]);
    return (
        <div>
            <Button variant="contained" color="primary" onClick={e => {
                setCounter([...counter, 1]);
            }}>Add Question</Button>

            {counter.map((element, key) => {
                return (
                    <div key={key}>
                        <GlobalState.Provider value={[questions, setQuestions, counter, setCounter]}>
                            <Question order={key}/>
                        </GlobalState.Provider>
                    </div>
                );
            })}
            <Button variant="contained" color="secondary" style={{"marginTop": "20px"}} onClick={e => {
                console.log(questions);
                axios.post('/api/questions', {'model_id': 1, 'model_data': questions}).then((response) => {
                })
            }}>Save Quiz Model</Button>

        </div>
    )
}


export default Model

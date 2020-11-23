import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "../../components/CustomButtons/Button";

function Quizzes() {

    const [data, setData] = useState([]);
    const history = useHistory();
    const columns = [
        {
            name: 'Name',
            selector: 'title',
            sortable: true,
        },
        {
            name: "End At",
            selector: "end_date",
            sortable: true
        },
        {
            name: "Result Date",
            selector: "result_date",
            sortable: true
        },
        {
            name: 'Models',
            selector: 'models',
            cell: row => <div>{
                row.quiz_models.map((model, key) => {
                    return (
                        <a href={'#'} onClick={_e => {
                            history.push("/admin/model/" + model.id);
                        }} key={key}>{model.name}<br /></a>

                    )
                })


            }</div>,
            sortable: false
        },
        {
            name: 'Result',
            selector: '',
            cell: row => {
                if (new Date(row.result_date) <= new Date()) {
                    return row.score
                }
            },
            sortable: true
        },
        {
            name: 'Actions',
            selector: '',
            cell: row => {
                if (new Date(row.end_date) >= new Date()) {
                    return (
                        <button onClick={e => {
                            let config = {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                                }
                            };
                            axios.post("/api/quiz/init", { "quiz_id": row.id }, config).then((response) => {
                                history.push("/admin/quiz/" + response.data + "/take");
                            }).catch(e => {
                                console.log(e.response.data)
                            })
                        }}>{row.title}</button>
                    );
                }
            },
            sortable: false
        },
    ];
    const user = JSON.parse(localStorage.getItem('user'));
    let createquiz, quiz_data={};

    useEffect(() => {
        const getData = async () => {
            if (user.educational_level_id && user.subject_id) {
                quiz_data = {
                    'educational_level_id': user.educational_level_id,
                    'subject_id': user.subject_id,
                }
            }
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
                params: quiz_data,
            };
            await axios.get('/api/quizzes', config).then((response) => {
                setData(response.data)
            });
        }
        getData();
    }, []);

    if (user.role_id === 1) {
        (
            createquiz = <div>
                <Button color="primary" style={{ padding: "10px", marginBottom: "20px" }} onClick={e => {
                    history.push("/admin/create-quiz")
                }}>Create Quiz</Button>
            </div>
        )
    }

    return (
        <div>
            {createquiz}
            <DataTable
                columns={columns}
                data={data}
            />
        </div>
    );
}

export default Quizzes


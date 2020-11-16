import React, {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
import {useHistory} from "react-router-dom";
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
            cell: row => <div>
                {row.quiz_models.map((model, key) => {
                    return <a href={'#'} onClick={e => {
                        history.push("/admin/model/" + model.id);
                    }} key={key}>{model.name}<br/></a>
                })}</div>,
            sortable: false
        },
        {
            name: 'Actions',
            selector: '',
            cell: row => <a href={"/admin/quiz/" + row.id + "/take"}>{row.title}</a>,
            sortable: false
        },
    ];

    useEffect(() => {
        const getData = async () => {
            await axios.get('/api/quizzes').then((response) => {
                setData(response.data)
            });
        }
        getData();
    }, []);

    return (
        <div>
            <Button color="primary" style={{padding: "10px", marginBottom: "20px"}} onClick={e => {
                history.push("/admin/create-quiz")
            }}>Create Quiz</Button>
            <DataTable
                columns={columns}
                data={data}
            />
        </div>
    );
}

export default Quizzes


import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

function Students() {
    const [students, setStudents] = useState([]);
    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Phone',
            selector: 'phone',
            sortable: false,
        }
    ];
    useEffect(() => {
        const getData = async () => {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            };
            await Axios.get('/api/students',config).then((response) => {
                setStudents(response.data)
            });
        }
        getData();
    }, []);
    return (
        <div>
            <DataTable
                columns={columns}
                data={students}
            />
        </div>
    );
}

export default Students
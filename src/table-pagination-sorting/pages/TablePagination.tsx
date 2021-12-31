import { useEffect, useState } from 'react'
import { Table } from '../components/Table'
import { TBody } from '../components/TBody';
import { THead } from '../components/THead';
import * as data from '../data/data.json'


export const TablePagination = () => {
    const [pag, setPag] = useState({
        totalPages: 0, number: 0, content: [{
            id: 0,
            cedulaRecibe: '',
            cedulaEntrega: '',
            fecha: ''
        }]
    });

    const handleChangePagination = (pageAction: { page: number; order: string; sort: string; }) => {
        setPag(data);
        /*fetch(`http://10.0.57.92:8081/salida/consulta?size=10&${'page=' + pageAction.page + '&order=' + pageAction.order + '&sort=' + pageAction.sort}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNhbGRlcm9uIiwiaWF0IjoxNjQwNjM3MTgwLCJleHAiOjE2NDEyNDE5ODAsIlJvbGVzIjoiVVNFUiJ9.pxk9e9Me5A-KyRFaPW9mJ0S3cfTvt0BDEVv5nzati6g'
            },
            method: 'GET',
        }).then(res => {
            if (!res.ok) {
                if (res.status === 401) {

                }
            }
            return res.json()
        }).then(data => {
            setPag(data);
        }).catch(() => {
        });*/
        
    }
    useEffect(() => {
        handleChangePagination({ page: 0, order: '', sort: '' });
    }, [])

    const titles = [
        {
            title: "Código",
            sort: "id"
        },
        {
            title: "cedula Recibe",
            sort: "cedulaRecibe"
        },
        {
            title: "Cedula Entrega",
            sort: "cedulaEntrega"
        },
        {
            title: "Fecha",
            sort: "fecha"
        }
    ]
    return (
        <div style={{ padding: '20px' }}>
            <Table pagination={pag} onChange={handleChangePagination}>
                <THead data={titles} />
                <TBody>
                    {
                        pag?.content?.map((obj) => <tr key={'tb_' + obj.id}>
                            <td>{obj.id}</td>
                            <td>{obj.cedulaRecibe}</td>
                            <td>{obj.cedulaEntrega}</td>
                            <td>{obj.fecha}</td>
                        </tr>
                        )
                    }
                </TBody>
            </Table>
        </div>
    )
}

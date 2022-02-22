
//import { Table, TBody, THead } from 'paginating-sorting';
import { useState, useEffect } from 'react';
import { Table, TBody, THead } from '../components';
import * as dataJson from '../data/data.json'
import { DataTableProps } from '../interfaces/interfaces';

const data = {
    content: [
        {
            id: 1,
            name: "name1",
            address: {
                city: "ciudad",
                State: "ss",
                Country: "ddd"
            }
        },
        {
            id: 2,
            name: "name2",
            address: {
                city: "city2",
                State: "State2",
                Country: "Country2"
            }
        },
        {
            id: 3,
            name: "name3",
            address: {
                city: "city3",
                State: "State3",
                Country: "Country3"
            }
        },
        {
            id: 4,
            name: "name4",
            address: {
                city: "city4",
                State: "State4",
                Country: "Country4"
            }
        },
    ],
    totalPages: 43,
    totalElements: 422,
    number: 0,
    titles: [
        {
            title: "ID",
            sort: "id"
        },
        {
            title: "Name",
            sort: "name",
        },
        {
            title: "City",
            sort: "city",
            name: "address.city"
        },
        {
            title: "Address",
            sort: "address",
            name: ["address.State", "address.Country"]
        },

    ]
}


const titles1 = [
    {
        title: "ID",
        sort: "id",
    },
    {
        title: "Persona Entrega",
        sort: "personaEntrega.nombre",
        name: ["personaEntrega.nombre", "personaEntrega.apellido"]
    },
    {
        title: "Persona Recibe",
        sort: "cedula",
        name: ["personaRecibe.nombre", "personaRecibe.apellido"]
    },

    {
        title: "Entregado Por",
        sort: "personaEntregado.nombre",
        name: ["personaEntregado.nombre","personaEntregado.apellido"]
    },
    {
        title: "Fecha",
        sort: "fecha"
    },
    {
        title: "Accion",
        name: "action"
    }
]

export const TablePagination = () => {


    const [pag, setPag] = useState({} as DataTableProps);

    const prueba = (b: string) => {
        console.log(b);
    }
    const handleChangePagination = (pageAction: { page: number; order: string; sort: string; }) => {
        console.log(pageAction);
        setPag({...dataJson, number:pageAction.page});
        fetch(`http://10.0.57.92:8081/salida/consulta?size=10&${'page=' + pageAction.page + '&order=' + pageAction.order + '&sort=' + pageAction.sort}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYWNhbGRlcm9uIiwiaWF0IjoxNjQxMjk4MjEzLCJleHAiOjE2NDE5MDMwMTMsIlJvbGVzIjoiVVNFUiJ9.wArMFKFlRoITZTk-XgE-PjMDjfc8uqBLNLyitay30Nk'
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

        });

    }
    useEffect(() => {
        handleChangePagination({ page: 10, sort: "", order: "" });
    }, [])

    const titles = [
        {
            title: "Código",
            sort: "id"
        },
        {
            title: "cedula Recibe",
            sort: "personaRecibe.nombre",
            name: ["personaRecibe.nombre", "personaRecibe.apellido"]
        },
        {
            title: "Persona Entrega",
            sort: "personaEntrega.nombre",
        },
        {
            title: "Fecha",
            sort: "fecha"
        },
        {
            title: "Accion",
            name: "action"
        }
    ]
    return (
        <div style={{ padding: '50px' }}>
            {pag.content && pag.content.length > 0 && <Table
                dataTable={{
                    ...pag,
                    titles,
                    content: pag?.content?.map(ob => ({
                        ...ob,
                        action: <button onClick={() => prueba("dd")}>View</button>
                    })),
                    maxItemsShow: 1
                }}
                onChange={handleChangePagination}
            />}
            <Table dataTable={pag} onChange={handleChangePagination}>
                <THead titles={titles} />
                <TBody content={pag.content}>
                    {
                        pag?.content?.map((obj) => <tr key={'tb_' + obj.id}>
                            <td>{obj.id}</td>
                            <td>{obj.cedulaRecibe}</td>
                            <td>{obj.cedulaEntrega}</td>
                            <td>{obj.fecha}</td>
                            <td>{obj.fecha}</td>
                        </tr>
                        )
                    }
                </TBody>
            </Table>


            {pag && pag.content?.length && <Table
                        dataTable={{
                            ...pag,
                            titles: titles1,
                            content: pag?.content?.map(ob => ({
                                ...ob,
                                action: <button onClick={() => prueba("dd")}>View</button>
                            })),
                        }}
                        onChange={handleChangePagination} />}
        </div >
    )
}
{/* <Table dataTable={pag} onChange={handleChangePagination}>
                <THead titles={titles} />
                <TBody content={pag.content} titles={titles}>
                    {
                        pag?.content?.map((obj) => <tr key={'tb_' + obj.id}>
                            <td>{obj.id}</td>
                            <td>{obj.cedulaRecibe}</td>
                            <td>{obj.cedulaEntrega}</td>
                            <td>{obj.fecha}</td>
                            <td>{obj.fecha}</td>
                        </tr>
                        )
                    }
                </TBody>
            </Table> */}
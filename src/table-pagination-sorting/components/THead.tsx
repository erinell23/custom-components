import { ReactElement, useContext } from "react"
import { TableContext } from "./Table"

interface props {
    data: Array<{ title: string; sort: string; }>,
    children?: ReactElement
}

export const THead = ({ data, children }: props) => {
    const { handeChangePagination, pageAction } = useContext(TableContext);
    const handleSortChange = (sort: string, order: string) => {

        handeChangePagination({ ...pageAction, sort, order });
    }
    return (

        <thead>
            {children
                ? children
                : <tr>
                    {data.map((a, b) => {
                        const order = (a.sort === pageAction.sort ? (pageAction.order === 'ASC' ? 'DESC' : 'ASC') : 'DESC');
                        return <th
                            onClick={() => handleSortChange(a.sort, order)}
                            key={b + '_' + a.title}
                        >{a.title} <span
                            className={`sorting_disabled ${a.sort === pageAction.sort ? (order === 'DESC' ? 'sorting_asc' : 'sorting_desc') : ''}`}
                        ></span></th>
                    })}
                </tr>
            }
        </thead>
    )
}

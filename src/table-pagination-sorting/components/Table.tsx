import { createContext, useState } from 'react';
import { PaginatingAndSortingProps, TableProps } from '../interfaces/interfaces'
import '../styles/pagination.css'
import { Pagination } from './Pagination';

export const TableContext = createContext({} as TableContextProps);
const { Provider } = TableContext;

interface TableContextProps {
    handeChangePagination: (pageAction: PaginatingAndSortingProps) => void
    pageAction: PaginatingAndSortingProps;
}

export const Table = ({ pagination, children, onChange, className, classTable, classPagination }: TableProps) => {
    const [pageAction, setPageAction] = useState({
        page: 0,
        order: '',
        sort: ''
    });
    const handeChangePagination = (pageAction: { page: number; order: string; sort: string; }) => {
        setPageAction(pageAction);
        onChange(pageAction);
    }

    const _pagination = {
        showPagination: true,
        showLastedAndFirst: true,
        maxItemsShow: Math.max(3, pagination.maxItemsShow ? pagination.maxItemsShow : 0),
        ...pagination
    };

    return (
        <Provider value={{ handeChangePagination, pageAction }}>
            <div style={{ border: '1px solid', padding: '.75rem' }} className={className && className}>
                <table className={`table ${classTable && className}`}>
                    {children}
                </table>
                {
                    _pagination.showPagination && <Pagination pagination={_pagination} className={classPagination}/>
                }
            </div>
        </Provider>
    )
}

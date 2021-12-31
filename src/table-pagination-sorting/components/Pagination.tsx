import { useContext, useRef } from 'react';
import { PaginationComponentProps } from '../interfaces/interfaces'
import { TableContext } from './Table';
export const Pagination = ({ pagination }:  PaginationComponentProps) => {

    const { handeChangePagination, pageAction } = useContext(TableContext);

    const items = Math.min(pagination.maxItemsShow ? pagination.maxItemsShow : 3, pagination.totalPages);

    const sum = useRef(pagination.number);

    const handleChangePage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, i: number) => {
        e.preventDefault();

        const verificar = (veri: number) => {
            let confi = veri;
            if (veri + items > pagination.totalPages) {
                confi = verificar(veri - 1);
            }
            return confi;
        }
        
        sum.current = (i >= items - Math.trunc(items / 2) ? verificar(i - Math.trunc(items / 2)) : 0);

        const page = i <= 0 ? 0 : (i >= pagination.totalPages ? pagination.totalPages : i);

        handeChangePagination({...pageAction, page});
    }
    return (
        <div style={{ width: '100%' }}>
            <ul className="pagination">
                {items - Math.trunc(items / 2) <= pageAction.page
                    && <li className='page-item'>
                        <a className='page-link' href='/#'
                            onClick={(e) => handleChangePage(e, 0)}
                        >1...</a>
                    </li>}
                {pagination.showLastedAndFirst
                    && <li className='page-item'>
                        <a className='page-link' href='/#' onClick={(e) => handleChangePage(e, pageAction.page - items)}>{'«'}</a>
                    </li>}
                {pagination.totalPages > 1
                    && <li className='page-item'>
                        <a className='page-link' href='/#' onClick={(e) => handleChangePage(e, pageAction.page - 1)}>{'<'}</a>
                    </li>}
                {Array.apply(null, Array(pagination.maxItemsShow))
                    .map((ob, i) =>
                        i + sum.current <= pagination.totalPages &&
                        <li
                            className='page-item'
                            key={i + '_itPg_' + sum.current}
                        >
                            <a className={`page-link ${pageAction.page === i + sum.current ? 'active' : ''}`}
                                href='/#'
                                onClick={(e) => handleChangePage(e, i + sum.current)}
                            >{i + 1 + sum.current}</a>
                        </li>
                    )}


                {pagination.totalPages > 1
                    && <li className='page-item'>
                        <a className='page-link' href='/#' onClick={(e) => handleChangePage(e, pageAction.page + 1)}>{'>'}</a>
                    </li>}
                {pagination.showLastedAndFirst &&
                    <li className='page-item'>
                        <a className='page-link' href='/#' onClick={(e) => handleChangePage(e, pageAction.page + items)}>{'»'}</a>
                    </li>}
                {pagination.totalPages - Math.trunc(items / 2) > pageAction.page +1
                    && <li className='page-item'>
                        <a className='page-link' href='/#'
                            onClick={(e) => handleChangePage(e, pagination.totalPages-1)}
                        >...{pagination.totalPages}</a>
                    </li>}
            </ul>
        </div>
    )
}

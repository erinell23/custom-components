import { ReactElement } from "react";


export interface TableProps {
    pagination: PaginationProps;
    onChange: (pageAction: PaginatingAndSortingProps) => void;
    children?: ReactElement | ReactElement[];
    className?: string;
    classTable?: string;
    classPagination?: string;
}

export interface PaginationComponentProps {
    pagination: PaginationProps;
    style?: React.CSSProperties;
    className?: string;
}

export interface PaginationProps {
    totalPages: number,
    number: number;
    totalElements?: number;
    showPagination?: boolean;
    showLastedAndFirst?: boolean;
    maxItemsShow?: number;
}



export interface PaginatingAndSortingProps {
    page: number;
    order: string;
    sort: string;
}
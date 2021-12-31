import { ReactElement } from "react"

interface props {
    children?: ReactElement | ReactElement[]
}

export const TBody = ({ children }: props) => {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

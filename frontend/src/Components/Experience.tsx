import { Children, PropsWithChildren } from "react"



function Experience(
    props: Readonly<PropsWithChildren<{}>>
) {

    const { children } = props

    return (
        <p>
            {children}
        </p>
    )
}

export default Experience
import React from "react"

type Props = {

} & React.ComponentProps<"div">

export default function PageComponent({children}: Props) {
    return <div className="p-4">
        {children}
    </div>
}
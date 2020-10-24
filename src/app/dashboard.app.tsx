import React from 'react'

interface IDashboardProps {
    path?: string,
    default?: boolean
}

export function Dashboard({}: IDashboardProps) {
    return (
        <React.Fragment>
            <h1>Dashboard</h1>
            <p>This is a protected Dashboard</p>
        </React.Fragment>
    )
}

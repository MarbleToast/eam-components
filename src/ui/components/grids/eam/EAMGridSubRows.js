import React, { useEffect, useState } from 'react'
import { LinearProgress, TableRow } from '@material-ui/core'

export const DefaultExpandedComponent = ({data, loading, row, tableRowProps, error}) => loading ? (
    <LinearProgress />
) : (
    <div>{error ? JSON.stringify(error) : "!@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"}</div> 
)

const EAMGridSubRows = ({ row, fetchFunction, tableRowProps, ExpandedComponent = DefaultExpandedComponent }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchFunction()
                setData(response.body.data)
            } catch (e) {
                setError(e)
            }

            setLoading(false)
        }

        getData();
    }, [])

    return <ExpandedComponent data={data} loading={loading} row={row} tableRowProps={tableRowProps} error={error} />
}

export default EAMGridSubRows

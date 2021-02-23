import React from "react";

const EAMTableDataAdapter = props => {
    const { gridRequest, fetchData, convertRowData, convertColumnMetadata } = props;
    const [loading, setLoading] = React.useState(true);
    const [requestError, setRequestError] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [columnsMetadata, setColumnsMetadata] = React.useState([]);

    const gridRequestData = React.useMemo(() => gridRequest, [gridRequest])

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await fetchData().catch(() => {
                setLoading(false);
                setRequestError(true);
                return;
            });
            const responseBody = response && response.body;
            if (!responseBody) return;
            setRows(convertRowData(responseBody));
            setColumnsMetadata(convertColumnMetadata(responseBody));
            setLoading(false);
        })();
    }, [gridRequestData]);

    const context = {
        loading,
        requestError,
        rows,
        columnsMetadata
    };

    return props.children(context);
};

export default EAMTableDataAdapter;
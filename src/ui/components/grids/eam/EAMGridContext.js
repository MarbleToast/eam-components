import Axios from "axios";
import React, { useState, createContext, useCallback, useMemo, useEffect } from "react";
import GridWS from "../../eamgrid/lib/GridWS";
import { EAMCellField, EAMFilterField, getRowAsAnObject } from "./utils";
import useEAMGridTableInstance from "./useEAMGridTableInstance";

const createColumns = ({ gridField, cellRenderer}) =>
  (gridField || [])
    .sort((a, b) => a.order - b.order)
    .map((field) => ({
        id: field.name,
        Header: field.label,
        accessor: field.name,
        width: Number(field.width),
        minWidth: 0,
        maxWidth: 99999,
        dataType: field.dataType,
        Filter: EAMFilterField,
        Cell: cellRenderer ? cellRenderer : EAMCellField,
    }));

const processFilters = (filters) => {
    return filters.map(f => {
        const filter = f.value;
        const allowedFilter = Object.keys(filter)
        .filter(key => ['fieldName', 'fieldValue', 'joiner', 'operator'].includes(key))
        .reduce((newFilterObj, key) => ({
            ...newFilterObj,
            [key]: filter[key]
        }), {});
        return allowedFilter
    }).filter(filter => filter.fieldValue !== undefined || filter.fieldValue !== '' || ['IS EMPTY', 'NOT EMPTY'].includes(filter.operator));
}


export const EAMGridContext = createContext();

export const EAMGridContextProvider = (props) => {
    const {
        gridName,
        gridID,
        useNative = true,
        initialRowsPerPage,
        initialFilters,
        initialDataspyID,
        tableInstanceProps,
        onChangeSelectedRows,
        onChangeFilters,
        onChangeSortBy,
        onChangePage,
        onChangeRowsPerPage,
        onChangeDataspy,
        searchOnMount,
        cellRenderer,
        handleError
    } = props;
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedDataspy, setSelectedDataspy] = useState(undefined);
    const [disableFilters, setDisableFilters] = useState(false);
    const [dataspies, setDataspies] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage || 50);
    const [loading, setLoading] = useState(false);
    const [gridResult, setGridResult] = useState({});
    const [gridField, setGridField] = useState();
    const [gridRequest, setGridRequest] = useState({
        gridName,
        gridID,
        useNative,
        dataspyID: initialDataspyID || null,
        countTotal: true,
        includeMetadata: true,
        rowCount: rowsPerPage,
    });
    const [fetchDataCancelToken, setFetchDataCancelToken] = useState();
    const [loadingExportToCSV, setLoadingExportToCSV] = useState(false);

    const columns = useMemo(() => createColumns({ gridField, cellRenderer }), [gridField, cellRenderer]);
    const data = useMemo(() => (gridResult?.row || []).map(getRowAsAnObject), [gridResult.row]);

    const hasUnkownTotalRecords = useMemo(() => (gridResult?.records ?? '').includes('+'), [gridResult]);
    const totalRecords = +(gridResult?.records ?? '').replace('+', '');

    const resetFilters = useMemo(() => (initialFilters || []).map(filter => ({
        id: filter.fieldName,
        value: filter
    })), [initialFilters]);

    const tableInstance = useEAMGridTableInstance({
        columns,
        data,
        initialState: {
            filters: resetFilters
        },
        manualFilters: true,
        manualSortBy: true,
        disableMultiSort: true,
        disableFilters: disableFilters,
        autoResetSortBy: false,
        autoResetFilters: false,
        autoResetSelectedRows: false,
        ...tableInstanceProps
    });

    const {
        state: { sortBy, filters },
        selectedFlatRows,
    } = tableInstance;

    const toggleFilters = useCallback(() => setDisableFilters(!disableFilters), [disableFilters, setDisableFilters]);

    useEffect(() => {
        fetchData({
            ...gridRequest,
            gridFilter: processFilters(resetFilters),
            gridSort: sortBy || [],
            rowCount: searchOnMount ? rowsPerPage : 0
        });
        return () => {
            if (fetchDataCancelToken) {
                fetchDataCancelToken.cancel();
            }
        }
    }, []);

    const fetchData = useCallback(
        (gr) => {
            setLoading(true);
            if (fetchDataCancelToken) {
                fetchDataCancelToken.cancel();
            }
            const newFetchDataCancelToken = Axios.CancelToken.source();
            setFetchDataCancelToken(newFetchDataCancelToken);
            GridWS.getGridData(gr, {
                cancelToken: newFetchDataCancelToken.token,
            }).then(response => {
                const newGridResult = response.body.data;
                if (gr.includeMetadata) {
                    const dataspy = newGridResult.gridDataspy.find(ds => ds.code === newGridResult.dataSpyId);
                    setDataspies(newGridResult.gridDataspy);
                    setSelectedDataspy(dataspy);
                    setGridField(newGridResult.gridField);
                }
                setGridResult(newGridResult);
                setLoading(false);
            }).catch((error) => {
                handleError && handleError(error);
            });
        },
        [fetchDataCancelToken, setFetchDataCancelToken],
    );

    const handleOnSearch = useCallback(
        () => {
            tableInstance.toggleAllRowsSelected(false);
            fetchData(gridRequest);
        },
        [tableInstance, fetchData, gridRequest]
    );

    const handleExportToCSV = useCallback(
        () => {
            setLoadingExportToCSV(true);
            return GridWS.exportDataToCSV(gridRequest).then(result => {
                const hiddenElement = document.createElement("a");
                // utf8BOM used to enable detection of utf-8 encoding by excel when opening the CSV file
                const utf8BOM = "\uFEFF";
                hiddenElement.href = "data:text/csv;charset=UTF-8," + encodeURI(`${utf8BOM}${result.body}`);
                hiddenElement.target = "_blank";
                hiddenElement.download = `exported_data.csv`;
                hiddenElement.click();
            }).finally(() => {
                setLoadingExportToCSV(false);
            });
        },
        []
    );

    useEffect(
        () => {
            const newGridFilters = processFilters(filters);
            if (JSON.stringify(newGridFilters) === JSON.stringify(gridRequest.gridFilter)) return;
            setGridRequest({
                ...gridRequest,
                gridFilter: newGridFilters,
                includeMetadata: false,
            });
            onChangeFilters && onChangeFilters(newGridFilters);
        },
        [filters, gridRequest, onChangeFilters]
    );

    useEffect(
        () => {
            const newGridSort = sortBy.map(sort => ({ sortBy: sort.id, sortType: sort.desc === true ? "DESC" : "ASC" }));
            if (JSON.stringify(newGridSort) === JSON.stringify(gridRequest.gridSort) || (!newGridSort.length && !gridRequest.gridSort)) return;
            const newGridRequest = {
                ...gridRequest,
                gridSort: newGridSort,
                includeMetadata: false,
            };
            setGridRequest(newGridRequest);
            fetchData(newGridRequest);
            onChangeSortBy && onChangeSortBy(sortBy);
        },
        [sortBy, gridRequest, onChangeSortBy, fetchData]
    );

    const handleChangePage = useCallback(
        (page) => {
            setPageIndex(page);
            const newCursorPosition = (page * rowsPerPage) + 1;
            if (newCursorPosition === gridRequest.cursorPosition && gridRequest.rowCount === rowsPerPage) return;
            const newGridRequest = {
                ...gridRequest,
                cursorPosition: newCursorPosition,
                includeMetadata: false,
            };
            tableInstance.toggleAllRowsSelected(false);
            setGridRequest(newGridRequest);
            fetchData(newGridRequest);
            onChangePage && onChangePage(page);
        },
        [fetchData, gridRequest, rowsPerPage, tableInstance, onChangePage]
    );

    const handleChangeRowsPerPage = useCallback(
        (perPage) => {
            setPageIndex(0);
            setRowsPerPage(perPage);
            const newGridRequest = {
                ...gridRequest,
                cursorPosition: 0,
                rowCount: perPage,
                includeMetadata: false,
            };
            tableInstance.toggleAllRowsSelected(false);
            setGridRequest(newGridRequest);
            fetchData(newGridRequest);
            onChangeRowsPerPage && onChangeRowsPerPage(perPage);
        },
        [fetchData, gridRequest, tableInstance, onChangeRowsPerPage]
    );

    const handleDataspyChange = useCallback(
        (dataspy) => {
            if (!dataspy) return;
            setSelectedDataspy(dataspy);
            const newGridRequest = {
                ...gridRequest,
                gridFilter: [],
                gridSort: [],
                dataspyID: dataspy?.code,
                includeMetadata: true,
            };
            tableInstance.toggleAllRowsSelected(false);
            tableInstance.setAllFilters([]);
            tableInstance.setSortBy([]);
            setGridRequest(newGridRequest);
            fetchData(newGridRequest);
            onChangeDataspy && onChangeDataspy(dataspy);
        },
        [fetchData, gridRequest, resetFilters, tableInstance, onChangeDataspy]
    );

    const handleResetFilters = useCallback(
        () => {
            tableInstance.setAllFilters([]);
        },
        [resetFilters, tableInstance],
    )

    useEffect(() => {
        onChangeSelectedRows && onChangeSelectedRows(selectedFlatRows);
    }, [selectedFlatRows, onChangeSelectedRows]);

    const context = {
        columns,
        data,
        dataspies,
        disableFilters,
        loading,
        pageIndex,
        selectedDataspy,
        rowsPerPage,
        setDataspies,
        setDisableFilters,
        setLoading,
        setPageIndex,
        setSelectedDataspy,
        setRowsPerPage,
        handleOnSearch,
        toggleFilters,
        tableInstance,
        handleChangePage,
        handleChangeRowsPerPage,
        handleDataspyChange,
        hasUnkownTotalRecords,
        totalRecords,
        initialFilters,
        handleResetFilters,
        handleExportToCSV,
        loadingExportToCSV,
    };

    return (
        <EAMGridContext.Provider value={context}>
            {props.children}
        </EAMGridContext.Provider>
    );
};

import { TablePaginationConfig } from "antd"

export const handleTableChangeBasic = (config: {
    newPagination: TablePaginationConfig
    oldPagination: TablePaginationConfig
    setPagination: React.Dispatch<React.SetStateAction<TablePaginationConfig>>
    setDataList: React.Dispatch<React.SetStateAction<any>>
}) => {
    console.log("user click page number", config.newPagination)
    config.setPagination(config.newPagination)
    // `dataSource` is useless since `pageSize` changed
    if (config.newPagination.pageSize !== config.oldPagination?.pageSize) {
        config.setDataList([])
    }
}

export const onSearchBasic = (config: {
    newSearch: string
    oldSearch: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    setDataList: React.Dispatch<React.SetStateAction<any>>
}) => {
    config.setSearch(config.newSearch)
    if (config.newSearch !== config.oldSearch) {
        config.setDataList([])
    }
}

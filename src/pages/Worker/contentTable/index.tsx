import { Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import { useHubx } from "../../../hooks/hub";
import { intl } from "../../../hooks/language";
import { Worker } from "../../../models/worker"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { WorkerService } from "../../../services/workerService";
import { Tooltip } from "@mui/material";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../../../hooks/LoadingScreen";

const getColumns = (lang: string, setSelectedWorkerId: React.Dispatch<React.SetStateAction<string>>): GridColDef<Worker>[] => {
    return [
        {
            field: 'title',
            headerName: intl['worker_input_title_label'][lang],
            headerAlign: 'center',
            align: 'center',
            width: 500,
            editable: false,
            renderCell: (params) => {
                return <p style={params.row.active ? {} : {textDecoration: 'line-through', color: 'var(--secondary-color)'}}>{params.value}</p>
            }
        },
        {
            field: 'action',
            headerName: intl['worker_table_action_column'][lang],
            headerAlign: 'center',
            align: 'center',
            width: 100,
            editable: false,
            renderCell: (params) => {
                return <>
                <Tooltip title={intl['delete_worker_tooltip'][lang]}>
                    <Delete 
                        style={params.row.active ? {cursor: 'pointer'} : {textDecoration: 'line-through', color: 'var(--secondary-color)', cursor: 'pointer'}} 
                        onClick={() => setSelectedWorkerId(params.row.id)}
                    />
                </Tooltip>
                    {/* {params.row.active ? <VisibilityOff style={{cursor: 'pointer'}}/> : <Visibility style={{cursor: 'pointer', color: 'var(--secondary-color)'}}/>} */}
                </>
            }
        },
    ]
}

export interface ContentTableProps {
    rows: Worker[]
    refetch: () => void
}
  
export const ContentTable = ({rows, refetch}: ContentTableProps) => {
    const [selectedWorkerId, setSelectedWorkerId] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const {lang, startLoading, stopLoading} = useHubx()

    setTimeout(() => {
        const element = document.getElementsByClassName('MuiTablePagination-selectLabel')?.[0] as HTMLElement
        element.innerHTML = intl['table_total_page_count'][lang]
    }, 25)

    useEffect(() => {
        if (selectedWorkerId) setIsDialogOpen(true)
    }, [selectedWorkerId])

    const handleConfirmDeleteButtonClick = () => {
        startLoading()
        setIsDialogOpen(false)
        WorkerService.deleteWorker(selectedWorkerId).finally(() => {stopLoading()})
        refetch()
    }

    return <>
        <LoadingScreen />
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <div style={{width: '600px'}}>
                <DataGrid
                    rows={rows}
                    columns={getColumns(lang, setSelectedWorkerId)}
                    initialState={{
                        pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    pagination
                />
            </div>
        </div>
        <ConfirmDialog
                message={intl['worker_delete_confirm_dialog'][lang]}
                isOpen={isDialogOpen} 
                setIsOpen={setIsDialogOpen}
                action={handleConfirmDeleteButtonClick}
            />
    </>
}
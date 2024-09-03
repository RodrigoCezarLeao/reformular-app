import { Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import { useHubx } from "../../../hooks/hub";
import { intl } from "../../../language";
import { Worker } from "../../../models/worker"
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { WorkerService } from "../../../services/workerService";

const getColumns = (lang: string, refetch: () => void): GridColDef<Worker>[] => {
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
                    <Delete 
                        style={params.row.active ? {cursor: 'pointer'} : {textDecoration: 'line-through', color: 'var(--secondary-color)', cursor: 'pointer'}} 
                        onClick={() => {
                            WorkerService.deleteWorker(params.row.id)
                            refetch()
                        }}
                    />
                    {params.row.active ? <VisibilityOff style={{cursor: 'pointer'}}/> : <Visibility style={{cursor: 'pointer', color: 'var(--secondary-color)'}}/>}
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
    const {lang} = useHubx()

    return <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <div style={{width: '600px'}}>
            <DataGrid
                rows={rows}
                columns={getColumns(lang, refetch)}
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
}
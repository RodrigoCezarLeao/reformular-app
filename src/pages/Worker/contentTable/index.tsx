import { Delete, Visibility, VisibilityOff } from "@mui/icons-material";
import { useHubx } from "../../../hooks/hub";
import { intl } from "../../../language";
import { Worker } from "../../../models/worker"
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const getColumns = (lang: string): GridColDef<Worker>[] => {
    return [
        {
            field: 'title',
            headerName: intl['worker_input_title_label'][lang],
            headerAlign: 'center',
            align: 'center',
            width: 300,
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
                    <Delete style={params.row.active ? {} : {textDecoration: 'line-through', color: 'var(--secondary-color)', cursor: 'pointer'}} />
                    {params.row.active ? <VisibilityOff style={{cursor: 'pointer'}}/> : <Visibility style={{cursor: 'pointer', color: 'var(--secondary-color)'}}/>}
                </>
            }
        },
    ]
}

const rows: Worker[] = [
    { id: '1', title: 'Snow', active: true},
    { id: '2', title: 'Lannister', active: true },
    { id: '3', title: 'Lannister', active: true },
    { id: '4', title: 'Stark', active: true },
    { id: '5', title: 'Targaryen', active: true },
    { id: '6', title: 'Melisandre',active: true },
    { id: '7', title: 'Clifford', active: true },
    { id: '8', title: 'Frances', active: false },
    { id: '9', title: 'Roxie', active: false },
  ];
  
export const ContentTable = () => {
    const {lang} = useHubx()

    return <DataGrid 
        rows={rows}
        columns={getColumns(lang)}
    />
}
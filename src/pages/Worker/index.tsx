import { useEffect, useState } from "react"
import { ContentTable } from "./contentTable"
import { HeaderForm } from "./headerForm"
import { Worker } from "../../models/worker"
import { WorkerService } from "../../services/workerService"

export const WorkerPage = () => {
    const [workers, setWorkers] = useState<Worker[]>([])

    const refetch = () => {
        WorkerService.getWorkers().then((data) => setWorkers(data))
    }

    useEffect(() => {
        refetch()
    }, [])

    return <div>
        <HeaderForm  workers={workers} setWorkers={setWorkers}/>
        <ContentTable rows={workers} refetch={refetch}/>
    </div>
}
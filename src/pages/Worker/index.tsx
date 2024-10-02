import { useEffect, useState } from "react"
import { ContentTable } from "./contentTable"
import { HeaderForm } from "./headerForm"
import { Worker } from "../../models/worker"
import { WorkerService } from "../../services/workerService"
import { useHubx } from "../../hooks/hub"
import { LoadingScreen } from "../../hooks/LoadingScreen"

export const WorkerPage = () => {
    const [workers, setWorkers] = useState<Worker[]>([])
    
    const {startLoading, stopLoading} = useHubx()

    const refetch = () => {
        startLoading()
        WorkerService.getWorkers()
            .then((data) => setWorkers(data))
            .finally(() => stopLoading())
    }

    useEffect(() => {
        refetch()
    }, [])

    return <>
        <LoadingScreen />
        <div>
            <HeaderForm  workers={workers} setWorkers={setWorkers}/>
            <ContentTable rows={workers} refetch={refetch}/>
        </div>
    </>
}
import { TextField } from "@mui/material"
import { intl } from "../../../language"
import { useHubx } from "../../../hooks/hub"
import { Worker } from "../../../models/worker"
import { FormContainer, HeaderTitle, Hr } from "./style"
import { useState } from "react"
import { ConfirmDialog } from "../../../components/ConfirmDialog"
import { StyledButton } from "../../../globalStyles"
import { WorkerService } from "../../../services/workerService"

export interface HeaderFormProps {
    workers: Worker[]
    setWorkers: React.Dispatch<React.SetStateAction<Worker[]>>
}
  
export const HeaderForm = ({workers, setWorkers}: HeaderFormProps) => {
    const [nameInput, setNameInput] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isToasterOpen, setIsToasterOpen] = useState(false)

    const {lang} = useHubx()
    
    const handleButtonClick = () => {
        if (!workers.find((w) => w.title === nameInput)){
            const newWorker = {
                title: nameInput,
                active: true,
                id: new Date().toISOString(),
            }
            setWorkers((old) => [...old, newWorker])
            WorkerService.addWorker(newWorker)
            setIsDialogOpen(false)
            setNameInput('')
        }else {
            setIsToasterOpen(true)
        }
    }

    return <div>
        <HeaderTitle>{intl['worker_icon_tooltip'][lang]}</HeaderTitle>
        <FormContainer>
            <TextField 
                label={intl['worker_input_title_label'][lang]} 
                value={nameInput} 
                onChange={(event) => setNameInput(event.target.value)}
            />
            <StyledButton 
                variant="contained"
                onClick={() => setIsDialogOpen(true)}
                disabled={!nameInput ?? false}
            >
                {intl['worker_add_button'][lang]}
            </StyledButton>
        </FormContainer>
        <Hr />

        <ConfirmDialog 
            message={intl['worker_insert_confirm_dialog'][lang]}
            isOpen={isDialogOpen} 
            setIsOpen={setIsDialogOpen}
            action={handleButtonClick}
            isToasterOpen={isToasterOpen}
            setIsToasterOpen={setIsDialogOpen}
        />
    </div>
}
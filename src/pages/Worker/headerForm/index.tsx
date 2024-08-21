import { TextField } from "@mui/material"
import { intl } from "../../../language"
import { useHubx } from "../../../hooks/hub"
import { FormContainer, HeaderTitle, Hr, SaveButton } from "./style"
import { useState } from "react"
  
export const HeaderForm = () => {
    const [nameInput, setNameInput] = useState("")
    const {lang} = useHubx()

    return <div>
        <HeaderTitle>{intl['worker_icon_tooltip'][lang]}</HeaderTitle>
        <FormContainer>
            <TextField 
                label={intl['worker_input_title_label'][lang]} 
                value={nameInput} 
                onChange={(event) => setNameInput(event.target.value)}
            />
            <SaveButton variant="contained">{intl['worker_add_button'][lang]}</SaveButton>
        </FormContainer>
        <Hr />
    </div>
}
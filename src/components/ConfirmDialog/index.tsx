import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import { DialogMessage, TitleStyle } from "./style"
import DialogActions from "@mui/material/DialogActions"
import { intl } from "../../hooks/language"
import { useHubx } from "../../hooks/hub"
import { StyledButton } from "../../globalStyles"

export interface ConfirmDialogProps {
    message: string
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    action: () => void    
}

export const ConfirmDialog = ({message, isOpen, setIsOpen, action}: ConfirmDialogProps) => {
    const {lang} = useHubx()

    const closeDialog = () => {
        setIsOpen(false)
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <DialogTitle sx={TitleStyle}>
                Confirmação
            </DialogTitle>
            <DialogMessage>{message}</DialogMessage>
            <DialogActions>
                <StyledButton variant="contained" onClick={closeDialog}>{intl['confirm_dialog_cancel'][lang]}</StyledButton>
                <StyledButton variant="contained" onClick={() => action()}>{intl['confirm_dialog_confirm'][lang]}</StyledButton>
            </DialogActions>
        </Dialog>
    )
}
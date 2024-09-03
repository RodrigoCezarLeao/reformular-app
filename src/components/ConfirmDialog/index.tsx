import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import { DialogMessage, TitleStyle } from "./style"
import DialogActions from "@mui/material/DialogActions"
import { intl } from "../../language"
import { useHubx } from "../../hooks/hub"
import { StyledButton } from "../../globalStyles"
import Snackbar from "@mui/material/Snackbar"

export interface ConfirmDialogProps {
    message: string
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    action: () => void
    isToasterOpen?: boolean
    setIsToasterOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmDialog = ({message, isOpen, setIsOpen, action, isToasterOpen, setIsToasterOpen}: ConfirmDialogProps) => {
    
    const {lang} = useHubx()

    const closeDialog = () => {
        setIsOpen(false)
        if (setIsToasterOpen)
            setIsToasterOpen(false)
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
            <Snackbar
                open={isToasterOpen}
                autoHideDuration={6000}
                onClose={() => { if (setIsToasterOpen) setIsToasterOpen(false) }}
                message={intl['worker_insertion_name_already_exists'][lang]}
            />
        </Dialog>
    )
}
import { Snackbar } from "@mui/material";
import { useHubx } from "../../hooks/hub";


export const MyToaster = () => {
    const { isToasterOpen, message, closeToaster } = useHubx()

    return (
        <Snackbar
            open={isToasterOpen}
            onClose={closeToaster}
            autoHideDuration={5000}
            message={message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            sx={{ 
                '& .MuiSnackbarContent-root': { 
                    backgroundColor: 'var(--primary-color)', 
                    color: '#fff'
                }
            }}
        />
    );
};


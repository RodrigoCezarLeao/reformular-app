import { useHubx } from "../../hooks/hub";
import { IconStyle, LoadingContainer } from "./style"
import PendingIcon from '@mui/icons-material/Pending';

export const LoadingScreen = () => {
    const {isLoading} = useHubx()
    return <>
        {isLoading && (<LoadingContainer>
            <PendingIcon style={IconStyle} />
        </LoadingContainer>)}
    </>
}
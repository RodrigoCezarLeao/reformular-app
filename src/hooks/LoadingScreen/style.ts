import { styled } from "@mui/material";

export const LoadingContainer = styled('div')`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 100;
    background: rgba(0,0,0,.4);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const IconStyle = {
    color: 'white', 
    fontSize: '30pt',
    animation: 'rotate-pulse 2s infinite ease-in-out'
}
import { styled } from "@mui/material";

export const NavBarContainer = styled('div')`
    position: fixed;
    height: 100vh;
    background: var(--primary-color);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50px;
    align-items: center;
    padding-top: 2rem;
    
    & svg {
        cursor: pointer;
        font-size: 25pt;
        color: var(--quinary-color);
        width: 50px;
    }

    & .selected {
        color: var(--primary-color);
        background: var(--quinary-color);
    }
`
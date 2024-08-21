import { Button, styled } from "@mui/material";

export const HeaderTitle = styled('div')`
    background: var(--quinary-color);
    padding: 1rem;
    font-weight: 700;
    font-size: 18pt;
    text-align: center;
`

export const FormContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin: 1rem;

    & .MuiFormControl-root {
        width: 300px;
    }
`

export const SaveButton = styled(Button)`
    background: var(--primary-color);

    :hover {
        background: var(--secondary-color);
    }
`

export const Hr = styled('hr')`
    border: 1px solid var(--senary-color);
`


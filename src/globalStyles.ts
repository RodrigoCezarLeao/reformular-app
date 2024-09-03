import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)`
    background: var(--primary-color);

    :hover {
        background: var(--secondary-color);
    }

    :disabled {
        background: var(--senary-color);
    }
`
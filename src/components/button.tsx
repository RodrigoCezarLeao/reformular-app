import { HUB_EVENTS, useHubx } from "../hooks/hub"
import { intl } from "../language"

export const Button = () => {
    const { lang } = useHubx()
    
    return <button>{intl['button_title'][lang]}</button>
}
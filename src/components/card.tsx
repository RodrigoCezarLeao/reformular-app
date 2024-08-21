import { useHubx } from "../hooks/hub"
import { intl } from "../language"

export const Card = () => {
    const {lang} = useHubx()

    return <div>{intl['card_counter'][lang]}</div>
}
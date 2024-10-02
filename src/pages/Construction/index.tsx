import { useHubx } from "../../hooks/hub"
import { intl } from "../../hooks/language"

export const Construction = () => {
    const {lang} = useHubx()
    return <p>{intl['construction_icon_tooltip'][lang]}</p>
}
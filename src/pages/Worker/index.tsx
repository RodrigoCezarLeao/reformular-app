import { useHubx } from "../../hooks/hub"
import { intl } from "../../language"

export const Worker = () => {
    const {lang} = useHubx()
    return <p>{intl['worker_icon_tooltip'][lang]}</p>
}
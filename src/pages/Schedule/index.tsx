import { useHubx } from "../../hooks/hub"
import { intl } from "../../language"

export const Schedule = () => {
    const {lang} = useHubx()
    return <p>{intl['schedule_icon_tooltip'][lang]}</p>
}
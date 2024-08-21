import pt from '../assets/pt.png'
import en from '../assets/en.png'
import { HUB_EVENTS, useHubx } from '../hooks/hub'

export const LangSwitch = () => {
    const { notify, lang } = useHubx()

    const className = (language: string) => {
        return lang === language ? '' : 'not_selected'
    }
    
    return <div className='langSwitch'>
        <img src={pt} onClick={() => notify(HUB_EVENTS.CHANGE_LANGUAGE_APP_PT)} className={className('pt')}/>
        <img src={en} onClick={() => notify(HUB_EVENTS.CHANGE_LANGUAGE_APP_EN)} className={className('en')}/>
    </div>
}
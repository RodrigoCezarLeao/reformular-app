import { createContext, useContext, useEffect, useState } from "react"

export const HUB_EVENTS = {
    CHANGE_LANGUAGE_APP_PT: 'CHANGE_LANGUAGE_APP_PT',
    CHANGE_LANGUAGE_APP_EN: 'CHANGE_LANGUAGE_APP_EN',
    INCREMENT_COUNTER: 'INCREMENT_COUNTER',
}

export interface EventHub {
    event_id: string
    callback_function: Function
    key?: string
}

export interface Hub2 {
    subscribe: (event: string, callback: Function, key?: string) => void;
    notify: (event: string) => void;
    unsubscribe: (key: string) => void;
    lang: string;
    setLang: (value: string) => void;
}

const ObserverContext = createContext<Hub2 | null>(null);

export const useHub = () => {
    const [events, setEvents] = useState<EventHub[]>([])
    const [lang, setLang] = useState<string>('pt')

    useEffect(() => {
        subscribe(HUB_EVENTS.CHANGE_LANGUAGE_APP_PT, () => setLang('pt'))
        subscribe(HUB_EVENTS.CHANGE_LANGUAGE_APP_EN, () => setLang('en'))
    }, [])

    const subscribe = (event: string, callback: Function, key: string = '') => {
        if (HUB_EVENTS.hasOwnProperty(event)){
            setEvents((prevEvents) => {
                if (!prevEvents.find(evt => evt.event_id === event && evt.callback_function === callback && evt.key === key))
                    return [...prevEvents, {event_id: event, callback_function: callback, key: key}]
    
                return prevEvents
            })
        }
    }

    const notify = (event: string) => {
        if (HUB_EVENTS.hasOwnProperty(event)){
            const filteredEvents = events.filter(evt => evt.event_id === event)
            for (const evt of filteredEvents) {
                evt.callback_function()
            }
        }
    }

    const unsubscribe = (key: string) => {
        const element = events.find(evt => evt.key === key)
        if (element) {
            const newEvents = events.filter((evt) => evt.key !== key)
            setEvents(newEvents)
        }
    }

    return {subscribe, notify, unsubscribe, lang, setLang}
}

export const ObserverProvider = ({ children }: { children: React.ReactNode }) => {
    const observer = useHub();
    return (
        <ObserverContext.Provider value={observer}>
            {children}
        </ObserverContext.Provider>
    );
};

export const useHubx = () => {
    const context = useContext(ObserverContext);
    if (!context) {
        throw new Error('useObserverContext must be used within a ObserverProvider');
    }
    return context;
};
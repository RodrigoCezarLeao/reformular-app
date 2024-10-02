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
    // Observer
    subscribe: (event: string, callback: Function, key?: string) => void;
    notify: (event: string) => void;
    unsubscribe: (key: string) => void;

    // Language
    lang: string;
    setLang: (value: string) => void;

    // Toaster
    openToaster: (message: string) => void;
    closeToaster: () => void;
    message: string;
    isToasterOpen: boolean;

    // Loading
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

const ObserverContext = createContext<Hub2 | null>(null);

export const useHub = () => {
    const [events, setEvents] = useState<EventHub[]>([])
    const [lang, setLang] = useState<string>('pt')
    const [isToasterOpen, setIsToasterOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const openToaster = (message: string) => {
        setMessage(message)
        setIsToasterOpen(true)
    }

    const closeToaster = () => {
        setMessage('')
        setIsToasterOpen(false)
    }

    const startLoading = () => {
        setIsLoading(true)
    }

    const stopLoading = () => {
        setIsLoading(false)
    }

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

    return {subscribe, notify, unsubscribe, lang, setLang, openToaster, closeToaster, 
        message, isToasterOpen, isLoading, startLoading, stopLoading}
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
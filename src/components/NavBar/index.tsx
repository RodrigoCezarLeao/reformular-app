import { CalendarMonth, Construction, Engineering } from "@mui/icons-material"
import { NavBarContainer } from "./style"
import { Tooltip } from "@mui/material"
import { useHubx } from "../../hooks/hub"
import { intl } from "../../hooks/language"
import { Link } from "react-router-dom"
import { useState } from "react"

export const NavBar = () => {
    const {lang} = useHubx()
    const [selectedTab, setSelectedTab] = useState("worker")
    
    const isTabSelected = (tabName: string) => {
        return tabName === selectedTab ? 'selected' : ''
    }

    return <NavBarContainer>
        <Tooltip title={intl['worker_icon_tooltip'][lang]}>
            <Link to="/worker">
                <Engineering onClick={() => setSelectedTab('worker')} className={isTabSelected('worker')}/>
            </Link>
        </Tooltip>
        <Tooltip title={intl['construction_icon_tooltip'][lang]}>
            <Link to="/construction">
                <Construction onClick={() => setSelectedTab('construction')} className={isTabSelected('construction')}/>
            </Link>
        </Tooltip>
        <Tooltip title={intl['schedule_icon_tooltip'][lang]}>
            <Link to="/schedule">
                <CalendarMonth onClick={() => setSelectedTab('schedule')} className={isTabSelected('schedule')}/>
            </Link>
        </Tooltip>
    </NavBarContainer>
}
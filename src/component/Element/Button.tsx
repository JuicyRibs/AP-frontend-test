import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { type } from "os"

interface IButton {
    text?:string
    icon?: IconDefinition 
    onClick?: () => any
    className?: string
    disabled?: boolean
    type?: 'submit' | 'reset' | 'button'; 
}

export const Button = ({text, icon, onClick, className, disabled, type}: IButton) => {
    return (
        <button className={`rounded-xl p-1 flex justify-center gap-3 bg-blue-400 ${className}`} onClick={onClick} disabled={disabled} type={type}>
            {icon && <FontAwesomeIcon icon={icon} />}
            {text}
        </button>
    )
}
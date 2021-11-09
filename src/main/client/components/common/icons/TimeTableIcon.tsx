import Icon from "@ant-design/icons";

const TimeTableSVG = ({ width = '20px', height = '20px' }) => (
    <svg viewBox="0 0 512 512" width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M511.978 38.997h-40.959V0h-30v38.997h-70.006V0h-30v38.997h-70.006V0h-30v38.997H171V0h-30v38.997H70.993V0h-30v38.997H.034v369.708H120.12c16.532 59.505 71.186 103.307 135.886 103.307S375.36 468.21 391.892 408.705h120.086zm-30 30v49.857H30.034V68.997zM256.006 482.012c-61.212 0-111.013-49.8-111.013-111.013s49.8-111.013 111.013-111.013S367.019 309.787 367.019 371s-49.8 111.012-111.013 111.012zm140.8-103.307c.138-2.552.213-5.12.213-7.706 0-77.755-63.258-141.013-141.013-141.013S114.993 293.245 114.993 371c0 2.586.075 5.154.213 7.706H30.034V148.854h451.943v229.852h-85.171z"/>
        <path fill="currentColor" d="M271.006 294.129h-30V386h65.147v-30h-35.147z"/>
    </svg>
)

export const TimeTableIcon = (props) => <Icon component={TimeTableSVG} {...props} />
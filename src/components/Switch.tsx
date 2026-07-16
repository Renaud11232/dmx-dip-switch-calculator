const Switch = ({
    on = false,
    label = "1",
    width = 12,
    onClick,
    switchColor = "#FFF",
    channelColor = "#222",
    bodyColor = "#3768b2",
    labelColor = "#FFF",
    showOnLabel = false,
    direction = "up"
} : {
    on?: boolean,
    label?: number | string,
    width?: number,
    onClick?: () => void,
    switchColor?: string,
    channelColor?: string,
    bodyColor?: string,
    labelColor?: string,
    showOnLabel?: boolean,
    direction?: "up" | "down"
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={width * 4} onClick={onClick}>
            <rect width="100%" height="100%" fill={bodyColor} />
            <rect width="66.67%" height="40%" x="16.67%" y="30%" fill={channelColor} />
            <rect width="66.67%" height="16%" x="16.67%" y={direction === "up" ? (on ? "30%" : "54%") : (on ? "54%" : "30%")} fill={switchColor} />
            <text x="50%" y={direction === "up" ? "92%" : "21%"} fontSize={width * 0.65} fill={labelColor} textAnchor="middle" style={{userSelect: "none"}}>
                {label}
            </text>
            {showOnLabel && (
                <text x="50%" y={direction === "up" ? "21%" : "92%"} fontSize={width * 0.65} fill={labelColor} textAnchor="middle" style={{userSelect: "none"}}>
                    ON
                </text>
            )}
        </svg>
    )
};

export default Switch;
import type React from "react";
import Switch from "./Switch";

const DipSwitch = ({
    switchCount = 8,
    value = 0,
    width = 128,
    mostSignificantBit = "right",
    onValueChange,
    onSwitchClick,
    switchColor,
    channelColor,
    bodyColor,
    labelColor,
    direction
}: {
    switchCount?: number,
    value?: number,
    width?: number,
    mostSignificantBit?: "left" | "right",
    onValueChange?: (value: number) => void,
    onSwitchClick?: (index: number) => void,
    switchColor?: string,
    channelColor?: string,
    bodyColor?: string,
    labelColor?: string,
    direction?: "up" | "down"
}) => {
    const handleValueChange = (index: number) => {
        if (onValueChange) {
            const newValue = value ^ Math.pow(2, index);
            onValueChange(newValue);
        }
    };
    const switchClickHandler = (index: number) => {
        return () => {
            handleValueChange(index);
            if (onSwitchClick) {
                onSwitchClick(index);
            }
        }
    };
    const msbRightIterator = (count: number, fn: (index: number) => void) => {
        for (let i = 0; i < count; i++) {
            fn(i);
        }
    };
    const msbLeftIterator = (count: number, fn: (index: number) => void) => {
        for (let i = count - 1; i >= 0; i--) {
            fn(i);
        }
    };
    const switches: React.JSX.Element[] = [];
    const iterator = mostSignificantBit === "right" ? msbRightIterator : msbLeftIterator;
    iterator(switchCount, i => {
        switches.push(
            <Switch key={i}
                    label={i + 1}
                    onClick={switchClickHandler(i)}
                    on={!!(Math.pow(2, i) & value)}
                    width={width / switchCount}
                    switchColor={switchColor}
                    channelColor={channelColor}
                    bodyColor={bodyColor}
                    labelColor={labelColor}
                    showOnLabel={i === 0}
                    direction={direction} />
        );
    });
    return (
        <div style={{display: "inline-block"}}>
            {switches}
        </div>
    )
};

export default DipSwitch;
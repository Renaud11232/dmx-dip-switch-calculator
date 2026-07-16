import { useMemo, useState } from "react"
import { DipSwitch } from "./components";
import { ActionIcon, Affix, Box, Grid, NumberInput, SegmentedControl, Text, Title, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconInfoCircle, IconMoonStars, IconSun } from "@tabler/icons-react";
import { useLocalStorage } from "@mantine/hooks";

export default function Content() {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const [addressInput, setAddressInput] = useState<string | number>(1);
    const [offset, setOffset] = useLocalStorage<0 | -1>({
        key: "offset",
        defaultValue: 0
    });
    const [direction, setDirection] = useLocalStorage<"up" | "down">({
        key: "direction",
        defaultValue: "up"
    });
    const [mostSignificantBit, setMostSignificantBit] = useLocalStorage<"left" | "right">({
        key: "mostSignificantBit",
        defaultValue: "right"
    });
    const [switchCount, setSwitchCount] = useLocalStorage<9 | 10>({
        key: "switchCount",
        defaultValue: 9
    });
    const dipValue = useMemo(() => {
        if (typeof addressInput === "string") {
            return 0;
        }
        return addressInput + offset;
    }, [addressInput, offset]);
    return (
        <>
            <Box bg={colorScheme === "dark" ? "gray" : "lightgray"} p="4rem 2rem" mb="xl">
                <Title order={1} fw={300} size="3.5rem">DMX512 DIP Switch Calculator</Title>
                <Text fw={300} size="1.25rem">A basic tool to help you correctly configure your DMX fixtures addresses using DIP switches.</Text>
            </Box>
            <Grid>
                <Grid.Col span={{base: 12, xs: 8, sm: 6, md: 4}} offset={{base: 0, xs: 2, sm: 3, md: 4}}>
                    <Box mb="xl" ta="center">
                        <DipSwitch width={290} switchCount={switchCount} value={dipValue} mostSignificantBit={mostSignificantBit} direction={direction} />
                    </Box>
                    <Box>
                        <NumberInput label="DMX Address" value={addressInput} allowDecimal={false} allowNegative={false} onChange={setAddressInput} min={1} max={512}/>
                    </Box>
                    <Box>
                        <Text size="sm" fw={500} mb={3}>Standard</Text>
                        <SegmentedControl value={offset} onChange={setOffset} data={[
                            {
                                value: 0,
                                label: "US"
                            },
                            {
                                value: -1,
                                label: "Euro"
                            }
                        ]} />
                    </Box>
                    <Box>
                        <Text size="sm" fw={500} mb={3}>ON position</Text>
                        <SegmentedControl value={direction} onChange={setDirection} data={[
                            {
                                value: "up",
                                label: "Up"
                            },
                            {
                                value: "down",
                                label: "Down"
                            }
                        ]} />
                    </Box>
                    <Box>
                        <Text size="sm" fw={500} mb={3}>Bit weight order</Text>
                        <SegmentedControl value={mostSignificantBit} onChange={setMostSignificantBit} data={[
                            {
                                value: "right",
                                label: "Increasing"
                            },
                            {
                                value: "left",
                                label: "Decreasing"
                            }
                        ]} />
                    </Box>
                    <Box>
                        <Text size="sm" fw={500} mb={3}>Switch count <Tooltip label="Some manufacturers actually use the 10th switch as a mode selector, only using 9 switches for the address"><IconInfoCircle size={15}/></Tooltip></Text>
                        <SegmentedControl value={switchCount} onChange={setSwitchCount} data={[
                            {
                                value: 9,
                                label: "9"
                            },
                            {
                                value: 10,
                                label: "10"
                            }
                        ]} />
                    </Box>
                </Grid.Col>
                <Grid.Col span={8}>
                </Grid.Col>
            </Grid>
            <Affix position={{bottom: "1rem", right: "1rem"}}>
                <ActionIcon onClick={toggleColorScheme}
                            variant="light"
                            radius="xl"
                            color="gray"
                            size="xl">
                    {colorScheme === "dark" ? <IconSun/> : <IconMoonStars/>}
                </ActionIcon>
            </Affix>
        </>
    )
}
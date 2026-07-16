import { Container, MantineProvider, AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import { useColorScheme } from "@mantine/hooks";
import Content from "./Content";

export default function App() {
    const browserColorScheme = useColorScheme("dark");
    return (
        <MantineProvider defaultColorScheme={browserColorScheme}>
            <AppShell>
                <AppShell.Main>
                    <Container>
                        <Content/>
                    </Container>
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    )
}
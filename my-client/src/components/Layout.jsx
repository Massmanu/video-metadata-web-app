import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    AppShell,
    AppShellHeader,
    AppShellNavbar,
    AppShellMain,
    Box,
    Container,
    Text,
    Anchor,
    Stack,
    Burger,
    Drawer,
    useMantineTheme,
    Button,
    Tooltip,
    Group,
} from '@mantine/core';
import {
    IconHome,
    IconArticle,
    IconPencil,
    IconUser,
    IconLogout,
    IconMenu2,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

export default function Layout() {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const [drawerOpened, setDrawerOpened] = React.useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const links = [
        { to: '/home', label: 'Home', icon: <IconHome size={20} /> },
        { to: '/videos', label: 'All Videos', icon: <IconArticle size={20} /> },
        { to: '/upload', label: 'Upload', icon: <IconPencil size={20} /> },
        { to: '/profile', label: 'Profile', icon: <IconUser size={20} /> },
    ];

    const navLinks = (
        <Stack spacing="lg" align="start">
            {links.map(({ to, label, icon }) => {
                const active = location.pathname === to;
                return (
                    <Box key={to} w="100%">
                        <Anchor
                            component={Link}
                            to={to}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: active ? theme.colors.gray[2] : 'transparent',
                                color: active ? theme.colors.teal[7] : theme.colors.dark[7],
                                fontWeight: 500,
                                textAlign: 'center',
                                '&:hover': {
                                    backgroundColor: theme.colors.gray[1],
                                    color: theme.colors.teal[6],
                                },
                            }}
                            onClick={() => setDrawerOpened(false)}
                        >
                            {icon}
                            {!sidebarCollapsed && label}
                        </Anchor>
                    </Box>
                );
            })}

            <Button
                onClick={handleLogout}
                color="red"
                variant="subtle"
                fullWidth
                leftSection={<IconLogout size={20} />}
                mt="lg"
            >
                {!sidebarCollapsed && "Logout"}
            </Button>
        </Stack>
    );

    return (
        <>
            <AppShell
                padding="md"
                navbar={{
                    width: sidebarCollapsed ? 80 : 220,
                    breakpoint: 'sm',
                    collapsed: { mobile: !drawerOpened, desktop: sidebarCollapsed },
                }}
                header={{ height: 70 }}
            >
                {/* Header */}
                <AppShellHeader
                    px="lg"
                    sx={{
                        backgroundColor: theme.white,
                        borderBottom: `2px solid ${theme.colors.gray[3]}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        size="xl"
                        weight={700}
                        sx={{ color: theme.colors.teal[7], fontFamily: 'Poppins, sans-serif' }}
                    >
                        My Video App
                    </Text>

                    <Group>
                        {!isMobile && (
                            <Tooltip label={sidebarCollapsed ? "Expand" : "Collapse"}>
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    onClick={() => setSidebarCollapsed((prev) => !prev)}
                                    leftSection={<IconMenu2 size={20} />}
                                />
                            </Tooltip>
                        )}
                        {isMobile && (
                            <Burger
                                opened={drawerOpened}
                                onClick={() => setDrawerOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.teal[7]}
                            />
                        )}
                    </Group>
                </AppShellHeader>

                {/* Sidebar */}
                {!isMobile && (
                    <AppShellNavbar
                        p="md"
                        sx={{
                            backgroundColor: theme.white,
                            borderRight: `2px solid ${theme.colors.gray[3]}`,
                        }}
                    >
                        {navLinks}
                    </AppShellNavbar>
                )}

                {/* Main */}
                <AppShellMain>
                    <Container size="lg">
                        <Outlet />
                    </Container>
                </AppShellMain>
            </AppShell>

            {/* Drawer for Mobile */}
            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                size="60%"
                padding="md"
                title="Menu"
                withCloseButton={false}
                overlayProps={{ opacity: 0.5, blur: 4 }}
            >
                {navLinks}
            </Drawer>
        </>
    );
}

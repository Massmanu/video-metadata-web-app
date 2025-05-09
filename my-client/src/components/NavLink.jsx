import React from 'react'
import { NavLink as RRNavLink, useLocation } from 'react-router-dom'
import { UnstyledButton, Text, Group } from '@mantine/core'

export function NavLink({ to, label }) {
    const { pathname } = useLocation()
    const active = pathname === to

    return (
        <RRNavLink to={to} style={{ textDecoration: 'none' }}>
            <UnstyledButton
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px',
                    backgroundColor: active ? '#EEE' : 'transparent',
                    borderRadius: 4,
                }}
            >
                <Group>
                    <Text>{label}</Text>
                </Group>
            </UnstyledButton>
        </RRNavLink>
    )
}

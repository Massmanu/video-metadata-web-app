import React from 'react';
import { Container, Title, Text, Button, Group, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <Container size="sm" style={{ paddingTop: 80, paddingBottom: 80, textAlign: 'center' }}>
            <Stack spacing="xl">
                <Title order={1}>Video Manager</Title>
                <Text size="lg" color="dimmed">
                    Welcome to Video Manager — your all-in-one platform for uploading, organizing, and
                    streaming videos with ease. Create an account or log in to get started!
                </Text>

                <div className="flex gap-6">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                    >
                        Sign In
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="px-6 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 font-semibold hover:bg-white hover:shadow transition"
                    >
                        Register
                    </button>
                </div>
            </Stack>
        </Container>
    );
}

import React from 'react';
import { Title, Text, Button, Group, Container, Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconUpload, IconVideo, IconUser } from '@tabler/icons-react';

export default function HomePage() {
    return (
        <Container size="md" py="xl">
            <Title order={2} mb="md" align="center" sx={{ fontWeight: 700 }}>
                Welcome to Video Manager
            </Title>
            <Text align="center" size="md" color="dimmed" mb="xl">
                Easily upload, manage, and view your video content. Whether you're a creator or viewer, everything is one click away.
            </Text>

            <Group position="center" spacing="xl">
                <Button
                    component={Link}
                    to="/upload"
                    leftSection={<IconUpload size={18} />}
                    size="md"
                    variant="light"
                    color="teal"
                >
                    Upload Video
                </Button>
                <Button
                    component={Link}
                    to="/videos"
                    leftSection={<IconVideo size={18} />}
                    size="md"
                    variant="outline"
                    color="blue"
                >
                    View Videos
                </Button>
                <Button
                    component={Link}
                    to="/profile"
                    leftSection={<IconUser size={18} />}
                    size="md"
                    variant="default"
                >
                    Your Profile
                </Button>
            </Group>

            <Image
                src="https://cdn-icons-png.flaticon.com/512/3208/3208754.png"
                alt="Video Illustration"
                width={200}
                height={200}
                mx="auto"
                mt="xl"
                radius="md"
                withPlaceholder
            />
        </Container>
    );
}

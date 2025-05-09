// src/components/reusableComponents/VideoCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Title,
    Text,
    Button,
    Group,
    Badge,
    Divider,
} from "@mantine/core";

export default function VideoCard({ video, user, onDelete }) {
    const navigate = useNavigate();

    const isUploader = user && video.user?._id === (user._id || user.id);

    return (
        <Card shadow="sm" p="md" radius="md" withBorder mb="lg">
            <Title order={3} mb="xs">{video.title}</Title>
            <Text size="sm" color="dimmed">
                Uploaded on {new Date(video.uploadedAt).toLocaleString()}
            </Text>

            <Group mt="sm">
                <Badge color="teal">{video.user?.username || "Unknown"}</Badge>
                <Text size="sm" color="gray">{video.user?.email}</Text>
            </Group>

            <Divider my="sm" />

            <Text lineClamp={2} mb="sm">
                {video.description || "No description provided."}
            </Text>

            <Group position="apart">
                <Button
                    size="xs"
                    variant="outline"
                    onClick={() => navigate(`/videos/${video._id}`)}
                >
                    More...
                </Button>

                {isUploader && (
                    <Button
                        size="xs"
                        color="red"
                        variant="filled"
                        onClick={() => onDelete(video._id)}
                    >
                        Delete
                    </Button>
                )}
            </Group>
        </Card>
    );
}

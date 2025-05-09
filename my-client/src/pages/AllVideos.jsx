// src/pages/AllVideos.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Button,
    Text,
    Title,
    Grid,
    Container,
    Group,
    Loader,
    Center,
    Modal,
    TextInput,
    Select,
    Pagination,
} from "@mantine/core";

export default function AllVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Pagination & filter state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("uploadedAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const limit = 9;

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const api = import.meta.env.VITE_API_BASE_URL;

    // Fetch videos whenever filters change
    useEffect(() => {
        async function fetchVideos() {
            setLoading(true);
            try {
                const params = new URLSearchParams({ page, limit, sortBy, sortOrder });
                if (search) params.append("search", search);

                const res = await fetch(`${api}/videos?${params.toString()}`);
                const data = await res.json();
                setVideos(data.results || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error("Error fetching videos:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchVideos();
    }, [page, search, sortBy, sortOrder]);

    const handleDelete = async (videoId) => {
        setDeletingId(videoId);
        try {
            const res = await fetch(`${api}/videos/${videoId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete");
            setVideos((prev) => prev.filter((v) => v._id !== videoId));
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            setDeletingId(null);
            setShowModal(false);
        }
    };

    if (loading) {
        return (
            <Center style={{ height: "80vh" }}>
                <Loader />
            </Center>
        );
    }

    return (
        <Container size="lg" py="xl">
            <Title order={2} mb="md">
                All Video Metadata
            </Title>

            {/* Search & Sort Controls */}
            <Group mb="md" spacing="sm">
                <TextInput
                    placeholder="Search by title or description"
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.currentTarget.value);
                    }}
                    style={{ flex: 1 }}
                />
                <Select
                    data={[
                        { value: "uploadedAt", label: "Date" },
                        { value: "title", label: "Title" },
                    ]}
                    value={sortBy}
                    onChange={(val) => {
                        setPage(1);
                        setSortBy(val);
                    }}
                />
                <Select
                    data={[
                        { value: "desc", label: "Newest first" },
                        { value: "asc", label: "Oldest first" },
                    ]}
                    value={sortOrder}
                    onChange={(val) => {
                        setPage(1);
                        setSortOrder(val);
                    }}
                />
            </Group>

            {/* Video Grid */}
            <Grid>
                {videos.map((video) => (
                    <Grid.Col span={4} key={video._id}>
                        <Card shadow="md" padding="lg" radius="md" withBorder>
                            <Title order={4}>{video.title}</Title>
                            <Text size="sm" color="dimmed" mt="xs">
                                {video.description?.substring(0, 100)}...
                            </Text>
                            <Text size="xs" color="gray" mt="xs">
                                Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}
                            </Text>
                            <Text size="xs" color="gray">
                                URL:{" "}
                                <a href={video.url} target="_blank" rel="noreferrer">
                                    {video.url}
                                </a>
                            </Text>

                            <Group justify="space-between" mt="md">
                                <Button size="xs" onClick={() => navigate(`/videos/${video._id}`)}>
                                    More...
                                </Button>
                                {user?._id === video.user?._id && (
                                    <Button
                                        size="xs"
                                        color="red"
                                        loading={deletingId === video._id}
                                        onClick={() => {
                                            setShowModal(true);
                                            setDeletingId(video._id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Group>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Pagination */}
            <Group position="center" mt="xl">
                <Pagination page={page} onChange={setPage} total={totalPages} />
            </Group>

            {/* Delete Confirmation Modal */}
            <Modal
                opened={showModal}
                onClose={() => setShowModal(false)}
                title="Confirm Deletion"
                centered
            >
                <Text>Are you sure you want to delete this video metadata?</Text>
                <Group mt="md" position="right">
                    <Button variant="default" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={() => handleDelete(deletingId)}>
                        Delete
                    </Button>
                </Group>
            </Modal>
        </Container>
    );
}

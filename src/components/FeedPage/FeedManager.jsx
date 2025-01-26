import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeed, updateFeed, getAllFeedbyUser, deleteFeet } from "../../services/operations/feedApi";
import { useNavigate } from "react-router-dom";

const FeedManager = () => {
    const [feeds, setFeeds] = useState([]);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentFeedId, setCurrentFeedId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const { token,userData } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeeds = async () => {
            const fetchedFeeds = await dispatch(getAllFeedbyUser(token));
            setFeeds(fetchedFeeds.data);
        };
        fetchFeeds();
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        if (editMode) {
            await updateFeed(title,{ id: currentFeedId }, token);
            setEditMode(false);
            setCurrentFeedId(null);
        } else {
            await createFeed(formData, token);
        }

        setTitle("");
        setImage(null);
        const updatedFeeds = await dispatch(getAllFeed());
        setFeeds(updatedFeeds.data);
    };

    const handleEdit = (feed) => {
        setTitle(feed.title);
        setImage(feed.image);
        setEditMode(true);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditMode(false);
        setCurrentFeedId(null);
        setTitle("");
    };

    const handleDelete = async (id) => {
        await dispatch(deleteFeet(id, token, navigate));
        const updatedFeeds = await dispatch(getAllFeed());
        setFeeds(updatedFeeds.data);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Feed Manager</h1>
            <form onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-8">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Enter feed title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {editMode ? "Update Feed" : "Add Feed"}
                </button>
            </form>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Feed List</h2>
                <ul className="space-y-4">
                    {feeds.map((feed) => (
                        <li
                            key={feed.id}
                            className="bg-white p-4 rounded-lg shadow-md border flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-lg font-medium">{feed.title}</h3>
                                <img
                                    src={feed.image}
                                    alt={feed.title}
                                    className="w-32 h-32 object-cover mt-2"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() =>{
                                        handleEdit(feed);
                                        setCurrentFeedId(feed._id);
                                    }}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(feed._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Edit Feed</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="Update feed title"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Image</label>
                            <img
                                src={image}
                                alt="Feed"
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleModalClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    await dispatch(updateFeed(title,currentFeedId, token));
                                    setIsModalOpen(false);
                                    const updatedFeeds = await dispatch(getAllFeed());
                                    setFeeds(updatedFeeds.data);
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedManager;
import React from "react";

export default function SearchInput({ value, onChange }) {
    return (
        <input
            type="text"
            placeholder="Search posts by title, content, or author..."
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    );
}

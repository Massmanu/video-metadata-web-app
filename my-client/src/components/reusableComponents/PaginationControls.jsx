import React from "react";

export default function PaginationControls({ page, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center mt-8 gap-4">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-lg font-medium">Page {page} of {totalPages}</span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}

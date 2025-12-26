import React from "react";

interface EmptyStateProps {
    message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
    <div className="empty-state">
        {message || "No search has been conducted yet."}
    </div>
);

export default EmptyState;

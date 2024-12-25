import React from "react";

const ModelSelector = ({ models, selectedModel, onModelChange }) => {
    return (
        <div className="mb-4">
            <select
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-md"
            >
                <option value="">Select a Model</option>
                {models.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModelSelector;

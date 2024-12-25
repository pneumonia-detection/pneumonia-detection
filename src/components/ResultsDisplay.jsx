import React from "react";

const ResultsDisplay = ({ results }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Model Prediction Results</h3>
            <p className="text-lg mb-4">Prediction: {results.prediction}</p>
            {results.imageUrl && (
                <div>
                    <h3 className={"font-semibold mb-2"}>Grad-CAM (Gradient-weighted Class Activation Mapping)</h3>

                    <img
                        src={results.imageUrl}
                        alt="Prediction with Heatmap"
                        className="rounded-lg shadow-md w-full"
                    />
                </div>
            )}
        </div>
    );
};

export default ResultsDisplay;

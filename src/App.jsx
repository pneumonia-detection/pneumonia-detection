import React, { useState, useEffect } from "react";
import ModelSelector from "./components/ModelSelector";
import ImageUploader from "./components/ImageUploader";
import ResultsDisplay from "./components/ResultsDisplay";

const App = () => {
    const [fineTunedModels, setFineTunedModels] = useState([]);
    const [stackingModels, setStackingModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [modelType, setModelType] = useState(""); // "fine_tuned" or "stacking"
    const [uploadedImage, setUploadedImage] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false); // Track loading state

    useEffect(() => {
        // Fetch the list of models from the backend
        fetch("http://localhost:5000/models")
            .then((response) => response.json())
            .then((data) => {
                setFineTunedModels(data.fine_tuned);
                setStackingModels(data.stacking);
            })
            .catch((error) => console.error("Error fetching models:", error));
    }, []);

    const handleModelChange = (model, type) => {
        setSelectedModel(model);
        setModelType(type);
    };

    const handleImageUpload = (image) => {
        setUploadedImage(image);
    };

    const handlePredict = () => {
        if (!uploadedImage || !selectedModel) {
            alert("Please select a model and upload an image.");
            return;
        }

        setLoading(true); // Start loading
        setResults(null); // Clear previous results

        const formData = new FormData();
        formData.append("file", uploadedImage);
        formData.append("model", selectedModel);

        const endpoint =
            modelType === "stacking"
                ? "http://localhost:5000/predict-stacking"
                : "http://localhost:5000/predict";

        fetch(endpoint, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setResults({
                    prediction: data.prediction,
                    imageUrl: data.image, // Base64 encoded image for fine-tuned models
                });
            })
            .catch((error) => console.error("Error making prediction:", error))
            .finally(() => setLoading(false)); // End loading
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Pneumonia Detection</h1>
            <div className="space-y-6">
                <div className={"flex"}>
                    <div className={"w-1/2 mr-2"}>
                        <h2 className="text-xl font-semibold mb-2">Fine-Tuned Models</h2>
                        <ModelSelector
                            models={fineTunedModels}
                            selectedModel={selectedModel}
                            onModelChange={(model) => handleModelChange(model, "fine_tuned")}
                        />
                    </div>
                    <div className={"w-1/2 ml-2"}>
                        <h2 className="text-xl font-semibold mb-2">Stacking Models</h2>
                        <ModelSelector
                            models={stackingModels}
                            selectedModel={selectedModel}
                            onModelChange={(model) => handleModelChange(model, "stacking")}
                        />
                    </div>
                </div>

                <div className={"flex w-full"}>
                    <div className={"w-1/2 mr-2"}>
                        <ImageUploader onImageUpload={handleImageUpload}/>
                    </div>
                    <div className={"w-1/2 ml-2"}>
                        {loading && (
                            <div className="flex justify-center mt-6">
                                <div className="loader"></div>
                            </div>
                        )}
                        {results && (
                            <div className="flex flex-col md:flex-row mt-6 gap-6">
                                <div className="w-full">
                                    <ResultsDisplay results={results}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={handlePredict}
                    disabled={!uploadedImage || !selectedModel}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    Predict
                </button>
            </div>
        </div>
    );
};

export default App;

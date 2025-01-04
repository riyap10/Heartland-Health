import React, { useEffect, useRef, useState } from 'react';
import './SymptomChecker.css'; 
import elderlyImage from '../assets/elderly.jpeg';

const SymptomChecker = () => {
    const [recognizer, setRecognizer] = useState(null); //State to hold the recognizer object
    const [classLabels, setClassLabels] = useState([]);
    const [bestPrediction, setBestPrediction] = useState(null);
    const [listening, setListening] = useState(false); //State to track if listening is active
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const labelContainerRef = useRef(null);
    const [isHelpVisible, setIsHelpVisible] = useState(false);

    const URL = 'https://teachablemachine.withgoogle.com/models/IBq-9caN4/';
    const CONFIDENCE_THRESHOLD = 0.75;
    const DEBOUNCE_DELAY = 1000; // 1 second debounce

    // Effect to load model scripts
    useEffect(() => {
        const loadScripts = () => {
            return new Promise((resolve, reject) => {
                const tfScript = document.createElement('script');
                tfScript.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js';
                tfScript.onload = () => {
                    const speechCommandsScript = document.createElement('script');
                    speechCommandsScript.src = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.4.0/dist/speech-commands.min.js';
                    speechCommandsScript.onload = () => resolve();
                    speechCommandsScript.onerror = (error) => {
                        console.error('Error loading Speech Commands script:', error);
                        reject(error);
                    };
                    document.body.appendChild(speechCommandsScript);
                };
                tfScript.onerror = (error) => {
                    console.error('Error loading TensorFlow.js script:', error);
                    reject(error);
                };
                document.body.appendChild(tfScript);
            });
        };

        // Function to load the model
        const loadModel = async () => {
            try {
                await loadScripts();

                const checkpointURL = URL + 'model.json';
                const metadataURL = URL + 'metadata.json';

                const model = speechCommands.create(
                    'BROWSER_FFT',
                    undefined,
                    checkpointURL,
                    metadataURL
                );
                await model.ensureModelLoaded();
                setRecognizer(model);
                setClassLabels(model.wordLabels());
                console.log('Model loaded and recognizer initialized');
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };

        loadModel();
    }, []);

    // Toggle listening state
    const handleToggleListening = () => {
        if (recognizer) {
            if (listening) {
                recognizer.stopListening();
                setListening(false);
                console.log('Stopped listening');
            } else {
                const classLabels = recognizer.wordLabels();
                setClassLabels(classLabels);

                recognizer.listen(result => {
                    const scores = result.scores;
                    const updatedPredictions = classLabels.map((label, index) => ({
                        label,
                        score: scores[index].toFixed(2)
                    }));

                    const highestScore = Math.max(...scores);
                    const highestIndex = scores.indexOf(highestScore);
                    const highestLabel = classLabels[highestIndex];

                    const now = Date.now();
                    if (now - lastUpdateTime >= DEBOUNCE_DELAY) {
                        setBestPrediction({
                            label: highestLabel,
                            confidence: highestScore.toFixed(1) // Round confidence to one decimal place
                        });
                        setLastUpdateTime(now);
                    }

                }, {
                    includeSpectrogram: false, // Disable spectrogram display
                    probabilityThreshold: CONFIDENCE_THRESHOLD,
                    invokeCallbackOnNoiseAndUnknown: true,
                    overlapFactor: 0.50
                });

                setListening(true);
                console.log('Started listening');
            }
        } else {
            console.error('Recognizer is not initialized');
        }
    };

    // Effect to stop listening on component unmount
    useEffect(() => {
        return () => {
            if (recognizer) {
                recognizer.stopListening();
                console.log('Stopped listening on component unmount');
            }
        };
    }, [recognizer]);

    // Toggle help section visibility
    const toggleHelp = () => {
        setIsHelpVisible(!isHelpVisible);
    };

    return (
        <div className="symptom-checker-container">
            <div className="top-section">
                <div className="left-half">
                    <img src={elderlyImage} alt="Elderly person" className="background-image" />
                    <div className="overlay-text">
                        <p>Tell us what's bothering</p>
                        <p className="emphasis">YOU</p>
                    </div>
                </div>
                <div className="right-half">
                    <div className="recommendation-box">
                        <h2>Based on what you told us...</h2>
                        <p className="specialist-text">you should visit a {bestPrediction?.label ?? '...'}.</p>
                        <p className="confidence-text">We are {bestPrediction?.confidence ? `${(bestPrediction.confidence * 100).toFixed(1)}%` : '...%'} confident in this recommendation.</p>
                    </div>
                    <button type="button" onClick={handleToggleListening} className="toggle-button">
                        {listening ? 'Stop Listening' : 'Start Listening'}
                    </button>
                </div>
            </div>

            {/* Help Section */}
            <div className={`help-section ${isHelpVisible ? "visible" : ""}`}>
                <div className="help-content">
                    <h3>How to Use the Symptom Checker</h3>
                    <p>1. Click "Start Listening" to begin recording your symptoms.</p>
                    <p>2. Speak clearly into your microphone.</p>
                    <p>3. When you're done speaking, click "Stop Listening" to get a recommendation.</p>
                    <p>4. Review the suggested specialist based on your input. The recommendation will include the type of specialist and a confidence level to help you make an informed decision.</p>
                    <p>5. To hide this help section, simply click the question mark again.</p>
                </div>
                <button className="toggle-help" onClick={toggleHelp}>?</button>
            </div>
        </div>
    );
};

export default SymptomChecker;

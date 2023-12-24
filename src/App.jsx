import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import copy from 'clipboard-copy';
import { recBtn, microphoneBtn, scanBtn, sendBtn, sentBtn } from "./assets/images";
import './App.css';

const App = () => {
    const [isCopied, setCopy] = useState(false);
    const [editedTranscript, setEditedTranscript] = useState('');

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    useEffect(() => {
        setEditedTranscript(transcript); 
    }, [transcript]);
    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="error">
                Browser does not support Speech Recognition
            </div>
        );
    }

    const handleCopyToText = async () => {
        try {
            await copy(editedTranscript); 
            console.log('Text copied: ', editedTranscript);
            setCopy(true);
            let delayInMilliseconds = 1000; 

            setTimeout(function () {
                setCopy(false);
                
            }, delayInMilliseconds);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStartListening = () => {
        setCopy(false);
        SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
    };

    return (
        <div className="app">
            <div className="title">Speech2Text Converter</div>
            <div className="parag">This Project is for converting audio speech to text and passing it into our web service for processing.</div>
            <div className="line">
                <div className="container">
                    <input
                        type="text"
                        name="text"
                        id="text"
                        value={editedTranscript}
                        onChange={(e) => setEditedTranscript(e.target.value)} 
                    />
                    <button onClick={handleStartListening}><img src={listening ? recBtn : microphoneBtn} alt="rec" /></button>
                    <button><img src={scanBtn} alt="scan" /></button>
                </div>
                <button onClick={handleCopyToText}><img src={isCopied?sentBtn:sendBtn} alt="send"/></button>
            </div>
        </div>
    );
}

export default App;

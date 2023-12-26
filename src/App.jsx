import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import copy from 'clipboard-copy';
import { recBtn, microphoneBtn, scanBtn, sendBtn, sentBtn } from "./assets/images";
import './styles/App.css';
import HoverButton from "./components/hoverButton";
import { speechConvert } from './languages/language';
import GenRes from "./function/genAIClient";

const App = () => {
    const [isCopied, setCopy] = useState(false);
    const [editedTranscript, setEditedTranscript] = useState('');
    const [language, setCurrentLanguage] = useState('english');
    const [audioSrc, setAudioSrc] = useState(null);
    const [textSrc, setTextSrc] = useState('');
    const apiKeyLink = process.env.REACT_APP_API_KEY_LINK;

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

    const handleSubmit = async () => {
        setAudioSrc(null);
        setTextSrc('');
        try {
            setCopy(true);
            await handleTranslateVoice();
            await handleTranslateText();
            await copy(textSrc); 
            console.log('Text copied: ', textSrc);
            resetTranscript();
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
        setAudioSrc(null);
        setTextSrc('');
        SpeechRecognition.startListening({ continuous: true, language: speechConvert[language] });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
    };

    const handleTranslateVoice = async () => {
        try {
            const response = await fetch(`${apiKeyLink}/text/?txt=${editedTranscript}&lang=${language}`);
            const blob = await response.blob();
            setAudioSrc(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTranslateText = async () => {
        try {
            const response = await fetch(`${apiKeyLink}/translate/?txt=${editedTranscript}`);
            const data = await response.json();
            const txt = data.translate;
            console.log(txt);
            await GenRes(txt, setTextSrc );
        }catch(error){
            console.error('Error fetching data: ', error);
        }
    };

    const transCont = {
        display: textSrc===''?'none':'block',
    };

    return (
        <div className="app">
            <div className="title">Speech2Text Converter</div>
            <div className="parag">This Project is for converting audio speech to text and passing it into our web service for processing.</div>
            <div className="translator" style={transCont}>Query Result : {textSrc}</div>
            <div className="allInOne">
                <HoverButton setCurrentLanguage={ setCurrentLanguage} />
                <div className="line">
                    <div className="container">
                        <input
                            type="text"
                            name="text"
                            id="text"
                            value={editedTranscript}
                            onChange={(e) => setEditedTranscript(e.target.value)} 
                        />
                        <button className="inside" onClick={listening?handleStopListening:handleStartListening}><img src={listening ? recBtn : microphoneBtn} alt="rec" /></button>
                        <button className="inside"><img src={scanBtn} alt="scan" /></button>
                    </div>
                    <button className="outside" onClick={handleSubmit}><img src={isCopied?sentBtn:sendBtn} alt="send"/></button>
                </div>
            </div>

            {audioSrc && (
                <div>
                    <audio controls>
                        <source src={audioSrc} type="audio/mp3" />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )}
        </div>
    );
}

export default App;

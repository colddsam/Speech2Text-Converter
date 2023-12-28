import React, { useEffect, useState } from "react";
import '../styles/TextContainer.css';
import GenVis from "../function/genAIVision";
import GenPro from "../function/genAIPro";
import { cancelGif, cancelPng, uploadButton, successPng } from '../assets/images';

const TextContainer = ({setSubmit,textSrc,setGeneratedText,generatedText,setCallModel,callModel }) => {
    
    const [changeCancelButton, setchangeCancelButton] = useState(successPng);
    const [cancelState, setcancelState] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(uploadButton);
    const [file, setFile] = useState('');
    const [extension, setExtension] = useState('jpeg');

    useEffect(() => {
        if (callModel) {
            if (file === '') {
                GenPro(textSrc,setGeneratedText,setSubmit,setCallModel);
            }
            else {
                GenVis(textSrc,extension,file,setGeneratedText,setSubmit,setCallModel);
            }
        }
    })

    

    const inputDisplay = {
        display:'none'
    }

    const buttonClickEvent = () => {
        let inputID = document.getElementById('inputButton');
        inputID.click();
    }

    const handleCancelButton = () => {
        if (cancelState) {
            setFile('');
            setchangeCancelButton(cancelGif)
            setTimeout(() => {
                setchangeCancelButton(successPng)
            }, 500);
            setcancelState(false);
            setUploadedImage(uploadButton);
        }
    }

    const getFileExtension = (filename) => {
        const ext = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
        if (ext === 'jpg') {
            setExtension('jpeg')
        }
        else {
            setExtension(ext);   
        }
    };

    const handleUploadedImage = (e) => {
        const selectedFile = e.target.files[0];
        setUploadedImage(URL.createObjectURL(selectedFile));
        setcancelState(true);
        setchangeCancelButton(cancelPng);
        getFileExtension(selectedFile.name);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                setFile(base64Data);
            };
            reader.readAsDataURL(selectedFile);
        }

    }

    return (
        <div className="translator">
            <div className="imageSection">
                <input type="file" onChange={handleUploadedImage} accept="image/png, image/jpeg, image/webp, image/heic, image/heif" name="image" id="inputButton" style={inputDisplay} />
                <div className="outerImageDiv">
                    <img tabIndex="0" role="button" className="uploadedimage" onClick={buttonClickEvent} src={uploadedImage} alt="uploadImage" />
                </div>
                <div className="cancelButton">
                    <img className="cancel" onClick={handleCancelButton} src={changeCancelButton} alt="cancel" />
                </div>
            </div>
            <div className="result">{generatedText}</div>
        </div>

    )
};

export default TextContainer;
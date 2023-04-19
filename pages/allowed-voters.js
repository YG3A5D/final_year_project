import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import useRouter from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';


//----- INTERNAL IMPORT
import { VotingContext } from '../context/Voter';
import Style from '../styles/allowedVoters.module.css';
//import images from '../assets';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

const allowedVoters = ()=>{
  const[fileUrl, setFileUrl] = useState(null);
  const[formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });
};

const router = useRouter();
const {uploadToIPFS} = useContext(VotingContext);

//---------- VOTERS IMAGE DROP

const onDrop = useCallback(async (acceptedFile)=>{
  const url = await uploadToIPFS(acceptedFile[0]);
  setFileUrl(url);
});

const {getRootProps, getInputProps} = useDropzone({
  onDrop,
  accept: "image/*",
  maxSize: 5000000,
});


//----  JSX Part
 return(
    <div className = {Style.createVoter}>
      <div>
        {fileUrl && (
          <div className = {Style.voterInfo}>
            <img src = {fileUrl} alt="Voter Image" />
            <div className= {Style.voterInfo_paragraph}>
              <p>
               Name: <span>&nbps; {formInput.name} </span>
              </p>
              <p>
                Add: &nbps; <span>{formInput.address.slice(0,20)}</span>
              </p>
              <p>
                Pos: &nbps; <span>{formInput.position}</span>
              </p>
          </div>
          </div>
        )}
      </div>
    </div>
  )

export default allowedVoters;
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import useRouter from 'next/router';
import Image from 'next/image';


//----- INTERNAL IMPORT ------//
import { VotingContext } from '../context/Voter';
import Style from '../styles/allowedVoters.module.css';
import images from '../assets';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

const allowedVoters = ()=> {
  const[fileUrl, setFileUrl] = useState(null);
  const[formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });


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
                <p>Name: <span>&nbps; {formInput.name} </span></p>
                <p>Add: &nbps; <span>{formInput.address.slice(0,20)}</span></p>
                <p> Pos: &nbps; <span>{formInput.position}</span></p>
            </div>
            </div>
          )}

        {!fileUrl && 
          (
              <div className={Style.sideInfo}>
                <div className={Style.sideInfo_box}>
                  <h4> Create candidate for Voting </h4>
                  <p> Decentralized Blockchain Evoting System, provide </p>
                  <p className={Style.sideInfo_para}> Contract Candidate </p>
                </div>
                <div className={Style.car}>
                  { voterArray.map((el,i) => (
                    <div key={i + 1} className={Style.card_box}>
                      <div className={Style.image}>
                        <img src="" alt="Profile Photo"/>
                      </div>
                    <div className={Style.cart_info}>
                      <p> Name </p>
                      <p> Address </p>
                      <p> Details </p>
                    </div>
                </div>
              ))}
              </div>
            </div>
          )}           
        </div>
      <div className={Style.voter}>
        <div className={Style.voter_container}>
          <h1>Create New Voter</h1>
          <div className={Style.voter_container_box}>
            <div className={Style.voter_container_box_div}>
              <div {...getRootProps()}>
                <input {...getInputProps}/>

                <div className={Style.voter_container_box_div_info}>
                  <p>Upload File: JPG, PNG, GIF, WEBM Max 10MB</p>

                  <div className={Style.voter_container_box_div}>
                    <Image 
                    src={images.creator} 
                    width={150} 
                    height={150} 
                    objectFit='contain' 
                    alt='File upload'/>
                  </div>
                  <p>Drag & Drop File</p>
                  <p>Or Browse Media on your Device</p>
                </div>
              </div>
            </div>
        </div>
      </div>
        <div className={Style.input_container}>
          <Input 
          inputType="text" 
          title="Name" 
          placeholder='Voter AName'
          handleClick={(e) => setFormInput({...formInput, name:e.target.value})}/>
        </div>
        <div className={Style.input_container}>
          <Input 
          inputType="text" 
          title="Address" 
          placeholder='Voter Address'
          handleClick={(e) => setFormInput({...formInput, address:e.target.value})}/>
        </div>
        <div className={Style.input_container}>
          <Input 
          inputType="text" 
          title="Position" 
          placeholder='Voter APosition'
          handleClick={(e) => setFormInput({...formInput, position:e.target.value})}/>

        <div className={Style.button}>
          <Button btnName="Authorized Voter" handleCLick={() => {}}/>
        </div>
      </div>
     </div>
    
    {/*---////////////---*/}
    <div className = {Style.cratedVoter}>
      <div className={Style.createdVoter_info}>
          <Image src={image.creator} alt="User Profile"/>
          <p>Notice For User</p>
          <p>Organizer <span>0x939939..</span></p>
          <p>Only Organizer of the voting contract can create voter for voting election</p>
      </div>
    </div>          
  </div>      
  );
};
export default allowedVoters
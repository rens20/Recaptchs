//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
/**import React, { useState } from 'react';
import "./App.css";
//import docs  from "./docs.jsx"

function App() {

  const [htmlCode, setHtmlCode] = useState `
  <head>
      <title>CodeSyncPH Recaptcha Sample</title>
      <script src="https://recaptcha.codesync.ph/js/CSPHRecaptchaV1.js"></script>
    </head>`;

    const handleHtmlCodeChange = (event) => {
      setHtmlCode(event.target.value);
    };

  return(
    <div>
      <div className="container">
    <h2>CodeSyncPH Recaptcha Integration Guide</h2>
    <p className="text">
    1. Include CodeSyncPH Recaptcha Library
    <span>
    Include the CodeSyncPH Recaptcha library in the `head` section of your HTML document.
    </span>
    </p>
    <textarea
        value={htmlCode}
        onChange={handleHtmlCodeChange}
        rows={10}
        cols={80}
      />
    </div>
    
  );
}
export default App;***/

//import { useState } from 'react';
import  { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {

// regenerate the text
const [captchaText, setCaptchaText] = useState(generateCaptcha());

function generateCaptcha(){
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYNZ9876543210';
  const length = 6;
  let result = ' ';
  for(let i = 0; i<length; i++){
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
useEffect(()=>{
  const intervalId = setInterval(()=>{
    setCaptchaText(generateCaptcha());
  },3000);
  return () => clearInterval(intervalId);
},[]);


  const [htmlCode, setHtmlCode] = useState(`
    
  <head>
      <title>CodeSyncPH Recaptcha Sample</title>
      <script src="https://recaptcha.codesync.ph/js/CSPHRecaptchaV1.js"></script>
    </head>
  `);
  
  const handleHtmlCodeChange  = (event) => {
    setHtmlCode(event.target.value);
  };
const [bodyCode, setBodyCode] = useState(`

<body>
  <form id="captchaForm" action="#" method="POST">
    <div class="csph-recaptcha"></div>
    <br/>
    <input type="submit" value="Submit">
  </form>
</body>
`)
const handleBodyCode = (event) =>{
  setBodyCode(event.target.value);
};



const [scriptCode, setScriptCode] = useState(`
    
<script>
      // API CALLBACK
      async function verifyCaptcha(input) {
        const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
        try {
          const response = await fetch('https://recaptcha.codesync.ph', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': \`Bearer $\{apiKey}\`
            },
            body: \`CSPHrecaptcha=$\{encodeURIComponent(input)}\`,
          });
          const data = await response.json();
          return {
            success: data.status === 'success',
            token: data['ID']
          };
        } catch (err) {
          console.error(err);
          return {
            success: false,
            token: null
          };
        }
      }

      // Form submission
      document.getElementById('captchaForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const captchaInput = document.querySelector('.csph-recaptcha').innerText; // Replace with the actual way to get captcha input
        const verificationResult = await verifyCaptcha(captchaInput);
        if (verificationResult.success) {
          console.log('Captcha verification successful. Token:', verificationResult.token);
          // Add your success handling logic here
        } else {
          console.error('Captcha verification failed. Token:', verificationResult.token);
          // Add your failure handling logic here
        }
      });
    </script>
  `);
  const handleScriptCodeChange = (event) => {
    setScriptCode(event.target.value);
  };

  const handleCopyButtonClick = () => {
    try {
      const textarea = document.getElementById('htmlCodeTextarea');
      if (textarea && textarea.value) {
        textarea.select();
        document.execCommand('copy');
        console.log('Copied to clipboard');
      }
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
    }
  };


  const handleCopy = () => {
    try {
      const textarea = document.getElementById('htmlForm');
      if (textarea && textarea.value) {
        textarea.select();
        document.execCommand('copy');
        console.log('Copied to clipboard');
      }
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
    }
  };

  const handleButtonClick = () => {
    try {
      const textarea = document.getElementById('javascript');
      if (textarea && textarea.value) {
        textarea.select();
        document.execCommand('copy');
        console.log('Copied to clipboard');
      }
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
    }
  };

  return (
    <>
    <div>
      <div className='bords'>
      <input type='text' className='captcha' value={captchaText} readOnly />
    </div>
    <h1>CodeSyncPH Recaptcha Integration</h1>
      <p className='text'>
      1. Include CodeSyncPH Recaptcha Library
      <span>
        <br></br>
      Include the CodeSyncPH Recaptcha library in the `head` section of your HTML document.
      </span>
      </p>
     <div className='btn'>
      <button 
      className='button'
       onClick={handleCopyButtonClick}>Copy
        </button>
      <textarea 
      className='codes'
      id='htmlCodeTextarea'
        value={htmlCode}
        onChange={handleHtmlCodeChange}
        rows={10}
        cols={80}
        readOnly
      />
    </div>
    </div>



    <section className='html-form'>
      <p className='text'>
      2. Add HTML Form
    
      <span>
        <br></br>
        create an HTML Form
      </span>
      </p>
      <div className='btn'>
      <button 
      className='button'
       onClick={handleCopy}>Copy
        </button>
      <textarea 
      id='htmlForm'
       className='codes'
      value={bodyCode}
      onChange={handleBodyCode}
      rows={10}
      cols={80}
      readOnly
      />
      </div>





    </section>
    <section className='javascript'>
      <p className='text'>
      3. Implement JavaScript for Captcha Verification

      <span>
        <br></br>
      Add JavaScript code to handle the captcha verification using the CodeSyncPH API callback.
      </span>
      </p>
      <div className='btn'>
      <button 
      className='button'
       onClick={handleButtonClick}>Copy
        </button>
      <textarea
      id='javascript'
       className='codes'
      value={scriptCode}
      onChange={handleScriptCodeChange}
      rows={10}
      cols={80}
      readOnly
      />
      </div>
    </section>
    <section className='last'>
    <p className='text'>
    4. Customize and Test
    <span>
      <br></br>
      Replace YOUR_API_KEY with your actual CodeSyncPH API key. Customize the form submission logic and integrate it into your application. Test the implementation thoroughly to ensure proper functionality.
    </span>
    </p>
    <div>
      <ul className='albert'>
        - API author Albert 
        <br></br>
        contributed:
        <br></br>
        - Rens  Acuña
        <br></br>
        - jan liby 
      </ul>
    </div>
    </section>
    <footer>
    <p className='footer'>Created by Rens Belga Acuña &copy; 2023. All Rights Reserved.</p>
    </footer>

    </>
  );
}

export default App;


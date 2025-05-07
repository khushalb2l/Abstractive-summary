// // import { useState, useCallback, useEffect } from 'react';
// // import { useDropzone } from 'react-dropzone';
// // import { FiUploadCloud, FiMic, FiStopCircle } from 'react-icons/fi';
// // import * as pdfjs from 'pdfjs-dist/build/pdf';
// // import { Worker } from '@react-pdf-viewer/core';

// // // Configure PDF.js worker
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // const TextSummarizer = () => {
// //   const [text, setText] = useState('');
// //   const [summary, setSummary] = useState('');
// //   const [language, setLanguage] = useState('english');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [pdfLoading, setPdfLoading] = useState(false);
// //   const [recognition, setRecognition] = useState(null);

// //   const languages = [
// //     { value: 'english', label: 'English' },
// //     { value: 'spanish', label: 'Spanish' },
// //     { value: 'french', label: 'French' },
// //     { value: 'german', label: 'German' },
// //   ];

// //   // Initialize speech recognition
// //   useEffect(() => {
// //     if (typeof window !== 'undefined') {
// //       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// //       if (SpeechRecognition) {
// //         const recognizer = new SpeechRecognition();
// //         recognizer.continuous = true;
// //         recognizer.interimResults = true;
// //         recognizer.lang = 'en-US';

// //         recognizer.onresult = (event) => {
// //           const transcript = Array.from(event.results)
// //             .map(result => result[0])
// //             .map(result => result.transcript)
// //             .join('');
// //           setText(prev => prev + ' ' + transcript);
// //         };

// //         recognizer.onerror = (event) => {
// //           setError('Error occurred in recognition: ' + event.error);
// //         };

// //         setRecognition(recognizer);
// //       }
// //     }
// //   }, []);

// //   // PDF handling
// //   const onDrop = useCallback(async (acceptedFiles) => {
// //     const file = acceptedFiles[0];
// //     if (!file) return;

// //     setPdfLoading(true);
// //     try {
// //       const reader = new FileReader();
// //       reader.onload = async (e) => {
// //         const pdf = await pdfjs.getDocument({
// //           data: new Uint8Array(e.target.result),
// //           cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
// //           cMapPacked: true,
// //         }).promise;

// //         let extractedText = '';
// //         for (let i = 1; i <= pdf.numPages; i++) {
// //           const page = await pdf.getPage(i);
// //           const content = await page.getTextContent();
// //           extractedText += content.items.map(item => item.str).join(' ');
// //         }

// //         setText(extractedText);
// //         setPdfLoading(false);
// //       };
// //       reader.readAsArrayBuffer(file);
// //     } catch (err) {
// //       setError('Error reading PDF file');
// //       setPdfLoading(false);
// //     }
// //   }, []);

// //   const { getRootProps, getInputProps } = useDropzone({
// //     onDrop,
// //     accept: {
// //       'application/pdf': ['.pdf']
// //     },
// //     multiple: false
// //   });

// //   // Voice handling
// //   const toggleRecording = () => {
// //     if (!recognition) {
// //       setError('Speech recognition not supported in your browser');
// //       return;
// //     }

// //     if (!isRecording) {
// //       recognition.start();
// //       setIsRecording(true);
// //     } else {
// //       recognition.stop();
// //       setIsRecording(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!text.trim()) {
// //       setError('Please enter some text to summarize');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');

// //     try {
// //       // Simulated API call - Replace with actual API call
// //       await new Promise(resolve => setTimeout(resolve, 1000));
// //       const mockSummary = "This is a mock summary generated based on the input text. In a real implementation, this would be replaced with the actual summary from your API.";
// //       setSummary(mockSummary);
// //     } catch (err) {
// //       setError('An error occurred while generating the summary');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
// //       <div className="min-h-screen bg-gray-50 py-8 px-4">
// //         <div className="max-w-4xl mx-auto">
// //           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
// //             Text Summarizer
// //           </h1>

// //           <form onSubmit={handleSubmit} className="space-y-6 mb-8">
// //             <div className="space-y-4">
// //               <div className="flex gap-4 flex-wrap">
// //                 {/* PDF Upload */}
// //                 <div
// //                   {...getRootProps()}
// //                   className="flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors min-w-[250px]"
// //                 >
// //                   <input {...getInputProps()} />
// //                   <div className="flex flex-col items-center gap-2">
// //                     <FiUploadCloud className="w-8 h-8 text-gray-500" />
// //                     <span className="text-sm text-gray-600">
// //                       {pdfLoading ? 'Processing PDF...' : 'Upload PDF'}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Voice Input */}
// //                 <button
// //                   type="button"
// //                   onClick={toggleRecording}
// //                   className={`flex-1 p-4 rounded-lg transition-colors min-w-[250px] ${
// //                     isRecording
// //                       ? 'bg-red-500 hover:bg-red-600 text-white'
// //                       : 'bg-white border-2 border-gray-300 hover:border-blue-500'
// //                   }`}
// //                   disabled={!recognition}
// //                 >
// //                   <div className="flex flex-col items-center gap-2">
// //                     {isRecording ? (
// //                       <FiStopCircle className="w-8 h-8" />
// //                     ) : (
// //                       <FiMic className="w-8 h-8 text-gray-500" />
// //                     )}
// //                     <span className="text-sm">
// //                       {isRecording ? 'Stop Recording' : 'Start Recording'}
// //                     </span>
// //                   </div>
// //                 </button>
// //               </div>

// //               {/* Text Input */}
// //               <div>
// //                 <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
// //                   Input Text (from PDF/Voice/Manual)
// //                 </label>
// //                 <textarea
// //                   id="text"
// //                   value={text}
// //                   onChange={(e) => setText(e.target.value)}
// //                   className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   placeholder="Enter text, upload PDF, or use voice input..."
// //                   disabled={loading || pdfLoading}
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
// //                   Summary Language
// //                 </label>
// //                 <select
// //                   id="language"
// //                   value={language}
// //                   onChange={(e) => setLanguage(e.target.value)}
// //                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   disabled={loading}
// //                 >
// //                   {languages.map((lang) => (
// //                     <option key={lang.value} value={lang.value}>
// //                       {lang.label}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div className="flex items-end">
// //                 <button
// //                   type="submit"
// //                   disabled={loading || pdfLoading}
// //                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
// //                 >
// //                   {loading ? (
// //                     <span className="flex items-center justify-center">
// //                       <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
// //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
// //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
// //                       </svg>
// //                       Processing...
// //                     </span>
// //                   ) : (
// //                     'Generate Summary'
// //                   )}
// //                 </button>
// //               </div>
// //             </div>

// //             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// //           </form>

// //           {summary && (
// //             <div className="bg-white p-6 rounded-lg shadow-md">
// //               <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
// //               <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </Worker>
// //   );
// // };

// // export default TextSummarizer;

// import { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import { Worker } from '@react-pdf-viewer/core';

// // Configure PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const TextSummarizer = () => {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');
//   const [language, setLanguage] = useState('en-US');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [synth, setSynth] = useState(null);
//   const [audioSupported, setAudioSupported] = useState(true);

//   const languages = [
//     { value: 'en-US', label: 'English' },
//     { value: 'es-ES', label: 'Spanish' },
//     { value: 'fr-FR', label: 'French' },
//     { value: 'de-DE', label: 'German' },
//   ];

//   // Check speech synthesis support
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       if ('speechSynthesis' in window) {
//         setSynth(window.speechSynthesis);
//       } else {
//         setAudioSupported(false);
//       }
//     }
//   }, []);

//   // Initialize speech recognition
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognizer = new SpeechRecognition();
//         recognizer.continuous = true;
//         recognizer.interimResults = true;
//         recognizer.lang = 'en-US';

//         recognizer.onresult = (event) => {
//           const transcript = Array.from(event.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('');
//           setText(prev => prev + ' ' + transcript);
//         };

//         recognizer.onerror = (event) => {
//           setError('Error occurred in recognition: ' + event.error);
//         };

//         setRecognition(recognizer);
//       }
//     }
//   }, []);

//   // PDF handling
//   const onDrop = useCallback(async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     setPdfLoading(true);
//     try {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const pdf = await pdfjs.getDocument({
//           data: new Uint8Array(e.target.result),
//           cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//           cMapPacked: true,
//         }).promise;

//         let extractedText = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           extractedText += content.items.map(item => item.str).join(' ');
//         }

//         setText(extractedText);
//         setPdfLoading(false);
//       };
//       reader.readAsArrayBuffer(file);
//     } catch (err) {
//       setError('Error reading PDF file');
//       setPdfLoading(false);
//     }
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf']
//     },
//     multiple: false
//   });

//   // Voice handling
//   const toggleRecording = () => {
//     if (!recognition) {
//       setError('Speech recognition not supported in your browser');
//       return;
//     }

//     if (!isRecording) {
//       recognition.start();
//       setIsRecording(true);
//     } else {
//       recognition.stop();
//       setIsRecording(false);
//     }
//   };

//   // Text-to-speech handler
//   const handleTextToSpeech = () => {
//     if (!audioSupported) {
//       setError('Text-to-speech not supported in your browser');
//       return;
//     }

//     if (isSpeaking) {
//       synth.cancel();
//       setIsSpeaking(false);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(summary);
//       utterance.lang = language;
//       utterance.onend = () => setIsSpeaking(false);
//       utterance.onerror = () => setIsSpeaking(false);
//       synth.speak(utterance);
//       setIsSpeaking(true);
//     }
//   };

//   // Stop speech when component unmounts
//   useEffect(() => {
//     return () => {
//       if (synth && synth.speaking) {
//         synth.cancel();
//       }
//     };
//   }, [synth]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       setError('Please enter some text to summarize');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       // Simulated API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const mockSummary = "This is a comprehensive mock summary generated based on the input text. In a production environment, this would be replaced with an actual AI-generated summary from your backend API service. The summary would condense the key points while maintaining contextual accuracy and readability.";
//       setSummary(mockSummary);
//     } catch (err) {
//       setError('An error occurred while generating the summary');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
//       <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//             Text Summarizer
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-6 mb-8">
//             <div className="space-y-4">
//               <div className="flex gap-4 flex-wrap">
//                 <div
//                   {...getRootProps()}
//                   className="flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors min-w-[250px]"
//                 >
//                   <input {...getInputProps()} />
//                   <div className="flex flex-col items-center gap-2">
//                     <FiUploadCloud className="w-8 h-8 text-gray-500" />
//                     <span className="text-sm text-gray-600">
//                       {pdfLoading ? 'Processing PDF...' : 'Upload PDF'}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={toggleRecording}
//                   className={`flex-1 p-4 rounded-lg transition-colors min-w-[250px] ${
//                     isRecording
                      // ? 'bg-red-500 hover:bg-red-600 text-white'
//                       : 'bg-white border-2 border-gray-300 hover:border-blue-500'
//                   }`}
//                   disabled={!recognition}
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     {isRecording ? (
//                       <FiStopCircle className="w-8 h-8" />
//                     ) : (
//                       <FiMic className="w-8 h-8 text-gray-500" />
//                     )}
//                     <span className="text-sm">
//                       {isRecording ? 'Stop Recording' : 'Start Recording'}
//                     </span>
//                   </div>
//                 </button>
//               </div>

//               <div>
//                 <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
//                   Input Text (from PDF/Voice/Manual)
//                 </label>
//                 <textarea
//                   id="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter text, upload PDF, or use voice input..."
//                   disabled={loading || pdfLoading}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
//                   Summary Language
//                 </label>
//                 <select
//                   id="language"
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   disabled={loading}
//                 >
//                   {languages.map((lang) => (
//                     <option key={lang.value} value={lang.value}>
//                       {lang.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={loading || pdfLoading}
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     'Generate Summary'
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           </form>

//           {summary && (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
//                 <button
//                   onClick={handleTextToSpeech}
//                   disabled={!audioSupported || !summary}
//                   className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
//                     isSpeaking ? 'text-blue-600' : 'text-gray-600'
//                   } ${!audioSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   title={audioSupported ? (isSpeaking ? 'Stop audio' : 'Play audio') : 'Audio not supported'}
//                 >
//                   {isSpeaking ? (
//                     <FiVolumeX className="w-6 h-6" />
//                   ) : (
//                     <FiVolume2 className="w-6 h-6" />
//                   )}
//                 </button>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </Worker>
//   );
// };

// export default TextSummarizer;



//working code

// import { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import { Worker } from '@react-pdf-viewer/core';
// import axios from 'axios';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const TextSummarizer = () => {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');
//   const [language, setLanguage] = useState('en-US');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [synth, setSynth] = useState(null);
//   const [audioSupported, setAudioSupported] = useState(true);

//   const languages = [
//     { value: 'en-US', label: 'English' },
//     { value: 'hi-IN', label: 'Hindi' },
//     { value: 'fr-FR', label: 'French' },
//     { value: 'de-DE', label: 'German' },
//   ];

//   useEffect(() => {
//     if ('speechSynthesis' in window) {
//       setSynth(window.speechSynthesis);
//     } else {
//       setAudioSupported(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognizer = new SpeechRecognition();
//         recognizer.continuous = true;
//         recognizer.interimResults = true;
//         recognizer.lang = language;
        
//         recognizer.onresult = (event) => {
//           console.log("recording the audio")
//           const transcript = Array.from(event.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('');
//             console.log(transcript);
//             setText(prev => prev + ' ' + transcript);
          
//         };

//         recognizer.onerror = (event) => {
//           setError('Recognition error: ' + event.error);
//         };

//         setRecognition(recognizer);
//       }
//     }
//   }, [language]);

//   const extractPdfText = async (file) => {
//     setPdfLoading(true);
//     try {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const pdf = await pdfjs.getDocument({
//           data: new Uint8Array(e.target.result),
//           cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//           cMapPacked: true,
//         }).promise;

//         let extractedText = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           extractedText += content.items.map(item => item.str).join(' ') + '\n';
//         }
        
//         setText(extractedText);
//         setPdfLoading(false);
//       };
//       reader.readAsArrayBuffer(file);
//     } catch (err) {
//       setError('Error reading PDF file');
//       setPdfLoading(false);
//     }
//   };

//   const onDrop = useCallback(async (acceptedFiles) => {
//     const file = acceptedFiles[0];
//     if (!file) return;
//     await extractPdfText(file);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { 'application/pdf': ['.pdf'] },
//     multiple: false
//   });

//   const toggleRecording = () => {
//     if (!recognition) {
//       setError('Speech recognition not supported');
//       return;
//     }
//     isRecording ? recognition.stop() : recognition.start();
//     setIsRecording(!isRecording);
//   };

//   const handleTextToSpeech = () => {
//     if (!audioSupported) return;
    
//     if (isSpeaking) {
//       synth.cancel();
//     } else {
//       const utterance = new SpeechSynthesisUtterance(summary);
//       utterance.lang = language;
//       utterance.onend = () => setIsSpeaking(false);
//       synth.speak(utterance);
//     }
//     setIsSpeaking(!isSpeaking);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       setError('Please enter some text');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
//     setSummary('');
    
//     try {
//       const response = await axios.post(`${API_URL}/summarize`, {
//         text: text,
//         lang: language
//       });
//       setSummary(response.data.summary);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Summarization failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
//       <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//             Text Summarizer
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-6 mb-8">
//             <div className="space-y-4">
//               <div className="flex gap-4 flex-wrap">
//                 <div
//                   {...getRootProps()}
//                   className={`flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg transition-colors min-w-[250px] ${
//                     isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
//                   }`}
//                 >
//                   <input {...getInputProps()} />
//                   <div className="flex flex-col items-center gap-2">
//                     <FiUploadCloud className="w-8 h-8 text-gray-500" />
//                     <span className="text-sm text-gray-600">
//                       {pdfLoading ? 'Extracting Text...' : 'Upload PDF'}
//                     </span>
//                     {isDragActive && (
//                       <span className="text-sm text-blue-500">Drop PDF here</span>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={toggleRecording}
//                   className={`flex-1 p-4 rounded-lg transition-colors min-w-[250px] ${
//                     isRecording 
//                       ? 'bg-red-500 hover:bg-red-600 text-white'
//                       : 'bg-white border-2 border-gray-300 hover:border-blue-500'
//                   }`}
//                   disabled={!recognition}
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     {isRecording ? (
//                       <FiStopCircle className="w-8 h-8" />
//                     ) : (
//                       <FiMic className="w-8 h-8 text-gray-500" />
//                     )}
//                     <span className="text-sm">
//                       {isRecording ? 'Stop Recording' : 'Start Recording'}
//                     </span>
//                   </div>
//                 </button>
//               </div>

//               <div>
//                 <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
//                   Input Text {pdfLoading && '(Extracting from PDF...)'}
//                 </label>
//                 <textarea
//                   id="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter text, upload PDF, or use voice input..."
//                   disabled={loading || pdfLoading}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
//                   Summary Language
//                 </label>
//                 <select
//                   id="language"
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   disabled={loading}
//                 >
//                   {languages.map((lang) => (
//                     <option key={lang.value} value={lang.value}>
//                       {lang.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={loading || pdfLoading}
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     'Generate Summary'
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           </form>

//           {summary && (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
//                 <button
//                   onClick={handleTextToSpeech}
//                   disabled={!audioSupported}
//                   className={`p-2 rounded-full hover:bg-gray-100 ${
//                     isSpeaking ? 'text-blue-600' : 'text-gray-600'
//                   } ${!audioSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   title={audioSupported ? (isSpeaking ? 'Stop audio' : 'Play audio') : 'Audio not supported'}
//                 >
//                   {isSpeaking ? <FiVolumeX className="w-6 h-6" /> : <FiVolume2 className="w-6 h-6" />}
//                 </button>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </Worker>
//   );
// };

// export default TextSummarizer;




// import { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import { Worker } from '@react-pdf-viewer/core';
// import axios from 'axios';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const TextSummarizer = () => {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');
//   const [language, setLanguage] = useState('en');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [synth, setSynth] = useState(null);
//   const [audioSupported, setAudioSupported] = useState(true);

//   const languages = [
//     { value: 'en', label: 'English', code: 'en-IN' },
//     { value: 'hi', label: 'Hindi', code: 'hi-IN' },
//     { value: 'bn', label: 'Bengali', code: 'bn-IN' },
//     { value: 'ta', label: 'Tamil', code: 'ta-IN' }
//   ];

//   useEffect(() => {
//     if ('speechSynthesis' in window) {
//       setSynth(window.speechSynthesis);
//     } else {
//       setAudioSupported(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognizer = new SpeechRecognition();
//         recognizer.continuous = true;
//         recognizer.interimResults = true;
//         recognizer.lang = languages.find(l => l.value === language)?.code || 'en-IN';

//         recognizer.onresult = (event) => {
//           const transcript = Array.from(event.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('');
//           setText(prev => prev + ' ' + transcript);
//         };

//         recognizer.onerror = (event) => {
//           setError('Recognition error: ' + event.error);
//         };

//         setRecognition(recognizer);
//       }
//     }
//   }, [language]);

//   const extractPdfText = async (file) => {
//     setPdfLoading(true);
//     try {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const pdf = await pdfjs.getDocument({
//           data: new Uint8Array(e.target.result),
//           cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//           cMapPacked: true,
//         }).promise;

//         let extractedText = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           extractedText += content.items.map(item => item.str).join(' ') + '\n';
//         }
        
//         setText(extractedText);
//         setPdfLoading(false);
//       };
//       reader.readAsArrayBuffer(file);
//     } catch (err) {
//       setError('Error reading PDF file');
//       setPdfLoading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: useCallback(async (files) => files[0] && extractPdfText(files[0]), []),
//     accept: { 'application/pdf': ['.pdf'] },
//     multiple: false
//   });

//   const toggleRecording = () => {
//     if (!recognition) {
//       setError('Speech recognition not supported');
//       return;
//     }
//     isRecording ? recognition.stop() : recognition.start();
//     setIsRecording(!isRecording);
//   };

//   const handleTextToSpeech = () => {
//     if (!audioSupported) return;
    
//     const voices = synth.getVoices();
//     const selectedVoice = voices.find(v => v.lang === languages.find(l => l.value === language)?.code);
    
//     if (!selectedVoice) {
//       setError('Voice not available for selected language');
//       return;
//     }

//     if (isSpeaking) {
//       synth.cancel();
//     } else {
//       const utterance = new SpeechSynthesisUtterance(summary);
//       utterance.voice = selectedVoice;
//       utterance.lang = selectedVoice.lang;
//       utterance.onend = () => setIsSpeaking(false);
//       synth.speak(utterance);
//     }
//     setIsSpeaking(!isSpeaking);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       setError('Please enter some text');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
//     setSummary('');
    
//     try {
//       const response = await axios.post(`${API_URL}/summarize`, {
//         text: text,
//         lang: language
//       });
//       setSummary(response.data.summary);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Summarization failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
//       <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//             Text Summarizer
//           </h1>

//           {/* Language Selector */}
//           <div className="mb-8">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Language
//             </label>
//             <select
//               value={language}
//               onChange={(e) => setLanguage(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//             >
//               {languages.map((lang) => (
//                 <option key={lang.value} value={lang.value}>
//                   {lang.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Rest of the form remains same with updated text elements */}
//           {/* ... (previous form elements) ... */}


//           <form onSubmit={handleSubmit} className="space-y-6 mb-8">
//             <div className="space-y-4">
//               <div className="flex gap-4 flex-wrap">
//                 <div
//                   {...getRootProps()}
//                   className={`flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg transition-colors min-w-[250px] ${
//                     isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
//                   }`}
//                 >
//                   <input {...getInputProps()} />
//                   <div className="flex flex-col items-center gap-2">
//                     <FiUploadCloud className="w-8 h-8 text-gray-500" />
//                     <span className="text-sm text-gray-600">
//                       {pdfLoading ? 'Extracting Text...' : 'Upload PDF'}
//                     </span>
//                     {isDragActive && (
//                       <span className="text-sm text-blue-500">Drop PDF here</span>
//                     )}
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={toggleRecording}
//                   className={`flex-1 p-4 rounded-lg transition-colors min-w-[250px] ${
//                     isRecording 
//                       ? 'bg-red-500 hover:bg-red-600 text-white'
//                       : 'bg-white border-2 border-gray-300 hover:border-blue-500'
//                   }`}
//                   disabled={!recognition}
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     {isRecording ? (
//                       <FiStopCircle className="w-8 h-8" />
//                     ) : (
//                       <FiMic className="w-8 h-8 text-gray-500" />
//                     )}
//                     <span className="text-sm">
//                       {isRecording ? 'Stop Recording' : 'Start Recording'}
//                     </span>
//                   </div>
//                 </button>
//               </div>

//               <div>
//                 <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
//                   Input Text {pdfLoading && '(Extracting from PDF...)'}
//                 </label>
//                 <textarea
//                   id="text"
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//                   className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter text, upload PDF, or use voice input..."
//                   disabled={loading || pdfLoading}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
//                   Summary Language
//                 </label>
//                 <select
//                   id="language"
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   disabled={loading}
//                 >
//                   {languages.map((lang) => (
//                     <option key={lang.value} value={lang.value}>
//                       {lang.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-end">
//                 <button
//                   type="submit"
//                   disabled={loading || pdfLoading}
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     'Generate Summary'
//                   )}
//                 </button>
//               </div>
//             </div>

//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           </form>

//           {summary && (
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
//                 <button
//                   onClick={handleTextToSpeech}
//                   className={`p-2 rounded-full hover:bg-gray-100 ${
//                     isSpeaking ? 'text-blue-600' : 'text-gray-600'
//                   }`}
//                 >
//                   {isSpeaking ? <FiVolumeX className="w-6 h-6" /> : <FiVolume2 className="w-6 h-6" />}
//                 </button>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap" style={{ fontFamily: 
//                 language === 'hi' ? 'Noto Sans Devanagari' : 
//                 language === 'bn' ? 'Noto Sans Bengali' :
//                 language === 'ta' ? 'Noto Sans Tamil' : 'inherit'
//               }}>
//                 {summary}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </Worker>
//   );
// };

// export default TextSummarizer;



//with google trans

// // FRONTEND - src/components/TextSummarizer.js
// import { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import { Worker } from '@react-pdf-viewer/core';
// import axios from 'axios';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const TextSummarizer = () => {
//   const [text, setText] = useState('');
//   const [summary, setSummary] = useState('');
//   const [originalSummary, setOriginalSummary] = useState('');
//   const [language, setLanguage] = useState('en');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [pdfLoading, setPdfLoading] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [synth, setSynth] = useState(null);
//   const [audioSupported, setAudioSupported] = useState(true);
//   const [showOriginal, setShowOriginal] = useState(false);

//   const languages = [
//     { value: 'en', label: 'English', code: 'en-US' },
//     { value: 'hi', label: 'Hindi', code: 'hi-IN' },
//     { value: 'bn', label: 'Bengali', code: 'bn-IN' },
//     { value: 'ta', label: 'Tamil', code: 'ta-IN' }
//   ];

//   useEffect(() => {
//     if ('speechSynthesis' in window) {
//       setSynth(window.speechSynthesis);
//       window.speechSynthesis.onvoiceschanged = () => {
//         setSynth(window.speechSynthesis);
//       };
//     } else {
//       setAudioSupported(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognizer = new SpeechRecognition();
//         recognizer.continuous = true;
//         recognizer.interimResults = true;
//         recognizer.lang = languages.find(l => l.value === language)?.code || 'en-US';

//         recognizer.onresult = (event) => {
//           const transcript = Array.from(event.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('');
//           setText(prev => prev + ' ' + transcript);
//         };

//         recognizer.onerror = (event) => {
//           setError('Recognition error: ' + event.error);
//         };

//         setRecognition(recognizer);
//       }
//     }
//   }, [language]);

//   const extractPdfText = async (file) => {
//     setPdfLoading(true);
//     try {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const pdf = await pdfjs.getDocument({
//           data: new Uint8Array(e.target.result),
//           cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//           cMapPacked: true,
//         }).promise;

//         let extractedText = '';
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const content = await page.getTextContent();
//           extractedText += content.items.map(item => item.str).join(' ') + '\n';
//         }
        
//         setText(extractedText);
//         setPdfLoading(false);
//       };
//       reader.readAsArrayBuffer(file);
//     } catch (err) {
//       setError('Error reading PDF file: ' + err.message);
//       setPdfLoading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: useCallback(async (files) => files[0] && extractPdfText(files[0]), []),
//     accept: { 'application/pdf': ['.pdf'] },
//     multiple: false
//   });

//   const toggleRecording = () => {
//     if (!recognition) {
//       setError('Speech recognition not supported in your browser');
//       return;
//     }
//     isRecording ? recognition.stop() : recognition.start();
//     setIsRecording(!isRecording);
//   };

//   const handleTextToSpeech = () => {
//     if (!audioSupported || !synth) {
//       setError('Text-to-speech not supported in your browser');
//       return;
//     }

//     const voices = synth.getVoices();
//     const targetLang = languages.find(l => l.value === language)?.code;
//     const voice = voices.find(v => v.lang === targetLang) || 
//                  voices.find(v => v.lang.startsWith(language)) ||
//                  voices[0]; // Fallback to first available voice

//     if (isSpeaking) {
//       synth.cancel();
//       setIsSpeaking(false);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(summary);
//       utterance.voice = voice;
//       utterance.lang = voice.lang;
//       utterance.onend = () => setIsSpeaking(false);
//       utterance.onerror = () => setIsSpeaking(false);
//       synth.speak(utterance);
//       setIsSpeaking(true);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) {
//       setError('Please enter some text');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
//     setSummary('');
//     setOriginalSummary('');
    
//     try {
//       const response = await axios.post(`${API_URL}/summarize`, {
//         text: text,
//         lang: language
//       }, {
//         timeout: 60000, // Increase timeout for large texts
//       });
      
//       if (response.data.error) throw new Error(response.data.error);
      
//       setSummary(response.data.summary);
//       if (response.data.original && language !== 'en') {
//         setOriginalSummary(response.data.original);
//       }
//     } catch (err) {
//       if (err.response) {
//         if (err.response.status === 413) {
//           setError('Text is too long. Please reduce the size.');
//         } else if (err.response.status === 429) {
//           setError('Too many requests. Please try again later.');
//         } else {
//           setError(`Server error (${err.response.status}): ${err.response.data.error || 'Unknown error'}`);
//         }
//       } else if (err.request) {
//         setError('No response from server. Please check your connection.');
//       } else {
//         setError(err.message || 'Summarization failed');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
//       <div className="min-h-screen bg-gray-50 py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//             Abstractive Text Summarizer
//           </h1>

//           <div className="mb-8 space-y-4">
//             <div className="flex gap-4 items-center">
//               <label className="block text-sm font-medium text-gray-700">
//                 Output Language:
//               </label>
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 disabled={loading}
//               >
//                 {languages.map((lang) => (
//                   <option key={lang.value} value={lang.value}>{lang.label}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex gap-4 flex-wrap">
//               <div
//                 {...getRootProps()}
//                 className={`flex-1 cursor-pointer bg-white p-4 border-2 border-dashed rounded-lg transition-colors ${
//                   isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'
//                 } ${loading || pdfLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 <input {...getInputProps()} disabled={loading || pdfLoading} />
//                 <div className="flex flex-col items-center gap-2">
//                   <FiUploadCloud className="w-8 h-8 text-gray-500" />
//                   <span className="text-sm text-gray-600">
//                     {pdfLoading ? 'Extracting Text...' : 'Upload PDF'}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={toggleRecording}
//                 className={`flex-1 p-4 rounded-lg transition-colors ${
//                   isRecording 
//                     ? 'bg-red-500 hover:bg-red-600 text-white'
//                     : 'bg-white border-2 border-gray-300 hover:border-blue-500'
//                 }`}
//                 disabled={!recognition || loading || pdfLoading}
//               >
//                 <div className="flex flex-col items-center gap-2">
//                   {isRecording ? (
//                     <FiStopCircle className="w-8 h-8" />
//                   ) : (
//                     <FiMic className="w-8 h-8 text-gray-500" />
//                   )}
//                   <span className="text-sm">
//                     {isRecording ? 'Stop Recording' : 'Start Recording'}
//                   </span>
//                 </div>
//               </button>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Input Text {pdfLoading && '(Extracting PDF...)'}
//               </label>
//               <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 className="w-full h-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter text, upload PDF, or use voice input..."
//                 disabled={loading || pdfLoading}
//               />
//             </div>
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={loading || pdfLoading || !text.trim()}
//             className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                 </svg>
//                 Processing...
//               </span>
//             ) : (
//               'Generate Summary'
//             )}
//           </button>

//           {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

//           {summary && (
//             <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Summary ({languages.find(l => l.value === language)?.label})
//                 </h2>
//                 <div className="flex items-center gap-2">
//                   {originalSummary && (
//                     <button
//                       onClick={() => setShowOriginal(!showOriginal)}
//                       className="text-sm text-blue-600 hover:text-blue-800"
//                     >
//                       {showOriginal ? "Hide English" : "Show English"}
//                     </button>
//                   )}
//                   <button
//                     onClick={handleTextToSpeech}
//                     className={`p-2 rounded-full hover:bg-gray-100 ${
//                       isSpeaking ? 'text-blue-600' : 'text-gray-600'
//                     }`}
//                     title={isSpeaking ? 'Stop audio' : 'Play audio'}
//                     disabled={!audioSupported}
//                   >
//                     {isSpeaking ? <FiVolumeX className="w-6 h-6" /> : <FiVolume2 className="w-6 h-6" />}
//                   </button>
//                 </div>
//               </div>
//               <p className="text-gray-700 whitespace-pre-wrap">
//                 {summary}
//               </p>
              
//               {/* Show original English summary if requested */}
//               {showOriginal && originalSummary && (
//                 <div className="mt-4 pt-4 border-t">
//                   <h3 className="text-md font-semibold text-gray-700 mb-2">
//                     Original Summary (English)
//                   </h3>
//                   <p className="text-gray-600 whitespace-pre-wrap text-sm">
//                     {originalSummary}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </Worker>
//   );
// };

// export default TextSummarizer;


// import React, { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX } from 'react-icons/fi';
// import * as pdfjs from 'pdfjs-dist/build/pdf';
// import { Worker } from '@react-pdf-viewer/core';
// import axios from 'axios';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// const TextSummarizer = () => {
//     const [state, setState] = useState({
//         text: '',
//         summary: '',
//         reference: '',
//         language: 'en',
//         length: 'medium',
//         loading: false,
//         error: '',
//         metrics: null,
//         originalSummary: '',
//         showOriginal: false,
//         isRecording: false,
//         audioSupported: true,
//         synth: null,
//         recognition: null
//     });

//     const languages = [
//         { value: 'en', label: 'English', code: 'en-US' },
//         { value: 'hi', label: 'Hindi', code: 'hi-IN' },
//         { value: 'bn', label: 'Bengali', code: 'bn-IN' },
//         { value: 'ta', label: 'Tamil', code: 'ta-IN' }
//     ];

//     const { getRootProps, getInputProps } = useDropzone({
//         onDrop: files => files[0] && handlePdfUpload(files[0]),
//         accept: { 'application/pdf': ['.pdf'] },
//         multiple: false
//     });

//     useEffect(() => {
//         if ('speechSynthesis' in window) {
//             setState(prev => ({ ...prev, synth: window.speechSynthesis }));
//         } else {
//             setState(prev => ({ ...prev, audioSupported: false }));
//         }

//         const setupRecognition = () => {
//             const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//             if (SpeechRecognition) {
//                 const recognition = new SpeechRecognition();
//                 recognition.continuous = true;
//                 recognition.interimResults = true;
//                 recognition.lang = languages.find(l => l.value === state.language)?.code || 'en-US';

//                 recognition.onresult = (event) => {
//                     const transcript = Array.from(event.results)
//                         .map(result => result[0].transcript)
//                         .join(' ');
//                     setState(prev => ({ ...prev, text: prev.text + ' ' + transcript }));
//                 };

//                 setState(prev => ({ ...prev, recognition }));
//             }
//         };
//         setupRecognition();
//     }, [state.language]);

//     const handlePdfUpload = async (file) => {
//         const reader = new FileReader();
//         reader.onload = async (e) => {
//             const pdf = await pdfjs.getDocument({
//                 data: new Uint8Array(e.target.result),
//                 cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
//                 cMapPacked: true,
//             }).promise;
            
//             let text = '';
//             for (let i = 1; i <= pdf.numPages; i++) {
//                 const page = await pdf.getPage(i);
//                 const content = await page.getTextContent();
//                 text += content.items.map(item => item.str).join(' ') + '\n';
//             }
//             setState(prev => ({ ...prev, text: prev.text + text }));
//         };
//         reader.readAsArrayBuffer(file);
//     };

//     const toggleRecording = () => {
//         if (!state.recognition) {
//             setState(prev => ({ ...prev, error: 'Speech recognition not supported' }));
//             return;
//         }
//         state.isRecording ? state.recognition.stop() : state.recognition.start();
//         setState(prev => ({ ...prev, isRecording: !prev.isRecording }));
//     };

//     const handleTextToSpeech = () => {
//         if (!state.audioSupported || !state.synth) return;
        
//         if (state.synth.speaking) {
//             state.synth.cancel();
//             setState(prev => ({ ...prev, isSpeaking: false }));
//         } else {
//             const utterance = new SpeechSynthesisUtterance(state.summary);
//             utterance.voice = state.synth.getVoices().find(v => 
//                 v.lang === languages.find(l => l.value === state.language)?.code
//             );
//             utterance.onend = () => setState(prev => ({ ...prev, isSpeaking: false }));
//             state.synth.speak(utterance);
//             setState(prev => ({ ...prev, isSpeaking: true }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!state.text.trim() || state.text.length < 100) {
//             setState(prev => ({ ...prev, error: 'Minimum 100 characters required' }));
//             return;
//         }
        
//         setState(prev => ({ ...prev, loading: true, error: '' }));
        
//         try {
//             const response = await axios.post(`${API_URL}/summarize`, {
//                 text: state.text,
//                 lang: state.language,
//                 length: state.length,
//                 reference: state.reference
//             });
            
//             setState(prev => ({
//                 ...prev,
//                 summary: response.data.summary,
//                 metrics: response.data.metrics,
//                 originalSummary: response.data.original || '',
//                 loading: false
//             }));
//         } catch (err) {
//             setState(prev => ({
//                 ...prev,
//                 error: err.response?.data?.error || 'An error occurred',
//                 loading: false
//             }));
//         }
//     };

//     return (
//         <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
//             <div className="container mx-auto p-4 max-w-4xl">
//                 <h1 className="text-3xl font-bold text-center mb-8">AI Text Summarizer</h1>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <select 
//                         value={state.language}
//                         onChange={(e) => setState(prev => ({ ...prev, language: e.target.value }))}
//                         className="p-2 border rounded"
//                     >
//                         {languages.map(lang => (
//                             <option key={lang.value} value={lang.value}>{lang.label}</option>
//                         ))}
//                     </select>
                    
//                     <select
//                         value={state.length}
//                         onChange={(e) => setState(prev => ({ ...prev, length: e.target.value }))}
//                         className="p-2 border rounded"
//                     >
//                         <option value="short">Short Summary</option>
//                         <option value="medium">Medium Summary</option>
//                         <option value="long">Long Summary</option>
//                     </select>
//                 </div>

//                 <div className="border-2 border-dashed p-4 mb-4 text-center cursor-pointer" {...getRootProps()}>
//                     <input {...getInputProps()} />
//                     <FiUploadCloud className="mx-auto text-2xl mb-2" />
//                     <p>Upload PDF or drag & drop</p>
//                 </div>

//                 <div className="grid gap-4 mb-6">
//                     <textarea
//                         value={state.text}
//                         onChange={(e) => setState(prev => ({ ...prev, text: e.target.value }))}
//                         placeholder="Enter text to summarize..."
//                         className="w-full h-48 p-2 border rounded"
//                     />
                    
//                     <textarea
//                         value={state.reference}
//                         onChange={(e) => setState(prev => ({ ...prev, reference: e.target.value }))}
//                         placeholder="Reference summary (optional for evaluation)..."
//                         className="w-full h-32 p-2 border rounded"
//                     />
//                 </div>

//                 <div className="flex gap-4 mb-6">
//                     <button
//                         onClick={toggleRecording}
//                         className={`flex items-center gap-2 px-4 py-2 rounded ${
//                             state.isRecording ? 'bg-red-500 text-white' : 'bg-gray-200'
//                         }`}
//                     >
//                         {state.isRecording ? <FiStopCircle /> : <FiMic />}
//                         {state.isRecording ? 'Stop Recording' : 'Voice Input'}
//                     </button>
                    
//                     <button
//                         onClick={handleSubmit}
//                         disabled={state.loading || state.text.length < 100}
//                         className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
//                     >
//                         {state.loading ? 'Processing...' : 'Generate Summary'}
//                     </button>
//                 </div>

//                 {state.error && <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">{state.error}</div>}

//                 {state.summary && (
//                     <div className="bg-white p-6 rounded-lg shadow-lg">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-bold">Summary</h2>
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={handleTextToSpeech}
//                                     className="p-2 hover:bg-gray-100 rounded-full"
//                                 >
//                                     {state.isSpeaking ? <FiVolumeX /> : <FiVolume2 />}
//                                 </button>
//                                 {state.originalSummary && (
//                                     <button
//                                         onClick={() => setState(prev => ({ ...prev, showOriginal: !prev.showOriginal }))}
//                                         className="text-blue-600 hover:text-blue-800"
//                                     >
//                                         {state.showOriginal ? 'Hide Original' : 'Show Original'}
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
                        
//                         <p className="mb-4 whitespace-pre-wrap">{state.summary}</p>
                        
//                         {state.showOriginal && (
//                             <div className="mt-4 pt-4 border-t">
//                                 <p className="text-sm text-gray-600 whitespace-pre-wrap">{state.originalSummary}</p>
//                             </div>
//                         )}

//                         {state.metrics && (
//                             <div className="mt-6 pt-4 border-t">
//                                 <h3 className="text-lg font-bold mb-4">Evaluation Metrics</h3>
                                
//                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//                                     <div className="p-4 bg-blue-50 rounded">
//                                         <p className="font-semibold">Compression</p>
//                                         <p className="text-2xl">{(state.metrics.compression_ratio * 100).toFixed(0)}%</p>
//                                     </div>
//                                     <div className="p-4 bg-green-50 rounded">
//                                         <p className="font-semibold">Readability</p>
//                                         <p className="text-2xl">{state.metrics.readability_score}/100</p>
//                                     </div>
//                                     {state.metrics.rouge_scores && (
//                                         <div className="p-4 bg-purple-50 rounded">
//                                             <p className="font-semibold">ROUGE-L F1</p>
//                                             <p className="text-2xl">
//                                                 {(state.metrics.rouge_scores.rougeL.fmeasure * 100).toFixed(1)}%
//                                             </p>
//                                         </div>
//                                     )}
//                                 </div>

//                                 {state.metrics.rouge_scores && (
//                                     <div className="overflow-x-auto">
//                                         <table className="w-full">
//                                             <thead className="bg-gray-100">
//                                                 <tr>
//                                                     <th className="p-2 text-left">Metric</th>
//                                                     <th className="p-2">Precision</th>
//                                                     <th className="p-2">Recall</th>
//                                                     <th className="p-2">F1 Score</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {Object.entries(state.metrics.rouge_scores).map(([metric, scores]) => (
//                                                     <tr key={metric} className="border-t">
//                                                         <td className="p-2 font-medium">{metric.toUpperCase()}</td>
//                                                         <td className="p-2 text-center">{(scores.precision * 100).toFixed(1)}%</td>
//                                                         <td className="p-2 text-center">{(scores.recall * 100).toFixed(1)}%</td>
//                                                         <td className="p-2 text-center">{(scores.fmeasure * 100).toFixed(1)}%</td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </Worker>
//     );
// };

// export default TextSummarizer;


import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiMic, FiStopCircle, FiVolume2, FiVolumeX, FiMoon, FiSun } from 'react-icons/fi';
import * as pdfjs from 'pdfjs-dist/build/pdf';
import { Worker } from '@react-pdf-viewer/core';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const TextSummarizer = () => {
    const [state, setState] = useState({
        text: '',
        summary: '',
        reference: '',
        language: 'en',
        length: 'medium',
        loading: false,
        error: '',
        metrics: null,
        originalSummary: '',
        showOriginal: false,
        isRecording: false,
        audioSupported: true,
        synth: null,
        recognition: null,
        darkMode: localStorage.getItem('darkMode') === 'true' || false,
        isSpeaking: false,
        currentUtterance: null
    });

    const languages = [
        { value: 'en', label: 'English', code: 'en-US' },
        { value: 'hi', label: 'Hindi', code: 'hi-IN' },
        { value: 'bn', label: 'Bengali', code: 'bn-IN' },
        { value: 'ta', label: 'Tamil', code: 'ta-IN' }
    ];

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: files => files[0] && handlePdfUpload(files[0]),
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    useEffect(() => {
        // Apply dark mode to document body
        if (state.darkMode) {
            document.body.classList.add('bg-gray-900', 'text-white');
        } else {
            document.body.classList.remove('bg-gray-900', 'text-white');
        }
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', state.darkMode);
    }, [state.darkMode]);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            
            // Initialize speech synthesis
            setState(prev => ({ ...prev, synth }));
            
            // Force load voices
            synth.onvoiceschanged = () => {
                const voices = synth.getVoices();
                console.log("Voices loaded:", voices.length);
            };
            
            // Preload voices
            synth.getVoices();
        } else {
            setState(prev => ({ ...prev, audioSupported: false }));
        }

        // Set up speech recognition
        const setupRecognition = () => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = languages.find(l => l.value === state.language)?.code || 'en-US';

                recognition.onresult = (event) => {
                    const transcript = Array.from(event.results)
                        .map(result => result[0].transcript)
                        .join(' ');
                    setState(prev => ({ ...prev, text: prev.text + ' ' + transcript }));
                };

                setState(prev => ({ ...prev, recognition }));
            }
        };
        setupRecognition();

        // Cleanup function to cancel any ongoing speech when component unmounts
        return () => {
            if (state.synth && state.synth.speaking) {
                state.synth.cancel();
            }
        };
    }, [state.language]);

    const handlePdfUpload = async (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const pdf = await pdfjs.getDocument({
                data: new Uint8Array(e.target.result),
                cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
                cMapPacked: true,
            }).promise;
            
            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map(item => item.str).join(' ') + '\n';
            }
            setState(prev => ({ ...prev, text: prev.text + text }));
        };
        reader.readAsArrayBuffer(file);
    };

    const toggleRecording = () => {
        if (!state.recognition) {
            setState(prev => ({ ...prev, error: 'Speech recognition not supported' }));
            return;
        }
        state.isRecording ? state.recognition.stop() : state.recognition.start();
        setState(prev => ({ ...prev, isRecording: !prev.isRecording }));
    };

    // Improved text-to-speech function that handles longer texts better
    const handleTextToSpeech = () => {
        if (!state.audioSupported || !state.synth) {
            setState(prev => ({ ...prev, error: 'Text-to-speech not supported in your browser' }));
            return;
        }
        
        // If currently speaking, stop the speech
        if (state.isSpeaking) {
            state.synth.cancel();
            setState(prev => ({ ...prev, isSpeaking: false, currentUtterance: null }));
            return;
        }
        
        // Split text into manageable chunks to prevent timeouts
        // (around 200 characters per chunk)
        const textToSpeak = state.summary;
        const chunkSize = 200;
        const textChunks = [];
        
        for (let i = 0; i < textToSpeak.length; i += chunkSize) {
            // Find the last space within the chunk to avoid cutting mid-word
            const chunk = textToSpeak.substring(i, i + chunkSize);
            const lastSpace = chunk.lastIndexOf(' ');
            const end = lastSpace > 0 ? i + lastSpace : i + chunk.length;
            
            textChunks.push(textToSpeak.substring(i, end));
            
            // Adjust i to the last space position to avoid overlap
            if (lastSpace > 0) {
                i = end - chunkSize;
            }
        }
        
        // Function to speak the next chunk
        const speakNextChunk = (index = 0) => {
            if (index >= textChunks.length) {
                setState(prev => ({ ...prev, isSpeaking: false, currentUtterance: null }));
                return;
            }
            
            const utterance = new SpeechSynthesisUtterance(textChunks[index]);
            
            // Set the voice based on language
            const voices = state.synth.getVoices();
            const voice = voices.find(v => 
                v.lang === languages.find(l => l.value === state.language)?.code
            );
            
            if (voice) {
                utterance.voice = voice;
            }
            
            utterance.onend = () => {
                // Speak the next chunk when this one finishes
                speakNextChunk(index + 1);
            };
            
            utterance.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                setState(prev => ({ ...prev, isSpeaking: false, currentUtterance: null }));
            };
            
            // Keep track of current utterance
            setState(prev => ({ ...prev, currentUtterance: utterance }));
            
            // Small delay between chunks for better experience
            setTimeout(() => {
                try {
                    state.synth.speak(utterance);
                } catch (e) {
                    console.error('Failed to speak:', e);
                }
            }, 10);
        };
        
        // Start speaking chunks
        setState(prev => ({ ...prev, isSpeaking: true }));
        speakNextChunk();
    };

    const toggleDarkMode = () => {
        setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.text.trim() || state.text.length < 100) {
            setState(prev => ({ ...prev, error: 'Minimum 100 characters required' }));
            return;
        }
        
        setState(prev => ({ ...prev, loading: true, error: '' }));
        
        try {
            const response = await axios.post(`${API_URL}/summarize`, {
                text: state.text,
                lang: state.language,
                length: state.length,
                reference: state.reference
            });
            
            setState(prev => ({
                ...prev,
                summary: response.data.summary,
                metrics: response.data.metrics,
                originalSummary: response.data.original || '',
                loading: false
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err.response?.data?.error || 'An error occurred',
                loading: false
            }));
        }
    };

    // Dynamic classes based on dark mode
    const getClasses = {
        container: `container mx-auto p-4 max-w-4xl ${state.darkMode ? 'text-white' : ''}`,
        heading: `text-3xl font-bold text-center mb-8 ${state.darkMode ? 'text-white' : 'text-red-700'}`,
        select: `p-2 border rounded ${state.darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'}`,
        dropzone: `border-2 border-dashed p-4 mb-4 text-center cursor-pointer ${state.darkMode ? 'border-gray-600 bg-gray-800' : 'border-red-300 bg-red-50'}`,
        textarea: `w-full p-2 border rounded ${state.darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'}`,
        button: `px-4 py-2 rounded`,
        primaryButton: `bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300`,
        recordButton: (isRecording) => `flex items-center gap-2 ${isRecording ? 'bg-red-600 text-white' : state.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`,
        summaryCard: `p-6 rounded-lg shadow-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`,
        summaryHeading: `text-xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-red-700'}`,
        metricCard: (color) => `p-4 rounded ${state.darkMode ? 'bg-gray-700' : `bg-${color}-50`}`,
        tableHead: `p-2 text-left ${state.darkMode ? 'bg-gray-700' : 'bg-gray-100'}`,
        tableRow: `border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`,
        error: `p-3 mb-4 rounded ${state.darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'}`
    };

    return (
        <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`}>
            <div className={getClasses.container}>
                <div className="flex justify-between items-center mb-8">
                    <h1 className={getClasses.heading}>AI Text Summarizer</h1>
                    <button 
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full ${state.darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {state.darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <select 
                        value={state.language}
                        onChange={(e) => setState(prev => ({ ...prev, language: e.target.value }))}
                        className={getClasses.select}
                    >
                        {languages.map(lang => (
                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                        ))}
                    </select>
                    
                    <select
                        value={state.length}
                        onChange={(e) => setState(prev => ({ ...prev, length: e.target.value }))}
                        className={getClasses.select}
                    >
                        <option value="short">Short Summary</option>
                        <option value="medium">Medium Summary</option>
                        <option value="long">Long Summary</option>
                    </select>
                </div>

                <div className={getClasses.dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <FiUploadCloud className="mx-auto text-2xl mb-2" />
                    <p>Upload PDF or drag & drop</p>
                </div>

                <div className="grid gap-4 mb-6">
                    <textarea
                        value={state.text}
                        onChange={(e) => setState(prev => ({ ...prev, text: e.target.value }))}
                        placeholder="Enter text to summarize..."
                        className={`${getClasses.textarea} h-48`}
                    />
                    
                    <textarea
                        value={state.reference}
                        onChange={(e) => setState(prev => ({ ...prev, reference: e.target.value }))}
                        placeholder="Reference summary (optional for evaluation)..."
                        className={`${getClasses.textarea} h-32`}
                    />
                </div>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={toggleRecording}
                        className={`${getClasses.button} ${getClasses.recordButton(state.isRecording)}`}
                    >
                        {state.isRecording ? <FiStopCircle /> : <FiMic />}
                        {state.isRecording ? 'Stop Recording' : 'Voice Input'}
                    </button>
                    
                    <button
                        onClick={handleSubmit}
                        disabled={state.loading || state.text.length < 100}
                        className={`flex-1 ${getClasses.button} ${getClasses.primaryButton}`}
                    >
                        {state.loading ? 'Processing...' : 'Generate Summary'}
                    </button>
                </div>

                {state.error && <div className={getClasses.error}>{state.error}</div>}

                {state.summary && (
                    <div className={getClasses.summaryCard}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className={getClasses.summaryHeading}>Summary</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleTextToSpeech}
                                    title={state.isSpeaking ? "Stop Speaking" : "Read Summary"}
                                    className={`p-2 ${state.darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-700'} rounded-full ${state.isSpeaking ? 'bg-red-600 text-white' : ''}`}
                                >
                                    {state.isSpeaking ? <FiVolumeX /> : <FiVolume2 />}
                                </button>
                                {state.originalSummary && (
                                    <button
                                        onClick={() => setState(prev => ({ ...prev, showOriginal: !prev.showOriginal }))}
                                        className={`${state.darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                                    >
                                        {state.showOriginal ? 'Hide Original' : 'Show Original'}
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        <p className="mb-4 whitespace-pre-wrap">{state.summary}</p>
                        
                        {state.showOriginal && (
                            <div className={`mt-4 pt-4 border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'} whitespace-pre-wrap`}>
                                    {state.originalSummary}
                                </p>
                            </div>
                        )}

                        {state.metrics && (
                            <div className={`mt-6 pt-4 border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <h3 className={`text-lg font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-red-700'}`}>
                                    Evaluation Metrics
                                </h3>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                    <div className={getClasses.metricCard('red')}>
                                        <p className="font-semibold">Compression</p>
                                        <p className={`text-2xl ${state.darkMode ? 'text-white' : 'text-red-700'}`}>
                                            {(state.metrics.compression_ratio * 100).toFixed(0)}%
                                        </p>
                                    </div>
                                    <div className={getClasses.metricCard('red')}>
                                        <p className="font-semibold">Readability</p>
                                        <p className={`text-2xl ${state.darkMode ? 'text-white' : 'text-red-700'}`}>
                                            {state.metrics.readability_score}/100
                                        </p>
                                    </div>
                                    {state.metrics.rouge_scores && (
                                        <div className={getClasses.metricCard('red')}>
                                            <p className="font-semibold">ROUGE-L F1</p>
                                            <p className={`text-2xl ${state.darkMode ? 'text-white' : 'text-red-700'}`}>
                                                {(state.metrics.rouge_scores.rougeL.fmeasure * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {state.metrics.rouge_scores && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className={getClasses.tableHead}>
                                                <tr>
                                                    <th className="p-2 text-left">Metric</th>
                                                    <th className="p-2">Precision</th>
                                                    <th className="p-2">Recall</th>
                                                    <th className="p-2">F1 Score</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(state.metrics.rouge_scores).map(([metric, scores]) => (
                                                    <tr key={metric} className={getClasses.tableRow}>
                                                        <td className="p-2 font-medium">{metric.toUpperCase()}</td>
                                                        <td className="p-2 text-center">{(scores.precision * 100).toFixed(1)}%</td>
                                                        <td className="p-2 text-center">{(scores.recall * 100).toFixed(1)}%</td>
                                                        <td className="p-2 text-center">{(scores.fmeasure * 100).toFixed(1)}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Worker>
    );
};

export default TextSummarizer;
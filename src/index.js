import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import input from "./input.css";
import { NextUIProvider } from '@nextui-org/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme=localStorage.getItem("Theme");
console.log("theme****************",theme);

root.render(
  <React.StrictMode className='min-h-full text-foreground bg-background '>
    <NextUIProvider className={`${theme} text-foreground bg-background min-h-full max-h-screen max-w-screen-3xl relative container mx-auto flex-grow`} style={{width: '100%'}}>
      <main className="min-h-full ">
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);

reportWebVitals();

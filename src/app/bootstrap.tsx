// @ts-nocheck
import * as ReactDOMClient from 'react-dom/client';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { TeamProvider } from '../features/auth';
import { AppProvider } from '../state/app-state';

ReactDOMClient.createRoot(document.getElementById("root")).render(<React.StrictMode><HashRouter><AppProvider><TeamProvider><App /></TeamProvider></AppProvider></HashRouter></React.StrictMode>);

export {  };

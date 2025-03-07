import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import { App } from './src/App'

const root: HTMLElement | null = document.getElementById('root')
if(!root) throw new Error('Root element not found')
createRoot(root).render(<StrictMode><App /></StrictMode>)
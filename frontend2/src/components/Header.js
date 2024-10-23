import React from 'react'
import { createRoot } from 'react-dom/client'
import Markdown from 'react-markdown'


export default function Header() {

  const markdown = '# Заметки';

  return (
    <Markdown>{markdown}</Markdown>
  )
}
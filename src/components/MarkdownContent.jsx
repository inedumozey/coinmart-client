import React from 'react'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

export default function MarkdownContent({ text }) {

    return (
        <ReactMarkdown
            children={text}
            remarkPlugins={[remarkGfm]}
        />
    )
}

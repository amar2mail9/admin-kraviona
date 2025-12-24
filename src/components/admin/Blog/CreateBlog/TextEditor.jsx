import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const JoditBlogEditor = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start writing...',
        height: 400,

        style: {
            background: '#1f2937',   // gray-800
            color: '#e5e7eb',        // gray-200
        },

        toolbarAdaptive: false,
        toolbarSticky: false,

        theme: 'dark',

        uploader: {
            insertImageAsBase64URI: true
        }
    }), [placeholder]);

    return (
        <div className="w-full bg-gray-800 rounded-xl p-4 border border-gray-700">
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
                onChange={() => { }}
            />

            {/* HTML Preview */}
            <div className="mt-4 p-4 bg-gray-900 text-gray-300 rounded border border-gray-700">
                <h3 className="text-sm text-gray-500 mb-2">
                    HTML Output (Send this to backend):
                </h3>
                <code className="text-xs break-all">
                    {content}
                </code>
            </div>
        </div>
    );
};

export default JoditBlogEditor;

import * as React from "react";
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {ssr: false});

export default function RichEditor(props) {
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    return <div className="flex flex-col gap-3.75 w-full h-full">
                <Editor 
                    editorState={editorState} 
                    wrapperClassName={props.wrapperClassName} 
                    onEditorStateChange={(editorState) => setEditorState(editorState)}
                />
            </div>
}
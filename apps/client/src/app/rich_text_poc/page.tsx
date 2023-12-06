"use client"; 
import { Title } from "@mantine/core";

import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
export default function Home(): JSX.Element {
    const editor: BlockNoteEditor = useBlockNote({});  
  return (<><Title>Rich Text Editor</Title>
  <BlockNoteView editor={editor} /></>
  )
}

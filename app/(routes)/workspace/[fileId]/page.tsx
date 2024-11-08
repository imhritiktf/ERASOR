"use client"

import React, { useEffect, useState } from "react";
import Workspaceheader from "../_components/Workspaceheader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";

interface Params {
  fileId :string
}

const WorkSpace = ({params}:any) => {
  const [triggerSave, settriggerSave] = useState(false)
  const  convex = useConvex()
  const [fileData, setfileData] = useState<FILE | any>()
  const unwrappedParams = React.use(params)
  // @ts-ignore
  const fileId = unwrappedParams ? unwrappedParams.fileId : null;
  // const fileId = params ? params.fileId : undefined; // Use params directly

useEffect(() => {
  getFileData()
}, [])


  const getFileData =async ()=>{
    const result  = await convex.query(api.files.getFileById,{_id:fileId})
    setfileData(result)
  }

    return (
      <div>
        <Workspaceheader onSave={()=>settriggerSave(!triggerSave)}/>

        {/* WorkSpace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* docement */}
        <div className="px-8 h-screen">
            <Editor fileData={fileData} fileId={fileId} onSaveTrigger={triggerSave}/>
        </div>

        {/* canvas/whiteboard */}
        <div className="
         h-screen border-l">
            <Canvas fileData={fileData} fileId={fileId} onSaveTrigger={triggerSave}/>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;

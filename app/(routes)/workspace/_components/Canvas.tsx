"use client";
import { api } from "@/convex/_generated/api";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { FILE } from "../../dashboard/_components/FileList";

const Canvas = ({
  fileData,
  fileId,
  onSaveTrigger,
}: {
  fileData: FILE;
  fileId: any;
  onSaveTrigger: any;
}) => {
  const [elements, setElements] = useState<any>([]);

  const updateWhiteBoard = useMutation(api.files.updateWhiteBoard);

  useEffect(() => {
    // Log elements when they change
    onSaveTrigger && saveWhiteBoard();
    console.log(fileData);
  }, [onSaveTrigger]);

  const saveWhiteBoard = () => {
    updateWhiteBoard({
      _id: fileId,
      whiteboard: JSON.stringify(elements),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log("Some internal error"));
  };

  return (
    <div style={{ height: "590px", width: "660px" }}>
      {fileData && <Excalidraw
      // @ts-ignore
        onChange={(elements: readonly ExcalidrawElement[]) =>
          setElements(elements)
        }
        initialData={{
          elements: fileData.whiteboard && JSON.parse(fileData?.whiteboard),
        }}
      >
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint></WelcomeScreen.Hints.ToolbarHint>
        </WelcomeScreen>
      </Excalidraw>}
    </div>
  );
};

export default Canvas;

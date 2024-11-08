import { FileListContext } from "@/app/_contex/FileListContext";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import SideNavBottomSection from "./SideNavBottomSection";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";

const SideNav = () => {
  const { user }: any = useKindeBrowserClient();
  const [activeTeam, setactiveTeam] = useState<TEAM>();
  const createFile = useMutation(api.files.createFile);
  const convex = useConvex()
  const [totalFiles, settotalFiles] = useState<Number>()
  const {fileList_, setfileList_} = useContext(FileListContext)
  useEffect(() => {
    activeTeam&&getFiles()    
  }, [activeTeam,totalFiles])
  
  const onFileCreate = (filename: string) => {
    console.log(filename);
    createFile({
      fileName: filename,
      teamId: activeTeam?._id!,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    })
      .then((res) => {
        getFiles()
        if (res) toast("File created successfully!");
      })
      .catch((e) => toast("Error while creating file"));
  };

  const getFiles = async ()=>{
    const result = await convex.query(api.files.getFiles,{teamId:activeTeam?._id!})
    settotalFiles(result.length)
    setfileList_(result)
  }


  return (
    <div className=" h-screen fixed  w-72 border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setactiveTeamInfo={(activeTeam: TEAM) => setactiveTeam(activeTeam)}
        />
      </div>
      <div>
        <SideNavBottomSection totalFiles={totalFiles} onFileCreate={onFileCreate} />
      </div>
    </div>
  );
};

export default SideNav;

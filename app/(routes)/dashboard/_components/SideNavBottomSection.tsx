import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Constant from "@/app/_constant/Constant";

const SideNavBottomSection = ({onFileCreate, totalFiles}:any) => {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: "",
    },
    {
      id: 2,
      name: "Github",
      icon: Github,
      path: "",
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: "",
    },
  ];
  const [fileInput, setfileInput] = useState("")

  return (
    <div>
      {menuList.map((item, idx) => (
        <h2
          key={idx}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm"
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </h2>
      ))}
      {/* Add new file button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
            New File
          </Button>
        </DialogTrigger>
       {
        totalFiles< Constant.MAX_FREE_FILE?  <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>
           <Input type="text" placeholder="Enter File Name" className="mt-2" onChange={(e)=>setfileInput(e.target.value)}/>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" className="bg-blue-600 hover:bg-blue-700" disabled={!(fileInput&&fileInput.length>3)} onClick={()=>onFileCreate(fileInput)}>
            Create
          </Button>
        </DialogClose> 
      </DialogFooter>
      </DialogContent>: null
       }
      </Dialog>

      {/* progress bar */}
      <div className="h-4 w-full bg-gray-200 rounded-full mt-5 overflow-hidden">
        <div className={`h-4 bg-blue-600`} 
        style={{width: `${(totalFiles/5)*100}%`}}
        ></div>
      </div>
      <h2 className="text-[12px] mt-3">
        <strong>{totalFiles}</strong> out of <strong>{Constant.MAX_FREE_FILE}</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1">
        upgrade your plan for unlimited access
      </h2>
    </div>
  );
};

export default SideNavBottomSection;

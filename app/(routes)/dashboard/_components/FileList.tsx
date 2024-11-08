import { FileListContext } from "@/app/_contex/FileListContext";
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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Trash } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  creationTime: number;
  _id: string;
}

const FileList = () => {
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const deleteFile = useMutation(api.files.deleteFile)

  const { fileList_, setfileList_ } = useContext(FileListContext);
  const [FileList, setFileList] = useState<any>();

  const deleteFileHandler = (fileId:any)=>{
    deleteFile({_id:fileId}).then((res)=>{toast("File deleted successfully!")
      
      setfileList_(fileList_.filter((file:any)=>file._id !== fileId));
    }).catch((err)=>toast('Cannot delete file'))
  }
  
  useEffect(() => {
    fileList_ && setFileList(fileList_);
    console.log(FileList);
  }, [fileList_,deleteFileHandler]);

  
  return (
    <div className="mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                File Name
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created At
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Edited
              </td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </td>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {FileList &&
              FileList.map((file: FILE, index: number) => (
                <tr key={index} className="odd:bg-gray-50">
                  <td
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer"
                    onClick={() => router.push("/workspace/" + file._id)}
                  >
                    {file.fileName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file.creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {moment(file.creationTime).format("DD MMM YYYY")}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <Image
                      src={user?.picture!}
                      alt="user"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-right">
                    <Dialog>
                      <DialogTrigger className="" asChild>
                        <Button className=" bg-red-600 hover:bg-red-700 justify-start">
                          <Trash className="w-2 h-2" /> Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New File</DialogTitle>
                          <DialogDescription>
                            Are you sure want to delete this file?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button
                              type="button"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              className="bg-red-600 hover:bg-red-700"
                              onClick={()=>deleteFileHandler(file._id)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;

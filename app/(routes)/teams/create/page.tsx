"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateTeam = () => {
  const [teamName, setteamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const router = useRouter()
  const { user }: any = useKindeBrowserClient();

  const creatNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.email,
    }).then((res) => {
      console.log(res);
      if(res){
        router.push("/dashboard")
        toast.message("Team created successfully!!!")
      }
    });
  };
  return (
    <div className="px-6 md:px-16 my-16">
      <Image src={"/logo-black.png"} alt="logo" width={200} height={200} />
      <div className="flex flex-col items-center mt-8">
        <h2 className="font-bold text-[40px] py-3">
          What should we call your team?
        </h2>
        <h2 className="text-gray-500">
          You can always change this later from settings
        </h2>
        <div className="mt-7 w-[40%]">
          <label className="text-gray-500">Team Name</label>
          <Input
            placeholder="Team name"
            className="mt-3"
            onChange={(e) => setteamName(e.target.value)}
          />
        </div>
        <Button
          disabled={!(teamName && teamName?.length > 0)}
          className="bg-blue-500 mt-9 w-[30%] text-center hover:bg-blue-700"
          onClick={creatNewTeam}
        >
          
          Create Team
        </Button>
      </div>
    </div>
  );
};

export default CreateTeam;

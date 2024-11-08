import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { ChevronDown, LayoutGrid, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavTopSection = ({ user ,setactiveTeamInfo}: any) => {
  const router = useRouter();
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: User,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  const [TeamList, setTeamList] = useState<TEAM[]>();
  const [ActiveTeam, setActiveTeam] = useState<TEAM>();
  const convex = useConvex();
  useEffect(() => {
    user && getTeams();
  }, [user]);

  useEffect(() => {
    ActiveTeam&&setactiveTeamInfo(ActiveTeam)
  }, [ActiveTeam])
  

  const getTeams = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  const onMenuClick = (item: any) => {
    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          {" "}
          <div className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-md cursor-pointer">
            <Image src={"/logo-1.png"} alt="logo" width={40} height={40} />
            <h2
              className="flex gap-2 items-center font-bold
         text-[17px]"
            >
              {ActiveTeam?.teamName} <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-7">
          {/* team section */}
          <div>
            {TeamList &&
              TeamList.map((item, idx) => (
                <h2
                  key={idx}
                  className={`hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer p-2 ${ActiveTeam?._id === item._id && "bg-blue-500 text-white"}`}
                  onClick={() => setActiveTeam(item)}
                >
                  {item.teamName}
                </h2>
              ))}
          </div>
          <Separator className="mt-2 bg-slate-100" />
          {/* option section */}
          <div>
            {menu.map((item, idx) => (
              <h2
                key={idx}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm"
                onClick={() => onMenuClick(item)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </h2>
            ))}
            <LogoutLink>
              <h2 className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-sm">
                <LogOut className="h-4 w-4" />
                Logout
              </h2>
            </LogoutLink>
          </div>
          <Separator className="mt-2 bg-slate-100" />
          {/* user Info section */}
          {user && (
            <div className="mt-2 flex gap-2 items-center">
              <Image
                src={user?.picture}
                alt="user"
                width={30}
                height={30}
                className="rounded-full"
              />

              <div>
                <h2 className="font-bold text-[14px]">
                  {user?.given_name} {user?.family_name}
                </h2>
                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* all files button */}
      <Button variant={"outline"} className="w-full justify-start gap-2 font-bold">
        <LayoutGrid className="w-5 h-5"/>
        All Files
      </Button>
    </div>
  );
};

export default SideNavTopSection;

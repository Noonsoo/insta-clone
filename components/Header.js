import Image from "next/image";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className=" shadow-sm border-b bg-white sticky z-10  top-0">
      <div className="flex items-center justify-between max-w-6xl mx-2 lg:mx-auto ">
        <div
          onClick={() => router.push("/")}
          className="relative h-24 w-24 hidden lg:inline-grid cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            fill
            style={{ objectFit: "contain" }}
            alt="true"
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative flex w-6 h-6 lg:hidden flex-shrink-0  "
        >
          <Image
            src="https://links.papareact.com/jjm"
            fill
            style={{ objectFit: "contain" }}
            alt="true"
          />
        </div>

        <div className=" ">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5  text-gray-600" />
            </div>

            <input
              className="bg-gray-300 block pl-10 border-gray-300 w-full sm:text-sm focus:ring-black focus:border-black rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          <Bars3Icon className="h-6 md:hidden" />

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn -rotate-45 " />
                <div
                  className="absolute -top-2 hidden md:inline-flex -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center
             animate-pulse text-white "
                >
                  3
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session?.user?.image}
                alt="profile pic"
                className="h-6  rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

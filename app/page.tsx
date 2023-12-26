import Link from "next/link";
import { DiMongodb } from "react-icons/di";

const RedirectButton = () => {
  const CSS =
    "bg-blue-600 text-white border shadow p-2 px-3 gap-2 flex justify-center items-center rounded-full hover:bg-blue-500 cursor-pointer transition ease-in-out delay-100 duration-200 hover:scale-110";
  return (
    <div className="flex flex-col gap-2">
      <Link className={CSS} href="./db">
        <DiMongodb />
        Connect to development DB
      </Link>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <div className={`flex w-screen`}>
        <div className="flex flex-col w-screen justify-center items-center bg-gray-100 gap-20 select-none">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="font-bold text-3xl">
              [4101] Employees Management App
            </h1>
            <h2 className="text-stone-500">
              23. Розробка програмного забезпечення «Обліку персоналу»
            </h2>
            <h3 className="text-stone-400">developed by Roman Kocherzhenko</h3>
          </div>
          <RedirectButton />
        </div>
      </div>
    </>
  );
};

export default Home;

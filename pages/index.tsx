import type { NextPage } from "next";
import Head from "next/head";
import { useSelector } from "react-redux";
import Column from "../components/Column";
import { Pet } from "../model/Pet.model";
import { RootState } from "../store";

const Home: NextPage = () => {
  const pets: Pet[] = useSelector((state: RootState) => state.petsState.pets);
  const column = ["blue", "red", "yellow", "green"];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center flex-1 w-full">
        <div className="flex justify-center items-center w-full flex-wrap sm:flex-nowrap">
          {column.map((item, index) => {
            const isIndex = pets.findIndex((pet) => pet.num === index + 1);

            // コンテナがある場合のみ表示する
            return isIndex !== -1 ? (
              <div className="m-1 w-60 sm:w-1/4" key={index}>
                <Column columnNum={index + 1} bgColor={item} />
              </div>
            ) : null;
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;

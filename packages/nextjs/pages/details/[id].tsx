import React, { useContext, useEffect, useState } from "react";
import Lit from "../utils/scaffold-eth/litProtocol";
import { MyContext } from "./_app";
import * as LitSDK from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function DatasetDetails() {
  useEffect(() => {
    // initLit();
  }, []);

  return (
    <div className="px-10 py-4">
      <h1>TEST</h1>

      {/* {selectedToken && (
        <div>
          <div className="grid grid-cols-2">
            <div className="p-6">
              <div className="flex justify-between">
                <p className="bold">Polygon</p>
                <p className="">4 Likes ♡</p>
              </div>
              <div className="">
                <img
                  src={selectedToken?.image ? selectedToken.image : "/assets/gradient-bg.png"}
                  alt="NFT Image"
                  className=" m-1 w-full h-auto"
                />
              </div>
            </div>
            <div className="p-6">
              <p className="text-3xl font-bold ">{selectedToken.title} </p>
              <p className="text-lg font-bold ">
                Owned by <span className="text-blue-700">0x34af...rtd2</span>
              </p>
              <div className="flex">
                <p className="text-md pr-6">♡ 4 favorites</p>
                <p className="text-md">❖ IPFS</p>
              </div>
              <p className="text-lg">
                🕤 Create at: <span className="font-light">{selectedToken.createdDate}</span>
              </p>
              <p className="text-lg pt-3 pb-0">Current price </p>
              <p className="text-2xl font-bold pt-0">
                {selectedToken.price} CDAO <span className="text-sm font-light">$25.92</span>
              </p>

              <div className="flex ">
                <button
                  onClick={mint}
                  className="flex items-center justify-evenly space-x-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4 w-56"
                >
                  Mint Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </button>
                <button
                  onClick={decryptFile}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Get Access
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  <a href={download} download="file.txt">
                    Download
                  </a>
                </button>
              </div>

              <p className="pt-10 text-xl font-bold">Dataset Description</p>
              <p className="">{selectedToken.description}</p>

              <p className="pt-6 text-xl">Dataset Tags</p>
              <div className="border border-solid border-gray-400 flex gap-1">
                {selectedToken?.tags.length > 0
                  ? selectedToken.tags.map((tag, index) => (
                      <p className="text-xs bg-gray-400 p-1 text-white rounded-md" key={index}>
                        {tag}
                      </p>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default DatasetDetails;

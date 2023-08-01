import React, { useContext, useState } from "react";
import { MyContext } from "./_app";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function Donate(props) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const { selectedFundraiser } = useContext(MyContext);
  console.log("🚀 ~ file: donate.js:6 ~ donate ~ selectedFundraiser:", selectedFundraiser);
  const postId = selectedFundraiser?.fundraiserId;
  // const postId = 0;

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "CommunityPets",
    functionName: "donate",
    args: [postId, amount],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const checkMessage = e => {
    const input = e.target.value;
    if (input.length <= 80) {
      setMessage(input);
    }
  };

  return (
    <div className="h-1/2  flex items-center justify-center pt-24">
      <div style={{ width: "40%" }} className=" w-600 h-600 flex flex-col  bg-[black] p-14 text-white rounded-md ">
        <label htmlFor="donate" className="text-2xl">
          Amount to donate
        </label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="border border-black text-[black] p-3 mt-2"
        />

        <label htmlFor="message" className="pt-8 text-2xl">
          Message (80 characters max)
        </label>
        <textarea
          type="text"
          maxLength={80}
          defaultValue={message}
          onChange={checkMessage}
          className="border border-black text-[black] p-3 mt-2"
        />
        <button onClick={writeAsync} className="bg-[#1550f2] p-3 mt-10">
          {isLoading ? "isLoading" : "Donate"}
        </button>
      </div>
      {/*
      input number  for amount
      grab the logged in user address
      create donate()
          if(!address) alert("Please connect your wallet.")
          call the contract
          if(success)  alert("Donated successfully!")
          if(error)  alert("Something went wrong!")
          redirect to home
       */}
    </div>
  );
}

export default Donate;

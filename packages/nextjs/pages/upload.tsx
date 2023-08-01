import React, { useContext, useRef, useState } from "react";
import { Link } from "next/link";
import { MyContext } from "./_app";
import { Button, Card, Container, MenuItem, StylesProvider, TextField } from "@material-ui/core";
import axios from "axios";
import { File, NFTStorage } from "nft.storage";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
// import { useSignMessage } from 'wagmi'
import "react-datetime-picker/dist/DateTimePicker.css";
// import { useScaffoldContract, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

function ConfirmationUpload({ name, description, tags, image, price, writeAsync, tokenId }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async () => {
    if (selectedFile) {
      await encryptFile(selectedFile);
      console.log("Uploading file:", selectedFile);
    } else {
      console.log("No file selected.");
    }
  };
  return (
    <div className="flex justify-center p-8">
      <div
        className="rounded-md overflow-hidden shadow-lg border border-gray-300"
        style={{ width: "700px", padding: "6rem", paddingTop: "3rem" }}
      >
        <h1 className="text-lg font-bold mb-2 pb-4">Before publishing, please review your DataSet</h1>
        <img
          style={{
            width: "150px",
            top: "0",
            left: "0",
          }}
          src={image ? image : "/assets/Rectangle 77.png"}
          alt="userBGimage"
        />
        <p className="text-md mb-2 pb-4">
          <strong>Title</strong>
          <br /> {name}
        </p>

        <p className="text-md mb-2 pb-4">
          <strong>Description</strong>
          <br /> {description}
        </p>

        <p className="text-md mb-2 pb-4">
          <strong>Tags</strong>
          <br /> {tags}
        </p>

        <p className="text-md mb-2 pb-4">
          <strong>Price </strong>
          <br /> {price}
        </p>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          onClick={writeAsync}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

function Upload() {
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc0N2E1MEVlMUZkNzUzZjkzYUM5MWYyNkUwNDMxMGRCZjY5ZWEzYjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MjQzMTk2MDkxMSwibmFtZSI6ImNvbW11bml0eS1wZXRzIn0.tADr_0uY9SstZFqVHhdezC6ora_glwrWKhToNkssG8w";
  const [displayUpload, setDisplayUpload] = useState(true);
  const fundraiserType = useRef();
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Volunteer");
  const [imageType, setImageType] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState(
    "On top of the daily heartache of the rescue cats themselves, the vets bill is spiraling and becoming an enormous worry for Sue. And that is the one thing we can try and help her with. We need to keep those doors open, for the sake of the cats that really need her help and their chance. We know things are not easy at the moment so we dont have any expectations on anybody, we can only hope that those who can throw a pound or two in our begging bucket- do. Every single pound REALLY does count, because every pound you give is one less to find. Thank you",
  );
  const [targetAmmount, setTargetAmmount] = useState(0);
  console.log(
    "__ALL image, category, imageType, title, description, targetAmmount:",
    image,
    category,
    imageType,
    title,
    description,
    targetAmmount,
  );

  // const { data: myContract } = useScaffoldContract({ contractName: "CommunityPets" });
  // console.log("🚀 ~ file: upload.tsx:37 ~ Upload ~ myContract:", myContract);

  const getDay = async () => {
    let d = new Date();
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${mo}-${da}-${ye}`;
  };

  // const { data: what_is, loading } = useScaffoldContractWrite({
  //   contractName: "CommunityPets",
  //   functionName: "getAllFundraisers",
  //   args: [],
  // });
  // console.log("🚀 ~ file: up Dload.tsx:220 ~ Upload ~ what_is:", what_is);


  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "CommunityPets",
    functionName: "createFoundraiser",
    args: [url, targetAmmount],
    // For payable functions, expressed in ETH
    // value: "0.01",
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: (txnReceipt) => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });


  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "CommunityPets",
    functionName: "getAllFundraisers",
    // args: ["ARGUMENTS IF THE FUNCTION ACCEPTS ANY"],
  });
  console.log("🚀 ~ file: upload.tsx:119 ~ Upload ~ totalCounter:", totalCounter)


  const saveToNFTStorage = async () => {
    try {
      const creationDate = await getDay();
      const obj = {
        title,
        description,
        targetAmmount,
        creationDate,
        category,
        image
      };

      const client = new NFTStorage({ token: apiKey });

      const metadata = await client.store({
        name: title,
        description: JSON.stringify(obj),
        image: new File([image], "imageName", { type: "image/*" }),
      });
      console.log("metadata", metadata);

      console.log("click=====", image, title, description, targetAmmount, creationDate);
      if (metadata) {
        console.log("metadata URL", metadata?.url);
        const url = metadata?.url.substring(7);
        const fullUrl = `https://cloudflare-ipfs.com/ipfs/${url}`;
        console.log("fullUrl", fullUrl);
        setUrl(fullUrl)
        setDisplayUpload(false)
        // const saveToContract = await contract.createFoundraiser(fullUrl, targetAmmount);
        // const tx = await saveToContract.wait();
        // console.log("tx", tx);
        // history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };




  const handleImage = async event => {
    const updataData = new FormData();
    updataData.append("file", event.target.files[0]);
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", updataData, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "2f7a99fef33b2783bde7",
        pinata_secret_api_key: "9082e887ce9262fcf525cd85b5a0da348a5b1fc3fb725bacdd5af3d80a051d5c",
      },
    });
    setImage("https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash);
  };


  return (
    <StylesProvider injectFirst>
      <Container className="root-pet-details" style={{ minHeight: "50vh", paddingBottom: "3rem" }}>
        <center>
          <Card
            style={{
              maxWidth: "500px",
              padding: "2rem",
              paddingBottom: "3rem",
              borderRadius: "13px",
              textAlign: "start",
            }}
          >
            <div className="">
              <Button className="whiteLink" component={Link} to="/create">
                Create Fundraising
              </Button>
              <Button className="whiteLink" component={Link} to="/create">
                Confirmation
              </Button>
            </div>
            {displayUpload ? (
              <>
                <br />
                <hr style={{ border: "1px solid #ccc" }} />
                <br />
                <img
                  style={{
                    width: "150px",
                    top: "0",
                    left: "0",
                  }}
                  src={image ? image : "/assets/Rectangle 77.png"}
                  alt="userBGimage"
                />
                <label htmlFor="formFileImage5">+ Upload</label>
                <input
                  type="file"
                  id="formFileImage5"
                  onChange={handleImage}
                  defaultValue={image}
                  style={{ display: "none" }}
                  required
                />

                <br />
                <br />
                <p>
                  <label htmlFor="fname">Title</label>
                </p>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="fundraising tittle.."
                  className="create-profile-input"
                  defaultValue={title}
                  onChange={e => setTitle(e.target.value)}
                ></input>
                <p>
                  <label htmlFor="w3review">Description</label>
                </p>
                <textarea
                  className="create-profile-input"
                  type="text"
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></textarea>
                <p style={{ textAlign: "right", fontSize: "11px" }}>
                  <label htmlFor="w3review">0/250</label>
                </p>
                <br />

                <p>
                  <label htmlFor="fname"> Target Ammount</label>
                </p>
                <input
                  type="number"
                  id="targetAmmount"
                  name="targetAmmount"
                  placeholder="$500"
                  className="create-profile-input"
                  defaultValue={targetAmmount}
                  onChange={e => setTargetAmmount(e.target.value)}
                ></input>
                <br />
                <br />

                <p>
                  <label htmlFor="fname"> Category</label>
                </p>
                <br />
                <TextField
                  fullWidth
                  name="fundraiserType"
                  select
                  variant="outlined"
                  className="text-field"
                  onChange={e => setCategory(e.target.value)}
                  defaultValue=""
                  ref={fundraiserType}
                >
                  <MenuItem value="Medical">Medical</MenuItem>
                  <MenuItem value="Memorial">Memorial</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                  <MenuItem value="Nonprofit">Nonprofit</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Volunteer">Volunteer</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Community">Community</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <br />
                <br />
                <br />
                <hr style={{ border: "1px solid #ccc" }} />
                <br />
                <center>
                  {/* <Button className="whiteLink" component={Link} to="/">
                Nevermind
              </Button> */}
                  <Button className="phase-btn" variant="contained" onClick={saveToNFTStorage}>
                    Create
                  </Button>
                </center>
              </>
            ) : (
              <ConfirmationUpload
                image={image}
                category={category}
                title={title}
                description={description}
                targetAmmount={targetAmmount}
                writeAsync={writeAsync}
              />
            )}
          </Card>
        </center>
      </Container>
    </StylesProvider>
  );
}

export default Upload;

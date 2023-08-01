import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MyContext } from "./_app";
import FundraisersList from "../components/fundraisers/FundraisersList";
import { Button } from "@material-ui/core";
import { Card, Container, Grid } from "@material-ui/core";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { fundraisers, setFundraisers, setSelectedFundraiser } = useContext(MyContext);
  console.log("______  MY fundraisers:", fundraisers);

  const { data: totalFundraisers } = useScaffoldContractRead({
    contractName: "CommunityPets",
    functionName: "getAllFundraisers",
  });

  useEffect(() => {
    getAllFundraisers();
  }, [totalFundraisers]);

  const getAllFundraisers = async () => {
    console.log("____________totalFundraisers:", totalFundraisers);
    try {
      const temp = [];
      for (let i = 0; i < totalFundraisers.length; i++) {
        const obj = {};
        // data from smart contract
        const organizer = totalFundraisers[i][4];
        const totalDonations = totalFundraisers[i]["totalDonations"].toString();
        const fundraiserId = totalFundraisers[i].id.toString();
        // fetchs data from nftStorage
        const nftStorageURL = totalFundraisers[i][1];
        if (!nftStorageURL) {
          continue;
        }

        let getNFTStorageData = await fetch(nftStorageURL);
        let fundraiserData = await getNFTStorageData.json();
        const data = JSON.parse(fundraiserData.description);
        console.log("🚀 ~ file: index.tsx:53 ~ getDatasetTokens ~ data:", data);
        // builds fundraiser data
        obj.fundraiserId = fundraiserId;
        obj.organizer = organizer;
        obj.totalDonations = totalDonations;
        obj.title = fundraiserData.name;
        obj.image = data.image;
        obj.description = data.description;
        obj.category = data.category;
        obj.targetAmmount = data.targetAmmount;
        obj.creationDate = data.creationDate;
        temp.push(obj);
      }
      setFundraisers(temp)();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <MetaHeader />
      <div
        style={{
          minHeight: "70vh",
          paddingBottom: "4rem",
          paddingTop: ".5rem",
        }}
      >
        <Container>
          <Container>
            <div className="root">
              <Grid
                container
                spacing={3}
                style={{
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                <Grid item xs={5} className="outer">
                  <img src="./home-logo.png" className="logo-hero" alt="logo-hero" />
                </Grid>
                <Grid item xs={7}>
                  <p className="home-text-intro">
                    <strong>PetsFundMe</strong> is a social app built by the community for everyone who supports pets.
                    PetsFundMe is an NFT platform where pet owners and pet lovers come together and help each other to
                    solve their pet's needs from expensive surgeries to food supplies or free services.
                  </p>
                  <p className="home2-text-intro">
                    PetsFundMe is the perfect pet hub for nonprofits, medical & government institutions, influencers,
                    and artists to come together to solve the needs of the most vulnerable Pets. Come to ask for
                    financial support, as questions, answer questions, and give or receive donations. Come join us to
                    make this planet a better world.
                  </p>
                </Grid>
              </Grid>
            </div>
          </Container>

          {/* search */}
          <form className="search-form">
            <div className="pseudo-search">
              <input type="text" placeholder="Search for title, name, etc" autoFocus required />
              <span className="search-clear">Clear</span>
              <span className="search-icon">🔍</span>
            </div>
          </form>

          <br />
          <Card
            style={{
              borderRadius: "24px",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              backgroundColor: "#fff9f7",
              minHeight: "20rem",
            }}
          >
            {fundraisers.length ? (
              <FundraisersList data={fundraisers} setSelectedFundraiser={setSelectedFundraiser} />
            ) : (
              <div style={{ textAlign: "center", paddingTop: "3rem" }}>
                <Button
                  style={{ backgroundColor: "#FF835B", color: "white" }}
                  // onClick={() => connectWallet()}
                >
                  Login to continue
                </Button>
              </div>
            )}
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Home;

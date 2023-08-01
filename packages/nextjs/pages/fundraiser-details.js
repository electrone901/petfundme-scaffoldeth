import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MyContext } from "./_app";
import { Box, Button, Card, Chip, Container, Grid, StylesProvider, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

// import './Profile.css'

function FundraiserDetails() {
  const { selectedFundraiser } = useContext(MyContext);
  console.log("11_________selectedFundraiser:", selectedFundraiser);
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [value, setValue] = React.useState(0);

  //     const { userAddress } = useParams()
  //   const history = useHistory()
  //   console.log('selectedFundraiser', selectedFundraiser)

  //   useEffect(() => {
  //     // getProfile(userAddress)
  //   }, [userAddress])

  // const getProfile = async () => {
  //   const user = await displayPhase(userAddress)
  //   console.warn(user)
  //   setselectedFundraiser(user)
  // }

  const donate = async e => {
    router.push(`/donate`);
  };

  const donateNFTs = async e => {
    setDonateNfts(true);
    router.push(`/donate`);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <StylesProvider injectFirst>
      <Container className="page-community" style={{ minHeight: "70vh", paddingBottom: "1rem" }}>
        <div>
          {selectedFundraiser ? (
            <Box sx={{ width: "100%" }}>
              <br />
              <br />
              <br />
              <p className="title-fundraiser"> {selectedFundraiser.title}</p>
              <br />

              <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={8}>
                  <img src={selectedFundraiser.image} alt="community" className="foundraiser-img" />
                  <br />
                  <br />

                  <div className="outer">
                    <img src="/assets/profile-icon.png" alt="profileIcon" className="profile-icon" />
                    <p>
                      <strong>{`${selectedFundraiser.organizer.substring(32)}...`} </strong>
                      is organizing this fundraiser
                    </p>
                  </div>

                  <br />
                  <hr style={{ border: "1px solid #c8c8c8" }} />
                  <br />
                  <p className="description">{selectedFundraiser.description}</p>
                  <br />
                  <br />
                  <Chip
                    className="profile-chip"
                    label={` Category: ${selectedFundraiser.category}`}
                    variant="outlined"
                  />
                  <Chip
                    className="profile-chip"
                    label={` Created at: ${selectedFundraiser.creationDate}`}
                    variant="outlined"
                  />
                  <Chip
                    className="profile-chip"
                    label={`Fundraiser id: ${selectedFundraiser.fundraiserId}`}
                    variant="outlined"
                  />
                  <br />
                  <br />
                  <hr style={{ border: "1px solid #c8c8c8" }} />
                  <br />
                  <br />

                  <p className="title-fundraiser"> Updates</p>
                </Grid>

                <Grid p xs={4} className="grid-rigth-side">
                  <Card
                    style={{
                      padding: "1.5rem",
                      float: "right",
                    }}
                  >
                    <div className="page-wallet-address">
                      <p style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                        ${selectedFundraiser.totalDonations === "0" ? "0.00" : selectedFundraiser.totalDonations}
                        <span
                          style={{
                            fontSize: ".94rem",
                            color: "rgb(90 87 87)",
                            paddingLeft: "0.3rem",
                          }}
                        >
                          raised of $ {selectedFundraiser.targetAmmount}
                        </span>
                      </p>
                      <br />
                      <LinearProgress variant="determinate" value={50} />

                      <p style={{ fontSize: ".9rem", color: "rgb(90 87 87)" }}>30.3K donations</p>
                      <br />

                      <br />

                      <Button
                        style={{
                          width: "100%",
                          background: "linear-gradient(180deg,#ffde9e 50%,#fcb957)",
                          color: "black",
                        }}
                        onClick={donate}
                      >
                        Donate Now
                      </Button>
                      <br />
                      <br />
                      <Button
                        style={{
                          width: "100%",
                          background: "linear-gradient(180deg,#fdb933 35.42%,#f58131 139.58%)",
                          color: "black",
                        }}
                      >
                        Donate NFTs
                      </Button>
                      <br />
                      <br />

                      <img src="/assets/donation.png" alt="profileIcon" className="donation-img" />
                    </div>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Button variant="contained" color="primary" to="/">
              Refresh
            </Button>
          )}
        </div>
        <br />
        <Typography className="subtitle" color="textPrimary" gutterBottom>
          Updates comming soon...
        </Typography>
        <br /> <br />
      </Container>
    </StylesProvider>
  );
}

export default FundraiserDetails;

import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@material-ui/core";
import { useRouter } from "next/router";

function FundraisersList({ setSelectedFundraiser, data }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const details = fundraiser => {
    console.log("________________fundraiser:", fundraiser);
    setSelectedFundraiser(fundraiser);
    // router.push(`/fundraiser-details/${fundraiser.id}`);
    router.push(`/fundraiser-details`);
  };

  return (
    <div style={{ minHeight: "60vh", borderRadius: "24px" }}>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <Grid container spacing={40}>
            {data.length ? (
              data.map((fundraiser, index) => (
                <Grid item md={3} spacing={1} className="swap-card" key={index}>
                  <Card sx={{ maxWidth: 240 }} onClick={() => details(fundraiser)}>
                    <CardMedia
                      component="img"
                      height="240"
                      image={fundraiser.avatar || fundraiser.image}
                      alt="Profile"
                      style={{ height: "240px", width: "100%" }}
                    />
                    <CardContent>
                      <Typography fontSize="24px" className="card-header-swap">
                        {fundraiser.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <h2>No fundraisers Yet...</h2>
            )}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default FundraisersList;

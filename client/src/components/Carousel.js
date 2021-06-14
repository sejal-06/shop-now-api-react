import React from "react";
import Slider from "infinite-react-carousel";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import menavatar from "../images/menavatar.jpg";
import womenavatar from "../images/womenavatar.jpg";
import kidsavatar from "../images/kidsavatar.jpg";
import accessoriesavatar from "../images/accessoriesavatar.jpg";
import footwearavatar from "../images/footwearavatar.jpg";
import jewelleryavatar from "../images/jewelleryavatar.jpg";
import partyavatar from "../images/partyavatar.jpg";
import casualavatar from "../images/casualavatar.jpg";
import ethnicavatar from "../images/ethnicavatar.jpg";
import sareeavatar from "../images/sareeavatar.jpg";
import goggleavatar from "../images/goggleavatar.jpg";
import bagavatar from "../images/bagavatar.jpg";

import "./Carousel.css";

const category = [
  [
    { type: "Men", imgUrl: menavatar },
    { type: "Women", imgUrl: womenavatar },
    { type: "Kids", imgUrl: kidsavatar },
    { type: "Party", imgUrl: partyavatar },
  ],
  [
    { type: "Casual", imgUrl: casualavatar },
    { type: "Ethnic", imgUrl: ethnicavatar },
    { type: "Sarees", imgUrl: sareeavatar },
    { type: "Accessories", imgUrl: accessoriesavatar },
  ],
  [
    { type: "Footwear", imgUrl: footwearavatar },
    { type: "Jewellery", imgUrl: jewelleryavatar },
    { type: "Bags", imgUrl: bagavatar },
    { type: "Goggles", imgUrl: goggleavatar },
  ],
];

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: "12vh",
  },
  slider: {
    width: "95%",
    marginTop: "5vh",
  },
  images: {
    width: "100%",
    borderRadius: "50%",
    boxShadow: "1px 1px 6px #2e2c29",
    zIndex: "-1",
  },
  container: {
    paddingLeft: "1.5vw",
    paddingRight: "1.5vw",
    // marginBottom: "2vh",
  },
}));

function Team() {
  const classes = useStyles();
  const categories = category;

  const handlecategory = (category) => {
    console.log(category);
    window.location.href = `/productsbycategory/${category}`;
  };

  return (
    <div className={classes.main}>
      <center>
        {/* <Typography variant="h3">Core Team</Typography> */}
        <Slider
          className={classes.slider}
          swipe={true}
          duration={400}
          autoplay={true}
          autoplaySpeed={4000}
        >
          {categories.map((categoriessubarray) => (
            <div>
              <Grid
                container
                style={{ paddingLeft: "30px", paddingRight: "30px" }}
                spacing={1}
              >
                {categoriessubarray.map((category) => (
                  <Grid item xs={3}>
                    <Grid container m={1} className={classes.container}>
                      <Grid item xs={12} className="categorygrid">
                        <img
                          onClick={() => {
                            handlecategory(category.type);
                          }}
                          src={category.imgUrl}
                          alt=""
                          className={classes.images}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          // onClick={() => {
                          //   handlecategory(category.type);
                          // }}
                          // href={"/productsbycategory/" + category.type}
                          className="captionbelowavatar"
                          variant="h7"
                        >
                          <a
                            style={{ color: "white", textDecoration: "none" }}
                            href={"/productsbycategory/" + category.type}
                          >
                            {category.type}
                          </a>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Slider>
      </center>
    </div>
  );
}

export default Team;

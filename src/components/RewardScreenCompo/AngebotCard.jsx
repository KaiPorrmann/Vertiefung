/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { motion } from "framer-motion";
import { Button, Card, CardActions, Typography, Grid } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { Link } from "react-router-dom";

const useStyles = makeStyles({});

export default function AngebotCard() {
  const { classes } = useStyles();

  const [rewards, setRewards] = useState([]);

  const ref = firebase.firestore().collection("rewards");

  //REALTIME GET FUNCTION
  function getRewards() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setRewards(items);
    });
  }

  useEffect(() => {
    getRewards();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        {rewards &&
          rewards.map((reward) => (
            <motion.div
              key={reward.id}
              layout
              whileHover={{ opacity: 1 }}
              s
              onClick={() => reward.url}
            >
              <motion.img
                src={reward.url}
                alt="reward pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                height="100"
                width="200"
              />
              <Typography> {reward.title}</Typography>
              <Typography> {reward.id}</Typography>
              <Typography> {reward.subtitle}</Typography>

              <CardActions>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  component={Link}
                  to="/app/einloesen"
                >
                  Redeem
                </Button>
                <Typography
                  className={classes.points}
                  size=" small"
                  color="primary"
                  justify="right"
                >
                  {reward.points} <p>Tokens</p>
                </Typography>
              </CardActions>
            </motion.div>
          ))}
      </Card>
    </Grid>
  );
}

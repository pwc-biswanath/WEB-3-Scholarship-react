import {  Box, Typography } from '@mui/material';
import { FiCard, FiCardActions, FiCardContent, FiCardMedia } from './FullImageCard';
import makeStyles from "@material-ui/core/styles/makeStyles";


const imageList = [
  "/assets/images/one.jpg",
  "/assets/images/two.jpg",
  "/assets/images/three.jpg",
  "/assets/images/four.jpg",
  "/assets/images/five.jpg",
];
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  /**
   * Max Card with for demo
   * same values used in Material-Ui Card Demos
   */
  card: {
    maxWidth: 345,
    minWidth: 250,
    height: 150,
    marginLeft: 15,
  },

  /**
   * Applied to Orginal Card demo
   * Same vale used in Material-ui Card Demos
   */
  media: {
    height: 140
  },

  /**
   * Demo stlying to inclrease text visibility
   * May verry on implementation
   */
  fiCardContent: {
    color: "#f8f9fa",
    backgroundColor: "rgb(0 0 0 / 68%)",
    height: "100%",
    fontFamily: "ui-sans-serif",
  },
  fiCardContentTextSecondary: {
    padding: 10,
    marginLeft: 20,
    marginTop: 30,
    color: "rgba(255,255,255,0.78)",
  }
});
export const DashboardCard = ({title,image_index,count}) => {
  const classes = useStyles();

return(
  <Box my={4}>
        
        <FiCard className={classes.card}>
          <FiCardMedia
            media="picture"
            alt="Contemplative Reptile"
            image={imageList[image_index]}
            title="Contemplative Reptile"
          />
          <FiCardContent className={classes.fiCardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography
              variant="h5"
              className={classes.fiCardContentTextSecondary}
              component="h2"
            >
              {count}
            </Typography>
          </FiCardContent>
          <FiCardActions className={classes.fiCardContent}>
          
          </FiCardActions>
        </FiCard>
      </Box>
)
}
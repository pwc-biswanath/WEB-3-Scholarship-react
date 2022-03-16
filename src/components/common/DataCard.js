import { Avatar,  Card, CardContent, Grid, Typography } from '@mui/material';

export const DataCard = (props) => (
  <Card {...props} style={{height: "100px"}}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {props.name}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.count===0?"":props.count}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: '#e78d13',
              height: 56,
              width: 56
            }}
          >
            {props.icon}
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
import React from 'react';
import {
  Grid,
  makeStyles
} from '@material-ui/core';

import { Container } from 'components/Layout';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Container
      className={classes.root}
      title="Dashboard"
      maxWidth={true}
    >
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
    </Container>
  );
};

export default Dashboard;

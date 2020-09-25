import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {GET_ALL_USERS} from 'graphql/user'
import { Query } from 'react-apollo';
import { timeAgo } from 'utils/date';
import Skeleton from 'components/Skeleton';
import styled from 'styled-components';
import Empty from 'components/Empty';



const Online = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${p => p.theme.colors.success};
  margin-left: ${p => p.theme.spacing.sm};
  border-radius: 50%;
`;
const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const variables = {
    skip: 0,
    limit: 10,
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Users" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  User Ref
                </TableCell>
                <TableCell>
                  User
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Query query={GET_ALL_USERS}
              variables={variables}
              notifyOnNetworkStatusChange>
              {({ data, loading, fetchMore, networkStatus }) => {
                if (loading && networkStatus === 1) {
                  return (
                    <Skeleton
                      height={56}
                      bottom="xxs"
                      count={10}
                    />
                  );
                }

                const users = data.getAllUser;

                if (!users.length) {
                  return <Empty text="No user yet." />;
                }
                return (
                  <>
                          {users.map((user) => (
                            <TableRow
                              hover
                              key={user.id}
                            >                            
                              <TableCell>
                              <Chip
                                  color="primary"
                                  label={user.username}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                {user.fullName}
                              </TableCell>
                              <TableCell>
                                {timeAgo(user.createdAt)}
                              </TableCell>
                              <TableCell>
                                 {user.isOnline  && <Online/>}
                              </TableCell>
                            </TableRow>
                          ))}
                  </>
                );
                  }}</Query>

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;

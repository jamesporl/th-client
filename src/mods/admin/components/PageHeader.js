import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, GridItem, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SimplePagination from './SimplePagination';

const Wrapper = styled.div`
  height: 60px;
  background-color: #fff;
  padding: 0 1rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ccc;

  .page-header-left {
    display: flex;
    align-items: center;
    height: 100%;

    .page-header-breadcrumbs {
      margin-left: 1rem;
    }
  }

  .page-header-pagination {
  }

  .page-header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
  }
`;

const PageHeader = ({ actions, title, breadcrumbs, pagination }) => {
  let breadcrumbsComp = null;
  if (breadcrumbs.length) {
    breadcrumbsComp = (
      <div className="page-header-breadcrumbs">
        <Breadcrumb style={{ fontSize: '0.75rem' }} colorScheme="gray">
          {breadcrumbs.map((bc, idx) => {
            const isCurrentPage = idx === breadcrumbs.length - 1;
            let bcLink = (
              <BreadcrumbLink as={NextLink} href={bc.href}>
                {bc.title}
              </BreadcrumbLink>
            );
            if (isCurrentPage) {
              bcLink = <BreadcrumbLink>{bc.title}</BreadcrumbLink>;
            }
            return (
              // eslint-disable-next-line react/no-array-index-key
              <BreadcrumbItem key={`${bc.title}_${idx}`}>{bcLink}</BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </div>
    );
  }

  let paginationComp = null;
  if (pagination) {
    paginationComp = <SimplePagination {...pagination} />;
  }

  return (
    <Wrapper>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} h="100%">
        <GridItem w="100%">
          <div className="page-header-left">
            <div className="page-header-title">
              <Text fontWeight="bold" fontSize="lg">
                {title}
              </Text>
            </div>
            {breadcrumbsComp}
          </div>
        </GridItem>
        <GridItem w="100%">{paginationComp}</GridItem>
        <GridItem w="100%">
          <div className="page-header-right">{actions}</div>
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

PageHeader.propTypes = {
  title: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
  }),
  actions: PropTypes.node,
};

PageHeader.defaultProps = {
  breadcrumbs: [],
  pagination: null,
  actions: null,
};

export default PageHeader;

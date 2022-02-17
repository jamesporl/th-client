import React from 'react';
import Table from 'rc-table';
import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    width: 100%;
  }
  thead {
    background-color: #184d47;
    color: #fff;
    position: sticky;
    top: 0;

    th {
      padding: 0.5rem;

      :not(:last-child) {
        border-right: 1px solid #fff;
      }

      td {
        position: sticky;
        top: 0;
      }
    }
  }

  tr {
    border-bottom: 1px solid #f0f0f0;
    td {
      padding: 0.5rem;
      background-color: #fff;
    }
  }
`;

const THTable = (props) => (
  <Wrapper>
    <Table
      tableLayout="auto"
      sticky={{ offsetHeader: 180, offsetScroll: 180 }}
      scroll={{ x: true, y: true }}
      {...props}
    />
  </Wrapper>
);
THTable.propTypes = {};

THTable.defaultProps = {};

export default THTable;

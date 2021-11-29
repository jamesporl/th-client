import React from 'react';
import PropTypes from 'prop-types';
import { Text, Input } from '@chakra-ui/react';
import styled from 'styled-components';
import { SmileOutlined } from '@ant-design/icons';
import AppHeader from 'mods/website/profile/components/AppHeader';

const Wrapper = styled.div`
  border: 1px solid #efefef;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 1rem;
  border-radius: 0.5rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .header {
    display: flex;

    .logo {
      padding-right: 1rem;
      img {
        width: 80px;
        border-radius: 0.25rem;
      }
    }

    .desc {
      h5 {
        margin-bottom: 0.25rem;
      }

      .tags {
        margin-top: 0.25rem;
      }
    }
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .support-icon {
        margin-right: 0.5rem;
      }
    }
  }
  .comments {
    margin-top: 1rem;
  }
`;

const App = ({ app }) => (
  <Wrapper>
    <AppHeader
      logoImgSrc={app.logoImg?.medium}
      name={app.name}
      shortDesc={app.shortDesc}
      tags={app.tags}
    />
    <div className="actions">
      <div className="left">
        <SmileOutlined style={{ fontSize: 20 }} />
        &nbsp; Support this app &nbsp; &nbsp;
        <Text fontWeight="bold">25 supports</Text>
      </div>
    </div>
    <div className="comments">
      <Text color="gray.400">See all 10 comments...</Text>
      <div className="input">
        <Input placeholder="Write some feedback..." />
      </div>
    </div>
  </Wrapper>
);

App.propTypes = {
  app: PropTypes.object.isRequired,
};

export default App;

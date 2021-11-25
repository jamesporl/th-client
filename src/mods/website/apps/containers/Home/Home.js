import React from 'react';
import styled from 'styled-components';
import { Avatar, Col, Row, List, Typography } from 'antd';
import WebsiteLayout from '../../../components/WebsiteLayout';

const Wrapper = styled.div`
  width: 100%;
`;

const data = [
  {
    title: 'Tango',
    description: 'Lorem ipsum dolor sit amet.',
    logo: 'https://ph-files.imgix.net/dfa6e903-5496-42ef-bc11-695026039029.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2',
  },
  {
    title: 'Doodle AI',
    description: 'Ut feugiat et lectus nec sagittis. Sed luctus volutpat malesuada.',
    logo: 'https://ph-files.imgix.net/c46759c1-35f7-421f-9ea0-663428b756ae.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2',
  },
  {
    title: 'Twin Bee',
    description: 'Morbi neque nibh, pellentesque sit amet facilisis in, ultrices quis quam',
    logo: 'https://ph-files.imgix.net/39edff6e-631f-49dc-b5b8-6f041e84253d.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2',
  },
  {
    title: 'Super Galaxy',
    description: 'Nulla consequat, purus ut finibus laoreet, arcu nibh lacinia nisi.',
    logo: 'https://ph-files.imgix.net/9e2c97d8-add5-486c-ad65-bb9e9877d906.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=80&h=80&fit=crop&dpr=2',
  },
];

const Home = () => (
  <WebsiteLayout>
    <Wrapper>
      <Row gutter={[32, 32]}>
        <Col md={24} lg={16}>
          <Typography.Title level={4}>Top Apps</Typography.Title>
          <List
            bordered
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} size={64} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col md={24} lg={8}>
          <Typography.Title level={5}>This platform</Typography.Title>
          <p>
            <strong>Tech Hustlers</strong> is a community that aims to promote tech products built
            for Filipinos by Filipinos. Tech startups, web and mobile apps, e-commerce site owners,
            and software development teams are welcome to showcase their services here.
          </p>
        </Col>
      </Row>
    </Wrapper>
  </WebsiteLayout>
);

export default Home;

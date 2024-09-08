/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Skeleton, Badge, Layout } from 'antd';
import axios from 'axios';
import newImg from '../assets/news.jpg';
import '../components/card.css';

const { Title } = Typography;
const { Content } = Layout;

const Home = ({ cat }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNews = async () => {
    const options = {
      method: "GET",
      url: cat
        ? "https://google-news22.p.rapidapi.com/v1/topic-headlines"
        : "https://google-news22.p.rapidapi.com/v1/top-headlines",
      params: {
        country: "in",
        language: "en",
        ...(cat && { topic: cat }),
      },
      headers: {
        "x-rapidapi-key": "313094cebdmsh623661f1610c97ap1d4513jsn93cd4f3c90dc",
        "x-rapidapi-host": "google-news22.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const articles = response.data.data;
      setNews(articles);
    } catch (error) {
      setError(`Failed to fetch the ${cat} news\n${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getNews();
  }, [cat]);

  if (loading) {
    return (
      <Content style={{ maxWidth: '1200px', margin: 'auto', padding: '24px' }}>
        <Title level={2}>
          Loading <Badge count="News" style={{ backgroundColor: '#f5222d' }} />
        </Title>
        <Row gutter={[16, 16]}>
          {Array(6)
            .fill("")
            .map((_, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card cover={<Skeleton.Image style={{ width: '100%', height: '230px' }} />}>
                  <Skeleton active paragraph={{ rows: 3 }} />
                  <Skeleton.Button active style={{ width: '100%', marginTop: '16px' }} />
                </Card>
              </Col>
            ))}
        </Row>
      </Content>
    );
  }

  if (error) {
    return (
      <Content style={{ maxWidth: '1200px', margin: 'auto', padding: '24px' }}>
        <Typography.Text type="danger" style={{ whiteSpace: 'pre-line', fontSize: '18px' }}>
          {error}
        </Typography.Text>
      </Content>
    );
  }

  return (
    <Content style={{ maxWidth: '1200px', margin: 'auto', padding: '24px' }}>
      <Title level={2}>
        Trending <Badge count={cat ? `${cat} News` : "News"} style={{ backgroundColor: '#f5222d' }} />
      </Title>
      <Row gutter={[16, 16]}>
        {news.map((item, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              cover={
                <div className="card-image-container">
                  <img alt="example" src={item.thumbnail || newImg} style={{ height: '230px', objectFit: 'cover' }} />
                  <div className="shine"></div>
                </div>
              }
              actions={[
                <Button
                  type="primary"
                  block
                  key={index}
                  onClick={() => window.open(item.url, "_blank")}
                >
                  Read More
                </Button>,
              ]}
              bodyStyle={{ position: 'relative' }}
            >
              <Card.Meta title={item.title.slice(0, 250) + '...'} />
            </Card>
          </Col>
        ))}
      </Row>
    </Content>
  );
};

export default Home;

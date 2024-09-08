/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Heading, Text, Button, Skeleton, Badge, Image } from '@chakra-ui/react';
import axios from 'axios';
import newImg from '../assets/news.jpg';

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
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": import.meta.env.VITE_RAPID_HOST,
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
      <Box maxW="1200px" mx="auto" p="6">
        <Heading as="h2" size="lg" mb="4">
          Loading <Badge colorScheme="red">News</Badge>
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing="6">
          {Array(6)
            .fill("")
            .map((_, index) => (
              <Box key={index} borderRadius="md" overflow="hidden" bg="white">
                <Skeleton height="230px" />
                <Box p="4">
                  <Skeleton height="20px" mb="4" />
                  <Skeleton height="20px" mb="4" />
                  <Skeleton height="20px" mb="4" />
                  <Skeleton height="40px" />
                </Box>
              </Box>
            ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box maxW="1200px" mx="auto" p="6">
        <Text color="red.500" whiteSpace="pre-line" fontSize="lg">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p="6">
      <Heading as="h2" size="lg" mb="4">
        Trending <Badge colorScheme="red">{cat ? `${cat} News` : "News"}</Badge>
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing="6">
        {news.map((item, index) => (
          <Box key={index} borderRadius="md" overflow="hidden" bg="white">
            <Image
              src={item.thumbnail || newImg}
              alt="news-thumbnail"
              h="230px"
              objectFit="cover"
              w="100%"
              onClick={() => window.open(item.url, "_blank")}
              cursor="pointer"
            />
            <Box p="4">
              <Text fontWeight="bold" mb="2">
                {item.title.slice(0, 250) + '...'}
              </Text>
              <Button
                colorScheme="blue"
                onClick={() => window.open(item.url, "_blank")}
                w="100%"
              >
                Read More
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;

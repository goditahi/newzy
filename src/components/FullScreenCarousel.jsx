
import Slider from 'react-slick';
import { Box, Image,Text, useBreakpointValue } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const FullScreenCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const height = useBreakpointValue({ base: '60vh', md: '60vh' });

  const slides = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/1920x1080',
      alt: 'Slide 1',
      text: 'Welcome to our website',
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/1920x1080',
      alt: 'Slide 2',
      text: 'Discover amazing features',
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/1920x1080',
      alt: 'Slide 3',
      text: 'Join our community',
    },
  ];

  return (
    <Box
      position="relative"
      width="100%"
      height={height}
      overflow="hidden"
    >
      <Slider {...settings}>
        {slides.map(slide => (
          <Box key={slide.id} height={height} position="relative">
            <Image
              src={slide.imageUrl}
              alt={slide.alt}
              objectFit="cover"
              width="100%"
              height="100%"
            />
            <Box
              position="absolute"
              top="80%"
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
              color="white"
              px={4}
              py={2}
              
            >
              <Text fontSize="2xl" fontWeight="bold">
                {slide.text}
              </Text>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default FullScreenCarousel;

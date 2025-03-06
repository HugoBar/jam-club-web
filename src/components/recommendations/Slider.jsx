import React from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards"; // Import effect-cards CSS
import { Navigation, EffectCards } from "swiper/modules";

function SimpleSlider({ items }) {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
      }}
    >
      <Swiper
        modules={[Navigation, EffectCards]} // Use necessary Swiper modules
        spaceBetween={10}
        slidesPerView={1}
        navigation
        loop
        effect="cards"
        slideShadows={false}
      >
        {items ? (
          items.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 2,
                }}
              >
                <Card
                  sx={{
                    width: 300,
                    height: 400,
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={`Image of ${item.name}`}
                    height="300"
                    image={item.cover[0].url}
                    title={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.artists.join(", ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recomendado por: {item.userId.nickname}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </SwiperSlide>
          ))
        ) : (
          <p>PLACEHOLDER</p>
        )}
      </Swiper>
    </Box>
  );
}

export default SimpleSlider;

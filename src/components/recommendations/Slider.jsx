import React from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards"; // Import effect-cards CSS
import { Navigation, EffectCards } from "swiper/modules";
import OpenTrackButton from "../shared/openTrackButton";

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
        {items && items.length > 0 ? (
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
                    position: "relative",
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>

                      <OpenTrackButton url={item.externalUrls.spotify.uri} />
                    </Box>

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
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  AINDA NÃO HÁ RECOMENDAÇÕES
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  PODES SER O PRIMEIRO!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  FORÇA!
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Swiper>
    </Box>
  );
}

export default SimpleSlider;

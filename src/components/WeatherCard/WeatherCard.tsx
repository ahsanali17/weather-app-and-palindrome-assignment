import React from 'react'
import PropTypes from 'prop-types'
import { Box, Center, Text } from '@chakra-ui/react';

const WeatherCard = ({children}: any) => {
  return (
    <Center>
     <Box>
      <Text>{children?.humidity || "humidity"}</Text>
      <Text>{children?.windSpeed || "wind speed"}</Text>
      <Text>{children?.temperature || "temp"}</Text>
     </Box>
    </Center>
  )
}

WeatherCard.propTypes = {}

export default WeatherCard

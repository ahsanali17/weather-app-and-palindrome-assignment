import { useEffect, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Box, Button, Center, Flex, Text, Tooltip, VStack } from '@chakra-ui/react';

import { useGetWeatherDataByLonAndLanQuery } from '../../redux/services/openWeatherApi';
import { setKelvin } from '../../redux/features/temperature';
import {MoreWeatherDataModal} from '..';

type weatherCardProps = {
  handleSubmit: (e: FormEvent) => void,
  lat: string | number | undefined,
  lon: string | number | undefined,
  celsius: number,
  fahrenheit: number,
  switchRef: React.RefObject<HTMLInputElement>,
  isChecked: boolean,
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>,
}

const WeatherCard = ({handleSubmit , lat, lon, celsius, fahrenheit, switchRef, isChecked, setIsChecked }: weatherCardProps) => {
  const { data: weatherData, isLoading: weatherLoading, error: weatherError, refetch } = useGetWeatherDataByLonAndLanQuery({lat, lon});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const submitToStorage = async() => {
    try {
      const stringifiedWeatherData = await JSON.stringify(weatherData);
      localStorage.setItem('savedWeatherData', stringifiedWeatherData);
    } catch(err) {
      console.error('error', err);
    }
  }

  const handleMoreDetailsClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (switchRef.current) {
      setIsChecked(switchRef.current.checked);
    }
  }, [switchRef]);

  useEffect(() => {
    const setKelvinData = async () => {
      if (weatherData) {
        const kelvinData = await weatherData?.main?.temp;
        if(kelvinData !== '') {
          dispatch(setKelvin(kelvinData));
        }
      }
    }
    setKelvinData();
  }, [weatherData, dispatch]);

  useEffect(() => {
    if(!weatherData) {
      refetch()
    }
  }, [handleSubmit])

  console.log("weather:", weatherData)
  if(weatherError) {
    return (
      <Text>Couldn't retrieve cities weather data</Text>
    )
  }

  if(weatherLoading) {
    return (
      <Text>Loading Data...</Text>
    )
  }

  return (
    <Center>
     <Box>
      <VStack>
        <Text>
          Visibility: {weatherData?.visibility}
        </Text>
        <Text>
          Humidity: {weatherData?.main?.humidity}
        </Text>
        <Text>
          Wind Speed: {weatherData?.wind?.speed}
        </Text>
        <Flex>
          <Text>Temperature:</Text>
          <Box ml={1}>
            {weatherData?.name && (
              isChecked ? <Text>{Math.floor(fahrenheit)}°F</Text> : <Text>{Math.floor(celsius)}°C</Text>
              )}
          </Box>
        </Flex>
      </VStack>

      <Flex>
        <Box pt={5} mr={5}>
          <Tooltip placement='top' hasArrow label="Save to local storage">
            <Button name="SaveWeather" type='submit' onClick={submitToStorage}>Save Weather</Button>
          </Tooltip>
        </Box>
        <Box pt={5}>
          <Tooltip placement='top' hasArrow label="View more Weather Data">
            <Button name="MoreDetails" type='submit' onClick={handleMoreDetailsClick}>More Details</Button>
          </Tooltip>
          {isModalOpen && (
            <MoreWeatherDataModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              weatherData={weatherData}
            />
          )}
        </Box>
      </Flex>
     </Box>
    </Center>
  )
}

export default WeatherCard
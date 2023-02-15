import { FormEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardBody, CardFooter, Text, FormControl, FormLabel, Input, Button, Flex, Center, VStack, Tooltip } from '@chakra-ui/react';

import {WeatherCard, TemperatureToggler} from '../index'
import { useGetCityByNameQuery } from '../../redux/services/openWeatherApi';
import { RootState } from '../../redux/store/store';

type geoDataProps = {
  country: string,
  lat: string | number | undefined,
  local_names: {},
  lon: string | number | undefined,
  name: string,
  state: string,
}

type EventTargetValueProp = {
  target: {
    value: SetStateAction<string>;
  };
}

const Form = () => {
  const [cityName, setCityName] = useState<string>('');
  const [longitude, setLongitude] = useState<number | string | undefined>();
  const [latitude, setLatitude] = useState<number | string | undefined>();
  const [geoData, setGeoData] = useState<geoDataProps>()
  const [isChecked, setIsChecked] = useState(false);

  const { data: city, refetch: refetchCity} = useGetCityByNameQuery(cityName ? cityName : undefined)

  const { celsius, fahrenheit } = useSelector((state: RootState) => state.temperature)

  const handleChange = async (e: EventTargetValueProp) => {
    setCityName(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    refetchCity();
  }

  const switchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saveGeoData = async () => {
      try {
        await setGeoData(city?.length ? city?.[0] : '');
        return geoData;
      } catch(err) {
        console.error('error', err)
      }
    }
    saveGeoData();
  }, [city, handleSubmit])

  useEffect(() => {
    const saveLonAndLan = async () => {
      try {
        if(city?.length && geoData?.name === cityName && cityName) {
          await setLatitude(geoData?.lat);
          await setLongitude(geoData?.lon);
        }

      } catch(err) {
        console.error('error', err);
      }
    }
    saveLonAndLan();
  }, [geoData, handleSubmit])

  useEffect(() => {
    const handleStorageRetrieval = () => {
      const stringyWeatherData: string | null = localStorage.getItem('savedWeatherData');
      if(stringyWeatherData) {
        const parsedData = JSON.parse(stringyWeatherData);
        setCityName(parsedData.name);
      }
    }
    handleStorageRetrieval();
  }, [])

  // console.log("parsed", handleStorageRetrieval());
  // console.log(latitude, longitude, "444")
  // console.log(celsius, "cel", fahrenheit, "fah")

  return (
    <Center maxW="100%" textAlign="center" flexDirection="column" justifyContent="center">
    <Card width="50%" height="35rem" align="center" variant="elevated" borderWidth="1px" mt="100px">
      <CardHeader>
        <Text fontSize='3rem'>Weather App</Text>
        <Text fontSize='1rem'>Get a specific city's weather</Text>
      </CardHeader>
      <CardBody>
        <form id="weather-search">
          <FormControl>
            <FormLabel>Enter City Name</FormLabel>
            <Flex>
              <Input
                type="string"
                width="100%"
                name="cityName"
                placeholder="Retrieves city's weather data"
                value={cityName}
                onChange={handleChange}
              />
              <Tooltip placement='top' hasArrow label='Enter city name to get weather'>
                <Button type="submit" form="weather-search" onClick={handleSubmit}>
                  Search
                </Button>
              </Tooltip>
            </Flex>
          </FormControl>
        </form>
      </CardBody>

      <CardFooter height="100%" maxWidth="100%">
        <Flex>
          <VStack>
            <Flex>
              <Text fontSize='2rem'>Weather Details</Text>
              <Tooltip placement='right' hasArrow label="Celsius or Fahrenheit">
                <Center pl={5}>
                  <TemperatureToggler
                    switchRef={switchRef}
                    setIsChecked={setIsChecked}
                  />
                </Center>
              </Tooltip>
            </Flex>
            <br/>
            <WeatherCard
              handleSubmit={handleSubmit}
              lat={latitude}
              lon={longitude}
              celsius={celsius}
              fahrenheit={fahrenheit}
              switchRef={switchRef}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />

          </VStack>
        </Flex>
      </CardFooter>
    </Card>
  </Center>
);
};

export default Form;

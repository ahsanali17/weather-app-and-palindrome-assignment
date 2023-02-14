import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text, FormControl, FormLabel, Input, Button, Flex, Box, Center, VStack, Spacer } from '@chakra-ui/react';

import {WeatherCard, TemperatureToggler} from '../index'

const Form = () => {

 const handleSubmit = () => {

 }

  return (
   <Center maxW='100%' textAlign='center' flexDirection='column' justifyContent='center'>

    <Card width='50%' height='30rem' align="center" variant='elevated' borderWidth='1px' mt='100px'>
     <CardHeader>
      <Text fontSize={'3rem'}>Weather App</Text>
      <Text fontSize={'1rem'}>Get a specific cities weather</Text>
     </CardHeader>
     <CardBody>
      <form id="weather-search">
       <FormControl>
         <FormLabel>Enter City Name</FormLabel>
         <Flex>
          <Input type="string" width="100%" placeholder='Retrieves cities weather data'/>
           <Button type='submit' form="weather-search" onClick={handleSubmit}>Search</Button>
         </Flex>
       </FormControl>
      </form>
     </CardBody>

     <CardFooter height='100%' maxWidth='100%'>
        <Flex>
          <TemperatureToggler />
          <VStack>
            <Text ml={5}>Receive data below:</Text>
            <WeatherCard />
          </VStack>
        </Flex>
     </CardFooter>
    </Card>
   </Center>
  )
}

export default Form;

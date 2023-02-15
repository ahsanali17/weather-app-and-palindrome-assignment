import React, { Fragment } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, VStack } from '@chakra-ui/react';

type modalProps = {
 isModalOpen: boolean,
 setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
 weatherData: {},
}

const MoreWeatherDataModal = ({isModalOpen, setIsModalOpen, weatherData}: modalProps) => {

  const weatherDataArray = Object.entries(weatherData);

  console.log(weatherDataArray);
  return (
   <Modal
    size={'5xl'}
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
   >
    <ModalOverlay />
    <ModalContent>
     <ModalHeader>More Details</ModalHeader>
     <ModalCloseButton />
     <ModalBody>
      <VStack>
      {weatherDataArray.map(([key, value], index) => (
       <Fragment key={index}>
        <Text fontWeight="bold">{key}: </Text>
        <Text>{JSON.stringify(value)}</Text>
       </Fragment>
      ))}
      </VStack>
     </ModalBody>
    </ModalContent>
  </Modal>
 )
}


export default MoreWeatherDataModal;
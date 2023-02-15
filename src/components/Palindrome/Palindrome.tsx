import React, { useState } from 'react'
import { Card, CardHeader, CardBody, Center, Text, Highlight, Flex, FormControl, FormLabel, Input, Button, Tooltip, CardFooter, Box } from '@chakra-ui/react';

const Palindrome = () => {
  const [palindrome, setPalindrome] = useState('');
  const [isPalindrome, setIsPalindrome] = useState<boolean | null>(null);

  function isItPalindrome(str: string) {
    let reverse = str.split("").reverse().join("");
    console.log('reversing the word', reverse);

    if (reverse === str) {
      return setIsPalindrome(true);
    } else {
      return setIsPalindrome(false);
    }
  }

  return (
    <Center maxW="100%" textAlign="center" flexDirection="column" justifyContent="center">
    <Card width="50%" height="20rem" align="center" variant="elevated" borderWidth="1px" mt="100px">
      <CardHeader>
        <Text fontSize='3rem'>Palindrome Checker</Text>
        <Flex>
          <Text fontSize='1rem'>Check if your word is a palindrome. Example: <Highlight styles={{fontSize: '15px' ,fontWeight: 'bold'}} query={'racecar'} children={'racecar'} />
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <form id="weather-search">
          <FormControl>
            <FormLabel>Enter Word</FormLabel>
            <Flex>
              <Input
                type="string"
                width="100%"
                name="palindrome"
                placeholder="Check if word is a palindrome"
                value={palindrome}
                onChange={(e) => setPalindrome(e.target.value)}
              />
              <Tooltip placement='top' hasArrow label='Well is it a palindrome?'>
                <Button type="button" form="weather-search" onClick={(e) => {
                  e.preventDefault()
                  isItPalindrome(palindrome)
                }}>
                  Search
                </Button>
              </Tooltip>
            </Flex>
          </FormControl>
        </form>
      </CardBody>
      <CardFooter>
        <Center>
          <Box mr={10}>
          {isPalindrome === true && (
            <Text fontSize="2xl" color="green.500">Yes, it's a palindrome!</Text>
          )}
          {isPalindrome === false && (
            <Text fontSize="2xl" color="red.500">No, it's not a palindrome.</Text>
          )}
          </Box>
        </Center>
      </CardFooter>
    </Card>
  </Center>
  )
}


export default Palindrome;
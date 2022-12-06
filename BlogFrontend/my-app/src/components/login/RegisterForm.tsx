import { VStack, Input, Button, Text, Box } from '@chakra-ui/react';
import React from 'react';

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  submitRegister: () => Promise<void>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterForm = ({
  username,
  email,
  password,
  submitRegister,
  setUsername,
  setEmail,
  setPassword,
}: IRegisterForm) => {
  return (
    <VStack align='left' spacing='1rem' width='100%'>
      <Box>
        <Text>Username</Text>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type='text'
        />
      </Box>
      <Box>
        <Text>Email</Text>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
        />
      </Box>
      <Box>
        <Text>Password</Text>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
        />
      </Box>
      <Button onClick={submitRegister}> Sign Up ! </Button>
    </VStack>
  );
};

export default RegisterForm;

import {
    Flex,
    VStack,
    Text,
    Heading,
    Input,
    Divider,
    Button,
    useToast,
    HStack,
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import Logout from '../components/logout';
  
  const BlogHome = () => {
    const [blog, setBlog] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const toast = useToast();
    const fetchBlog = async () => {
      const request = await fetch('/api/v1/blog', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const data = await request.json();
      setBlog(data);
    };
    const addNewblog = async () => {
      try {
        if (!title) {
          return;
        }
  
        const request = await fetch('/api/v1/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({ title }),
        });
  
        const data = await request.json();
  
        if (request.status !== 201) {
          toast({
            title: data.message,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
          return;
        }
        fetchBlog();
        setTitle('');
      } catch (error) {
        console.log(error);
        toast({
          title: 'Server Error !',
          status: 'error',
          duration: 3000,
          position: 'top',
        });
      }
    };
    useEffect(() => {
        fetchBlog();
    }, []);
  
    const deleteblog = async (id: string) => {
      try {
        const request = await fetch(`/api/v1/blog/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
  
        const data = await request.json();
  
        if (request.status !== 200) {
          toast({
            title: data.message,
            status: 'error',
            duration: 3000,
            position: 'top',
          });
          return;
        }
        toast({
          title: data.message,
          status: 'success',
          duration: 3000,
          position: 'top',
        });
        fetchBlog();
      } catch (error) {
        console.log(error);
        toast({
          title: 'Server Error !',
          status: 'error',
          duration: 3000,
          position: 'top',
        });
      }
    };
  
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh'>
        <VStack spacing='3rem'>
          <Heading>Blog</Heading>
          <VStack border='1px' padding='10' width='20rem' borderRadius='0.2rem'>
            {blog.map((blog: any) => (
              <HStack
                overflow='auto'
                width='100%'
                key={blog.id}
                border='1px'
                padding='3'
                justifyContent='space-between'
                borderRadius='0.5rem'
              >
                <Text fontSize='1rem'>{blog.title}</Text>
                <Button
                  onClick={() => deleteblog(blog.id)}
                  backgroundColor='red.400'
                >
                  Delete
                </Button>
              </HStack>
            ))}
  
            <VStack spacing='1rem' mt='2rem !important'>
              <Divider color='white' backgroundColor='white' />
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Add new blog'
              />
              <Button onClick={addNewblog} width='100%'>
                Add blog
              </Button>
            </VStack>
          </VStack>
          <Logout />
        </VStack>
      </Flex>
    );
  };
  
  export default BlogHome;
  
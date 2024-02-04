"use client";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import emailjs from "@emailjs/browser";
import axios from "axios";
import {
  ChakraProvider,
  useRadioGroup,
  Stack,
  Text,
  HStack,
  useRadio,
  chakra,
  Box,
  Image,
} from "@chakra-ui/react";

import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";

export default function CreatePage({ posts }) {
  function CustomRadio(props) {
    const { image, ...radioProps } = props;
    const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
      useRadio(radioProps);

    return (
      <chakra.label {...htmlProps} cursor="pointer">
        <input {...getInputProps({})} hidden />
        <Box
          {...getRadioProps()}
          bg={state.isChecked ? "green.200" : "transparent"}
          w={12}
          p={1}
          rounded="full"
        >
          <Image src={image} rounded="full" {...getLabelProps()} />
        </Box>
      </chakra.label>
    );
  }

  const toast = useToast();
  const avatars = [
    { name: "Kat", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Kevin", image: "https://randomuser.me/api/portraits/men/86.jpg" },
    { name: "Andy", image: "https://randomuser.me/api/portraits/men/29.jpg" },
    { name: "Jess", image: "https://randomuser.me/api/portraits/women/95.jpg" },
  ];

  const handleChange = (value) => {
    toast({
      title: `The value got changed to ${value}!`,
      status: "success",
      duration: 2000,
    });
  };

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: "Kevin",
    onChange: handleChange,
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    emailjs
      .send("service_jc1unvt", "template_de7n915", values, "K2i9c6y8AURAqNsTW")
      .then(
        () => {
          console.log("success");
          toast({
            title: "Email Sent",
            description: "You are subscribed to Jesse's news letter.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        },
        (err) => {
          toast({
            title: "Not Sent",
            description: "sorry",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          console.log(err);
        }
      );

    values["action"] = "add";
  }

  return (
    <Layout>
      <ChakraProvider>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <Center>
            <FormControl
              p={2}
              w={{
                base: 375,
                md: 400,
                xl: 600,
              }}
              isInvalid={errors.name}
            >
              <Input
                mt={2}
                id="title"
                borderColor="blue.400"
                placeholder="title"
                {...register("title", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <Input
                mt={2}
                id="image_url"
                borderColor="blue.400"
                placeholder="image_url"
                {...register("image_url", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <Input
                mt={2}
                id="summary"
                borderColor="blue.400"
                placeholder="summary"
                {...register("summary", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <Input
                mt={2}
                id="post_url"
                borderColor="blue.400"
                placeholder="post_url"
                {...register("post_url", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />

              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </Center>
          <Center>
            <Stack {...getRootProps()}>
              <Text>The selected radio is: {value}</Text>
              <HStack>
                {avatars.map((avatar) => {
                  return (
                    <CustomRadio
                      key={avatar.name}
                      image={avatar.image}
                      {...getRadioProps({ value: avatar.name })}
                    />
                  );
                })}
              </HStack>
            </Stack>
          </Center>
          <Center>
            <Button
              className="z-10"
              mt={4}
              color="white"
              bg="purple.500"
              isLoading={isSubmitting}
              type="submit"
            >
              Send Email
            </Button>
          </Center>
        </form>
      </ChakraProvider>
    </Layout>
  );
}
export async function getStaticProps() {
  // Fetch data from your API using Axios
  try {
    const response = await axios.get("http://localhost:3000/api/posts", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const posts = response.data;
    console.log("postssss");
    console.log(posts);
    // Pass the fetched data as props to the component
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    // Return an empty array if there's an error
    return {
      props: {
        posts: [],
      },
    };
  }
}

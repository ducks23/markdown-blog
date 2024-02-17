"use client";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import emailjs from "@emailjs/browser";
import { ChakraProvider } from "@chakra-ui/react";

import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";

export default function EmailForm() {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    emailjs
      .send(
        "service_jc1unvt",
        "template_de7n915",
        { test_val: "hello world" },
        "K2i9c6y8AURAqNsTW"
      )
      .then(
        () => {
          console.log("success");
        },
        (err) => {
          console.log(err);
          console.log("error");
        }
      );

    values["action"] = "add";
    console.log(values)
    fetch("https://jesseleonard.app/api/subscribe", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 200) {
          emailjs
            .send(
              "service_jc1unvt",
              "template_rued7sh",
              values,
              "K2i9c6y8AURAqNsTW"
            )
            .then(
              () => {
                console.log("success");
              },
              (err) => {
                console.log(err);
                console.log("error");
              }
            );
          toast({
            title: "Email Sent",
            description: "You are subscribed to Jesse's news letter.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else if (res.status === 201) {
          toast({
            title: "You are already subscribed",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Not Sent",
            description: "sorry",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .then((data) => {
        console.log(data);
      });
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
                id="email"
                borderColor="blue.400"
                placeholder="Email"
                {...register("email", {
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
            <Button
              className="z-10"
              mt={4}
              color="white"
              bg="purple.500"
              isLoading={isSubmitting}
              type="submit"
            >
              Subscribe
            </Button>
          </Center>
        </form>
      </ChakraProvider>
    </Layout>
  );
}

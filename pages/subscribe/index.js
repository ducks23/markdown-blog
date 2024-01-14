import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

import Layout from "../../components/layout";
import AWS from "aws-sdk";

import { ChakraProvider } from "@chakra-ui/react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  useToast,
  Center,
} from "@chakra-ui/react";

export default function EmailForm() {
  const toast = useToast();

  const lambda = new AWS.Lambda({
    region: "us-west-2",
    accessKeyId: "AKIASV7FIZCBAKETOV6T", //process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: "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", //process.env.AWS_SECRET_ACCESS_KEY,
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    values["action"] = "add";

    const params = {
      FunctionName: "myLambdaFunction", // replace with your function name
      Payload: JSON.stringify(values), // replace with your payload
    };
    lambda.invoke(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        toast({
          title: "Error",
          description: "Didn't work",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (parseInt(data.Payload) === 200) {
        emailjs
          .send(
            "service_jc1unvt",
            "template_rued7sh",
            values,
            "K2i9c6y8AURAqNsTW"
          )
          .then(
            () => {
              toast({
                title: "Email Sent",
                description: "You are subscribed to Jesse's news letter.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            },
            (err) => {
              console.log(err);
              toast({
                title: "Not Sent",
                description: "sorry",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          );
      } else if (parseInt(data.Payload) === 201) {
        toast({
          title: "You are already subscribed",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }
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

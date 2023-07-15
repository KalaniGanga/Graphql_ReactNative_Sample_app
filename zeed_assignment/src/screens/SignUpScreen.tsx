import React, { memo, useState } from "react";
import {
  Background,
  Header,
  Button,
  TextInput,
  BackButton,
  Toast,
} from "../components";
import { emailValidator, passwordValidator } from "../core/utils";
import { Navigation } from "../types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { insertUserMutation } from "../graphql";
import { useMutation } from "@apollo/client";

type Props = {
  navigation: Navigation;
};

const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [name, setName] = useState({ value: "", error: "" });
  const [insertUser] = useMutation(insertUserMutation);
  const [error, setError] = useState("");

  const _onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        const insertData = async () => {
          await insertUser({
            variables: {
              email: email.value,
              name: name.value,
              user_id: user.uid,
            },
          })
            .then(() => {
              navigation.navigate("LoginScreen");
            })
            .catch((e) => {
              console.log(e);
            });
        };
        insertData();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("LoginScreen")} />
      <Header>Sign Up</Header>
      <TextInput
        label="Name"
        returnKeyType="done"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed}>
        Sign up
      </Button>

      <Toast message={error} onDismiss={() => setError("")} />
    </Background>
  );
};

export default memo(SignUpScreen);

import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import Link from "next/link";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../contexts/auth";
import withoutAuth from "../hocs/withoutAuth";
import Routes from "../constants/routes";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { login } = useAuth();
  const router = useRouter();

  // if (user) {
  //   router.push(Routes.HOME);
  // }
  const onFinishLog = async (formData) => {
    try {
      const userData = {
        ...formData,
      };
      const response = await login(userData);
      console.log("response", response);
      setUserInfo(response.data);

      setResult("User logged in");
      reset();
      router.push(Routes.HOME);
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;
      setResult("Ocurrió un error :(");

      if (response) {
        if (response.data) {
          const errors = response.data; // Return .errors from API
          const errorObject = Object.values(errors); // Return array
          const list = [];
          const errorList = [];
          let words = "";
          for (let letter in errorObject) {
            if (
              errorObject[letter] !== "{" &&
              errorObject[letter] !== "[" &&
              errorObject[letter] !== "]" &&
              errorObject[letter] !== '"' &&
              errorObject[letter] !== ","
            ) {
              words += errorObject[letter];
              if (errorObject[letter] === ".") {
                list.push(words);
                words = "";
              }
            }
          }
          for (let error in list) {
            let text = list[error];
            let parts = text.split(":");
            errorList.push(parts[1]);
          }
          // for (let field in errors) {
          //   errorList.push(...errors[field]);
          // }
          setErrorsList(errorList);
        }
      }
    }
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onFinishLog)}>
        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Email"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Contraseña"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.password?.message}</p>
        </div>
        <Button type="submit" color="primary" variant="contained">
          Iniciar sesión
        </Button>
        <p>{result}</p>
        {userInfo && <div></div>}
        {errorsList.length > 0 && (
          <ul>
            {errorsList.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </form>
      ,{" "}
      <div>
        <p>
          No tienes una cuenta aùn?{" "}
          <Link href="/registro" passHref>
            <MuiLink>Registrarme</MuiLink>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default withoutAuth(LoginPage);

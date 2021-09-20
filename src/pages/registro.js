import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import User from "../api/user";
import { Button, TextField, Link as MuiLink } from "@material-ui/core";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";
import withoutAuth from "../hocs/withoutAuth";
import styles from "@/styles/Home.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Este campo es obligatorio"),
  email: yup
    .string()
    .email("Ingrese un correo válido")
    .required("Este campo es obligatorio"),
  password: yup
    .string()
    .min(6, "Ingrese al menos 6 caracteres")
    .required("Este campo es obligatorio"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las claves no coinciden")
    .required("Este campo es obligatorio"),
  editorial: yup.string().required("Este campo es obligatorio"),
  short_bio: yup.string().max(250).required("Este campo es obligatorio"),
});

const RegisterPage = () => {
  const {
    //register,
    handleSubmit,
    watch,
    formState: { errors },
    //reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { register } = useAuth();

  const onSubmit = async (formData) => {
    console.log("formData", formData);
    setUserInfo(null); // Clean the info
    setResult("Enviando los datos...");
    try {
      //formData.role = 'ROLE_USER';
      const userData = {
        ...formData,
        role: "ROLE_USER", // Use from dynamic route to select if it's finca or acopio
      };
      const response = await register(userData);
      setUserInfo(response.data);
      setResult("Usuario registrado correctamente");
      // reset({
      // ingredientDescription: "",
      // ingredientType: "None",
      // cost: "",
      // name: "",
      // RadioGroup: "",
      // quantity: "",
      // });
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

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className={styles.main}>
      <div>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link href="/inicioSesion" passHref>
            <MuiLink>Iniciar sesión</MuiLink>
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/*<div>
          register your input into the hook by invoking the "register" function
          <input defaultValue="test" {...register("example")} />
        </div>
        include validation with required or other standard HTML validation rules
        <div>
          <input {...register("exampleRequired", { required: true })} />
        </div>*/}
        <div>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                variant="outlined"
                size="small"
              />
            )}
          />
          {/*<input*/}
          {/*  {...register("name", { required: true })}*/}
          {/*  placeholder="Nombre"*/}
          {/*/>*/}
          <p>{errors.name?.message}</p>
          {errors.firstName?.type === "required" && <span>Name is empty</span>}
        </div>
        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Correo electrónico"
                variant="outlined"
                size="small"
              />
            )}
          />
          {/*<input*/}
          {/*  type="email"*/}
          {/*  {...register("email")}*/}
          {/*  placeholder="Correo electrónico"*/}
          {/*/>*/}
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
          {/*<input*/}
          {/*  type="password"*/}
          {/*  {...register("password")}*/}
          {/*  placeholder="Contraseña"*/}
          {/*/>*/}
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <Controller
            name="password_confirmation"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Confirme su Contraseña"
                variant="outlined"
                size="small"
              />
            )}
          />
          {/*<input*/}
          {/*  type="password"*/}
          {/*  {...register("password_confirmation")}*/}
          {/*  placeholder="Confirme su Contraseña"*/}
          {/*/>*/}
          <p>{errors.password_confirmation?.message}</p>
        </div>
        <div>
          <Controller
            name="editorial"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Editorial"
                variant="outlined"
                size="small"
              />
            )}
          />
          {/*<input*/}
          {/*  type="text"*/}
          {/*  {...register("editorial")}*/}
          {/*  placeholder="Editorial"*/}
          {/*/>*/}
          <p>{errors.editorial?.message}</p>
        </div>
        <div>
          <Controller
            name="short_bio"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                maxRows={4}
                label="Biografía corta"
                variant="outlined"
                size="small"
              />
            )}
          />
          {/*<textarea {...register("short_bio")} placeholder="Biografía corta" />*/}
          <p>{errors.short_bio?.message}</p>
        </div>
        <p>{result}</p>
        {userInfo && (
          <div>
            <p>Nombre: {userInfo.name}</p>
            <p>Token: {userInfo.token}</p>
          </div>
        )}
        {errorsList.length > 0 && (
          <ul>
            {errorsList.map((errorList) => (
              <li key={errorList}>{errorList}</li>
            ))}
          </ul>
        )}
        {/* errors will return when field validation fails, exit from useForm  */}
        {/*errors.exampleRequired && <span>This field is required</span>*/}
        {/*<input type="submit" />*/}
        <Button type="submit" color="primary" variant="contained">
          Registrarme
        </Button>
      </form>
    </div>
  );
};

export default withoutAuth(RegisterPage);

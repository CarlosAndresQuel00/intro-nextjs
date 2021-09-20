import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@material-ui/core";
import * as yup from "yup";
import Article from "../../api/article";

const schema = yup.object().shape({
  title: yup.string().required("Este campo es obligatorio"),
  body: yup.string().required("Este campo es obligatorio"),
  category_id: yup.string().required("Este campo es obligatorio"),
  image: yup.mixed().required("Este campo es obligatorio"),
});

const NewPostPage = () => {
  const {
    register,
    handleSubmit,
    //watch,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    // Object native of JavaScript to send formularies data -> Object Form
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("category_id", values.category_id);
    formData.append("image", values.image[0]);
    const response = await Article.create(formData);
    console.log("response", response);
    reset();
  };

  return (
    <div>
      <h1>Crear un nuevo post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Título"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.title?.message}</p>
        </div>
        <div>
          <Controller
            name="body"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                maxRows={4}
                label="Texto del artículo"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.body?.message}</p>
        </div>
        <div>
          <Controller
            name="category_id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="ID de la categoría"
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.category_id?.message}</p>
        </div>
        <div>
          <input {...register("image")} type="file" />
          {/*<Controller*/}
          {/*  name="image"*/}
          {/*  control={control}*/}
          {/*  defaultValue=""*/}
          {/*  render={({ field }) => <input {...field} type="file" />}*/}
          {/*/>*/}
          <p>{errors.image?.message}</p>
        </div>
        <Button type="submit" color="primary" variant="contained">
          Crear artículo
        </Button>
      </form>
    </div>
  );
};

export default NewPostPage;

import { useRouter } from "next/router";
import useSWR from "swr"; // For private routes, and internally to manage the useState and useEffect. It's a hook
//import { useEffect, useState } from "react";
import api from "../../api";
import Image from "next/image";

const fetcher = (url) =>
  api
    .get(url, {
      headers: {
        Authorization: "Bearer token", // Pending, client-side
      },
    })
    .then((res) => res.data);

// PostPageParameter
const IngredientDetailPage = (/*{ ingredient }*/) => {
  //const [ingredient, setIngredient] = useState(null);
  const router = useRouter(); // render again with the parameter

  const { id } = router.query;
  console.log("id", id);

  //const { data: ingredient, error } = useSWR(() => "/ingredients/" + id, fetcher); // Alias to data
  const { data, error } = useSWR(`/ingredients/${id}`, fetcher); // Render, Lightweight -> Liviano, Gana el foco -> Update

  if (error) {
    return "Ocurrió un error";
  }

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`/ingredients/${id}`, {
  //         headers: {
  //           Authorization: "Bearer token", // Pending
  //         },
  //       });
  //       console.log("response", response.data);
  //       setIngredient(response.data); // It's not a collection, if not it's a resource
  //     } catch (e) {}
  //   };
  //
  //   getData();
  // }, [id]);

  // useEffect(() => {
  //   if (+id === 2) {
  //     // Read as integer because it's a route string
  //     router.replace("/"); // Replace or clean the route
  //   }
  // });

  // if (!ingredient) {
  //   return "Cargando datos...";
  // }

  if (!data) {
    return "Cargando datos...";
  }

  return (
    <div>
      <Image src={data.image} width={400} height={300} />
      <p>Nombre: {data.name}</p>
      <button onClick={() => router.push("/ingredientes")}>
        Regresar a la lista de ingredientes
      </button>
    </div>
  );
};

export default IngredientDetailPage;

// No because it's a private route
/*
export async function getStaticProps({ params }) {
  let ingredient = null;
  try {
    const response = await api.get(`/ingredients/${params.id}`
    //{headers: {Authorization: "Bearer token", // Pending},}
    );
    console.log("response", response);
    ingredient = response.data;
  } catch (e) {
    console.log("error", e);
  }

  return {
    props: {
      ingredient,
    }, // will be passed to the page component as props
    revalidate: 10, // Time to regenerate pages
  };
}

export async function getStaticPaths() {
  const response = await api.get("/ingredients");
  const ingredients = response.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = ingredients.map((ingredient) => ({
    params: { id: "" + ingredient.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
*/

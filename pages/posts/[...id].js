import {useRouter} from "next/router";

const PostPageParameters = () => {
    // Test
    const router = useRouter(); // render again with the parameter
    console.log("router", router.query);

    const {id} = router.query; // all that comes of routes to store in id
    console.log("id", id);

    // router.push (add the route)
    // router.prefetch (preload the page in background)

    return(
        <div>
            El valor del parametro es: {id}

            <br/><button onClick={() => router.push("/hola")}>Ir a Hola</button>
        </div>
    );
};

export default PostPageParameters;
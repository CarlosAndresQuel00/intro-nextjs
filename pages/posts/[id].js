import {useRouter} from "next/router";
import {useEffect} from "react";

const PostPageParameter = () => {
    const router = useRouter(); // render again with the parameter
    console.log("router", router.query);

    const {id} = router.query;
    console.log("id", id);

    useEffect(() => {
        if (+id === 2) { // Read as integer because it's a route string
            router.replace("/"); // Replace or clean the route
        }
    })

    return(
        <div>
            El valor del parametro es: {id}
        </div>
    );
};

export default PostPageParameter;
import { Link as MuiLink } from "@material-ui/core";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <Link href="/registro" passHref>
        <MuiLink>Registrarme</MuiLink>
      </Link>
    </div>
  );
};

export default LoginPage;

import React from "react";
import Link from "next/link";
import { Link as MuiLink } from "@material-ui/core";
import ProfileMenu from "@/components/ProfileMenu";
import { useAuth } from "../contexts/auth";
import { Skeleton } from "@material-ui/lab";

const AuthMenu = () => {
  const { user } = useAuth();

  if (user === null) {
    return <Skeleton variant="rect" width={100} height={30} />;
  }

  if (!user) {
    return (
      <Link href="/inicioSesion" passHref>
        <MuiLink component="button" color="inherit">
          Login
        </MuiLink>
      </Link>
    );
  }

  return <ProfileMenu />;
};

export default AuthMenu;

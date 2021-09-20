// 3rd Libraries
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
// import Link from "next/link";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import { AuthProvider } from "@/contexts/auth";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "@/styles/theme";
// import MenuIcon from "@material-ui/icons/Menu";
// import {
//   AppBar,
//   // Button,
//   IconButton,
//   // makeStyles,
//   Toolbar,
//   Typography,
//   Link as MuiLink,
// } from "@material-ui/core";
// import styled from "styled-components";
// //My own Libraries
// import { AuthProvider } from "../contexts/auth";
// import ProfileMenu from "@/components/ProfileMenu";
// import AuthMenu from "../components/AuthMenu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../public/nprogress.css";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

export default function MyApp(props) {
  const { Component, pageProps } = props;
  // const auth = false;
  // const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Blog de Carlos</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

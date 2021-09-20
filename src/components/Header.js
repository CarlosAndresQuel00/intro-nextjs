import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
import AuthMenu from "@/components/AuthMenu";
import styled from "styled-components";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/*<StyledIconButton*/}
        {/*  edge="start"*/}
        {/*  // className={classes.menuButton}*/}
        {/*  color="inherit"*/}
        {/*  aria-label="menu"*/}
        {/*>*/}
        {/*  <MenuIcon />*/}
        {/*</StyledIconButton>*/}
        {/*----------------------------------------------------*/}
        {/*<Typography variant="h6" className={classes.title}>*/}
        {/*  News*/}
        {/*</Typography>*/}
        <BlogTitle variant="h6">Blog de Carlos</BlogTitle>
        {/*!auth ? <Button color="inherit">Login</Button> : <ProfileMenu />*/}
        <AuthMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

// const StyledIconButton = styled(IconButton)`
//   margin-right: 5px;
//   background: #eaeaea;
// `;

const BlogTitle = styled(Typography)`
  flex-grow: 1;
`;

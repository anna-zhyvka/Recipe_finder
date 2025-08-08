import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  styled,
  alpha,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
} from "@mui/material";
import { Restaurant, Home, Favorite, Search, Kitchen, Language } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipe } from "../Redux/RecipeActions";

const SearchDiv = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavBar = () => {
  const searchItem = useSelector((state) => state.searchItem);
  const [recipeName, setRecipe] = useState("");
  const favouriteRecipe = useSelector((state) => state.favouriteRecipe);
  const [badgeValue, setBadgeValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🟡 Синхронізація Redux -> local + автоматичний пошук
  useEffect(() => {
    if (searchItem) {
      setRecipe(searchItem); // вставляє в поле пошуку
      dispatch(fetchRecipe(searchItem)); // автоматично робить запит
    }
  }, [searchItem, dispatch, navigate]);

  useEffect(() => {
    setBadgeValue(favouriteRecipe.length);
  }, [favouriteRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeName.trim()) {
      dispatch(fetchRecipe(recipeName));
      navigate("/home");
    }
  };

  return (
      <>
        <Box sx={{ flexGrow: 1, height: "64px" }}>
          <AppBar
              position="fixed"
              elevation={0}
              sx={{
                backgroundColor: "rgba(255, 229, 208, 0.75)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                color: "#000",
              }}
          >
            <Toolbar sx={{ justifyContent: "space-between", width: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Restaurant sx={{ display: { md: "flex" }, mr: 1, fontSize: "2rem" }} />
                <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "'Brush Script MT', cursive",
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "#B85C38",
                      fontSize: "3rem",
                      mr: 4,
                    }}
                >
                  Recipe Finder
                </Typography>
                <SearchDiv onSubmit={handleSubmit} sx={{ width: "300px", mr: 2 }}>
                  <SearchIconWrapper>
                    <Search />
                  </SearchIconWrapper>
                  <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      value={recipeName}
                      onChange={(e) => setRecipe(e.target.value)}
                  />
                </SearchDiv>
              </Box>

              {/* Іконки вирівняні праворуч і збільшені */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Link to="/SearchList" style={{ color: "inherit" }}>
                  <IconButton color="inherit">
                    <Home sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </Link>

                <Link to="/refrigerator" style={{ color: "inherit" }}>
                  <IconButton color="inherit">
                    <Kitchen sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </Link>

                <Link to="/world" style={{ color: "inherit" }}>
                  <IconButton color="inherit">
                    <Language sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </Link>

                <Link to="/Favourite" style={{ color: "inherit" }}>
                  <IconButton color="inherit">
                    <Badge badgeContent={badgeValue} color="error">
                      <Favorite sx={{ fontSize: "2rem" }} />
                    </Badge>
                  </IconButton>
                </Link>

              </Box>
            </Toolbar>

          </AppBar>
        </Box>
      </>
  );
};

export default NavBar;

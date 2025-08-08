import React from "react";
import {
  Box,
  Grid,
  Chip,
  Typography,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchRecipe, setSearchItem } from "../Redux/RecipeActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const SearchList = () => {
  const searchList = [
    "carrot", "broccoli", "asparagus", "cauliflower", "corn", "cucumber", "green pepper",
    "lettuce", "mushrooms", "onion", "potato", "pumpkin", "red pepper", "tomato", "beetroot",
    "brussel sprouts", "peas", "zucchini", "radish", "sweet potato", "artichoke", "leek",
    "cabbage", "celery", "chili", "garlic", "basil", "coriander", "parsley", "dill", "rosemary",
    "oregano", "cinnamon", "saffron", "green bean", "bean", "chickpea", "lentil", "apple",
    "apricot", "avocado", "banana", "blackberry", "blackcurrant", "blueberry", "boysenberry",
    "cherry", "coconut", "fig", "grape", "grapefruit", "kiwifruit", "lemon", "lime", "lychee",
    "mandarin", "mango", "melon", "nectarine", "orange", "papaya", "passion fruit", "peach",
    "pear", "pineapple", "plum", "pomegranate", "quince", "raspberry", "strawberry", "watermelon",
    "salad", "pizza", "pasta", "popcorn", "lobster", "steak", "bbq", "pudding", "hamburger", "pie",
    "cake", "sausage", "tacos", "kebab", "poutine", "seafood", "chips", "fries", "masala", "paella",
    "som tam", "chicken", "toast", "marzipan", "tofu", "ketchup", "hummus", "maple syrup",
    "parma ham", "fajitas", "champ", "lasagna", "poke", "chocolate", "croissant", "arepas",
    "bunny chow", "pierogi", "donuts", "rendang", "sushi", "ice cream", "duck", "curry", "beef",
    "goat", "lamb", "turkey", "pork", "fish", "crab", "bacon", "ham", "pepperoni", "salami", "ribs",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 425,
        md: 768,
        lg: 1024,
        xl: 1440,
      },
    },
  });

  const handleClick = (value) => {
    dispatch(setSearchItem(value));
    dispatch(fetchRecipe(value));
    navigate("/home"); // переходить до результатів
  };

  return (
      <>
        <NavBar />
        <ThemeProvider theme={theme}>
          <Box
              sx={{
                minHeight: "100vh",
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=3432&auto=format&fit=crop)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "flex-start", // щоб текст був зверху
                justifyContent: "center",
                pt: 10, // padding-top щоб опустити трохи нижче після NavBar
                px: 2,
              }}
          >
            <Paper
                elevation={6}
                sx={{
                  backdropFilter: "blur(5px)",
                  backgroundColor: "rgba(255,255,255,0.6)",
                  borderRadius: 4,
                  padding: 4,
                  width: "100%",
                  maxWidth: "1300px",
                }}
            >
              <Typography
                  align="center"
                  color="textPrimary"
                  variant="h3"
                  mb={4}
                  fontWeight="bold"
                  sx={{ mt: 2 }} // трохи зміщує вниз всередині Paper
              >
                Available search queries
              </Typography>

              <Grid container align="center" spacing={2}>
                {searchList.map((value) => (
                    <Grid item xs={4} sm={3} md={2} lg={1.5} xl={1} key={value}>
                      <Chip
                          label={value}
                          onClick={() => handleClick(value)}
                          clickable
                          sx={{
                            bgcolor: "white",
                            ":hover": { bgcolor: "#fddcc4" },
                          }}
                      />
                    </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </ThemeProvider>
      </>
  );
};

export default SearchList;

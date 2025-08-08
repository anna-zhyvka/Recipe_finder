import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Alert from "./Alert";
import {
    Typography,
    Toolbar,
    Button,
    Paper,
    Box,
    Container,
    CssBaseline,
    Stack, Divider, Chip,
} from "@mui/material";
import { Person, AccessTime } from "@mui/icons-material";
import { fetchRecipeItem, addToFavourite } from "../Redux/RecipeActions";
import NavBar from "./NavBar";

const RecipeInstruction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipeInstruction = useSelector((state) => state.recipeInstruction);
  const favouriteRecipe = useSelector((state) => state.favouriteRecipe);

  const {
    publisher,
    source_url,
    image_url,
    title,
    servings,
    cooking_time,
    ingredients,
  } = recipeInstruction;

  const [showalert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchRecipeItem(id));
  }, [id, dispatch]);

  const handleAddClick = () => {
    const existingItem = favouriteRecipe.find((value) => value.id === id);
    if (existingItem) setShowAlert(true);
    else dispatch(addToFavourite({ image_url, publisher, title, id }));
  };

  return (
      <>
          <NavBar />
          <CssBaseline />
          <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 5 } }}>
              <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  justifyContent="center"
                  alignItems="stretch"
                  gap={4}
              >
                  <Paper
                      elevation={6}
                      sx={{
                          width: { xs: "100%", md: 450 },
                          borderRadius: 3,
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          aspectRatio: "4/3",
                      }}
                  >
                      <img
                          src={image_url}
                          alt="Recipe"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                  </Paper>

                  <Box
                      flex={1}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      gap={2}
                      px={1}
                  >
                      <Typography variant="h4" fontWeight={700} gutterBottom>
                          {title}
                      </Typography>

                      <Typography variant="subtitle1" color="text.secondary">
                          by {publisher}
                      </Typography>

                      <Stack direction="row" spacing={4} alignItems="center" flexWrap="nowrap">
                          <Stack direction="row" spacing={1} alignItems="center">
                              <Person color="action" />
                              <Typography variant="body1">Serving size: {servings}</Typography>
                          </Stack>
                          <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              sx={{ display: "flex", alignItems: "center" }} // Додаємо сюди
                          >
                              <AccessTime color="action" />
                              <Typography variant="body1">Cooking time: {cooking_time} mins</Typography>
                          </Stack>
                      </Stack>




                      <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={2}
                          mt={2}
                          alignItems="flex-start"
                      >
                          <Button
                              variant="contained"
                              href={source_url}
                              target="_blank"
                              sx={{
                                  backgroundColor: "#ffd4b2",
                                  color: "#000",
                                  textTransform: "none",
                                  fontWeight: "bold",
                                  borderRadius: "8px",
                                  px: 3,
                                  "&:hover": {
                                      backgroundColor: "#ffbb8a",
                                  },
                              }}
                          >
                              Detail Recipe
                          </Button>

                          <Button
                              variant="outlined"
                              onClick={handleAddClick}
                              sx={{
                                  borderColor: "#ffbb8a",
                                  color: "#000",
                                  textTransform: "none",
                                  fontWeight: "bold",
                                  borderRadius: "8px",
                                  px: 3,
                                  "&:hover": {
                                      backgroundColor: "#ffe4d1",
                                      borderColor: "#ffbb8a",
                                  },
                              }}
                          >
                              Add to Favourite
                          </Button>

                          <Alert open={showalert} setOpen={setShowAlert} />
                      </Stack>
                  </Box>
              </Box>

              <Box my={6}>
                  <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
                      Ingredients
                  </Typography>
                  <Divider sx={{ mb: 3 }} />

                  <Stack spacing={1} component="ul" sx={{ pl: 0, listStyle: "none" }}>
                      {ingredients?.map((value, index) => (
                          <li key={index}>
                              <Chip
                                  label={`${value.quantity || ""} ${value.unit || ""} ${value.description}`.trim()}
                                  variant="outlined"
                                  color="default"
                                  sx={{ px: 2, py: 1 }}
                              />
                          </li>
                      ))}
                  </Stack>
              </Box>
          </Container>
      </>
  );
};

export default RecipeInstruction;

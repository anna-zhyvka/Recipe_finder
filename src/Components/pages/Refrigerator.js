// Оновлена версія компонента:
import React, { useState } from 'react';
import { Autocomplete } from "@mui/material";
import NavBar from "../NavBar";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite, fetchRecipe } from "../../Redux/RecipeActions";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Alert from "../Alert";

const ingredients = [
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

const RefrigeratorPage = () => {
    const [recipeName, setRecipe] = useState("");
    const [productList, setProductList] = useState([]);
    const allRecipes = useSelector((state) => state.allRecipeData);
    const [showalert, setShowAlert] = useState(false);
    const favouriteRecipe = useSelector((state) => state.favouriteRecipe);
    const dispatch = useDispatch();

    const onRandomGenerate = () => {
        dispatch(fetchRecipe(productList.join('+')));
    };

    const onAddProduct = () => {
        if (recipeName.trim()) {
            setProductList([...productList, recipeName]);
            setRecipe("");
        }
    };

    const onDeleteProduct = (itemName) => {
        setProductList(productList.filter(item => item !== itemName));
    };

    const handleAddClick = (recipe) => {
        const existingItem = favouriteRecipe.find((value) => value.id === recipe.id);
        if (existingItem) setShowAlert(true);
        else dispatch(addToFavourite(recipe));
    };

    return (
        <>
            <NavBar />
            <Box
                sx={{
                    minHeight: "100vh",
                    // backgroundImage:
                    //     "url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=3432&auto=format&fit=crop)",
                    // backgroundRepeat: "repeat", // дозволяє зображенню повторюватися
                    // backgroundSize: "cover", // або 'auto', або 'cover' + 'repeat-y' залежно від потреб
                    // backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    px: 2,
                    py: 10,
                }}
            >
                <Box sx={{backgroundImage:
                        "url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=3432&auto=format&fit=crop)",
                    backgroundRepeat: "repeat", // дозволяє зображенню повторюватися
                    backgroundSize: "cover", // або 'auto', або 'cover' + 'repeat-y' залежно від потреб
                    backgroundPosition: "center",
                    width: '100vw',
                    height: '100%',
                    position: "absolute",
                    top: '0',
                    left: '0',
                }}/>



            <Box
                    sx={{
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                        borderRadius: "16px",
                        p: 4,
                        margin: "0 auto",
                        maxWidth: "85vw",  // або будь-яка ширина: "1200px", "90%", "70vw", тощо
                        width: "100%",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                        <Box sx={{ width: { xs: "100%", md: "40%" }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ width: "100%", maxWidth: 300, mb: 2 }}>
                                <Autocomplete
                                    freeSolo
                                    options={ingredients}
                                    value={recipeName}
                                    onInputChange={(event, newValue) => setRecipe(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Products"
                                            variant="outlined"
                                            fullWidth
                                            InputLabelProps={{
                                                sx: {
                                                    color: "#ffbb8a",
                                                    "&.Mui-focused": { color: "#ffbb8a" },
                                                },
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: "12px",
                                                    backgroundColor: "#f9f9f9",
                                                    "& fieldset": { borderColor: "#ccc" },
                                                    "&:hover fieldset": { borderColor: "#ffbb8a" },
                                                    "&.Mui-focused fieldset": { borderColor: "#ffbb8a" },
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Button
                                    variant="contained"
                                    onClick={onAddProduct}
                                    sx={{
                                        backgroundColor: "#ffd4b2",
                                        color: "#000",
                                        mt: 1,
                                        textTransform: "none",
                                        fontWeight: "bold",
                                        borderRadius: "12px",
                                        px: 3,
                                        py: 1,
                                        "&:hover": { backgroundColor: "#ffbb8a" },
                                    }}
                                >
                                    Add Product
                                </Button>
                            </Box>

                            <Box sx={{ position: "relative", width: "100%", maxWidth: 350 }}>
                                <img
                                    src="https://www.supercoloring.com/sites/default/files/styles/coloring_medium/public/cif/2022/01/refrigerator-coloring-page_2.png"
                                    alt="fridge"
                                    style={{ width: "100%", borderRadius: "8px" }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "25%",
                                        left: "10%",
                                        right: "10%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    {productList.map((item) => (
                                        <Card
                                            key={item}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                width: '160px',
                                                px: 1.5,
                                                py: 0.5,
                                                boxShadow: 2,
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>{item}</Typography>
                                            <IconButton size="small" onClick={() => onDeleteProduct(item)} sx={{ color: 'red' }}>
                                                <Close fontSize="small" />
                                            </IconButton>
                                        </Card>
                                    ))}
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                onClick={onRandomGenerate}
                                sx={{
                                    backgroundColor: "#ffd4b2",
                                    color: "#000",
                                    mt: 3,
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    borderRadius: "12px",
                                    px: 3,
                                    py: 1,
                                    "&:hover": { backgroundColor: "#ffbb8a" },
                                }}
                            >
                                Generate random recipe
                            </Button>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "60%" } }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>Recipe Finder</Typography>
                            <Grid container spacing={3}>
                                {allRecipes.map((value) => (
                                    <Grid item xs={12} sm={6} md={6} lg={4} key={value.id}>
                                        <Card>
                                            <Link
                                                to={`/RecipeInstruction/${value.id}`}
                                                style={{ textDecoration: "none", color: "inherit" }}
                                            >
                                                <CardActionArea>
                                                    <CardMedia sx={{ height: 140 }} image={value.image_url} />
                                                    <CardContent>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h6"
                                                            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                                        >
                                                            {value.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {value.publisher}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Link>
                                            <CardActions>
                                                <Button
                                                    size="small"
                                                    onClick={() => handleAddClick(value)}
                                                    sx={{
                                                        backgroundColor: "#ffd4b2",
                                                        color: "#000",
                                                        textTransform: "none",
                                                        "&:hover": { backgroundColor: "#ffbb8a" },
                                                    }}
                                                >
                                                    Add Favorite
                                                </Button>
                                                <Alert open={showalert} setOpen={setShowAlert} />
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default RefrigeratorPage;

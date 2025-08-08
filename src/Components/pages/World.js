import React, {useState} from 'react';
import {Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Alert from "../Alert";
import {useDispatch, useSelector} from "react-redux";
import {addToFavourite, fetchRecipe} from "../../Redux/RecipeActions";
import NavBar from "../NavBar";

const countries = [
    {
        flag: "🇮🇹",
        title: "Italy",
        products: ["Pasta", "Tomatoes", "Parmesan", "Basil", "Olive Oil"],
    },
    {
        flag: "🇯🇵",
        title: "Japan",
        products: ["Rice", "Seaweed", "Soy Sauce", "Tofu", "Wasabi"],
    },
    {
        flag: "🇲🇽",
        title: "Mexico",
        products: ["Tortilla", "Beans", "Avocado", "Chili", "Corn"],
    },
    {
        flag: "🇫🇷",
        title: "France",
        products: ["Baguette", "Cheese", "Wine", "Butter", "Garlic"],
    },
    {
        flag: "🇺🇸",
        title: "USA",
        products: ["Beef", "Cheddar", "Potatoes", "Ketchup", "Bread"],
    },
    {
        flag: "🇨🇳",
        title: "China",
        products: ["Noodles", "Ginger", "Soy Sauce", "Bok Choy", "Pork"],
    },
    {
        flag: "🇮🇳",
        title: "India",
        products: ["Lentils", "Rice", "Turmeric", "Cumin", "Ghee"],
    },
    {
        flag: "🇺🇦",
        title: "Ukraine",
        products: ["Beetroot", "Dill", "Salo", "Wheat", "Cabbage"],
    },
    {
        flag: "🇬🇷",
        title: "Greece",
        products: ["Feta", "Olives", "Lamb", "Yogurt", "Oregano"],
    },
];

const getRandomItem = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
};

const World = () => {
    const allRecipes = useSelector((state) => state.allRecipeData);
    const [showalert, setShowAlert] = useState(false);
    const favouriteRecipe = useSelector((state) => state.favouriteRecipe);
    const dispatch = useDispatch();

    const onRandomGenerate = (products) => {
        const product = getRandomItem(products);
        dispatch(fetchRecipe(product));
    };

    const handleAddClick = (recipe) => {
        const existingItem = favouriteRecipe.find(
            (value) => value.id === recipe.id
        );
        if (existingItem) setShowAlert(true);
        else dispatch(addToFavourite(recipe));
    };

    return (
        <>
            <NavBar/>
            <div style={{padding: '10px'}}>
                <Box sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        {countries.map((data, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    onClick={() => onRandomGenerate(data.products)}
                                    sx={{
                                        cursor: "pointer",
                                        transition: "0.3s",
                                        borderRadius: "16px",
                                        boxShadow: 2,
                                        textAlign: "center",
                                        py: 2,
                                        "&:hover": {
                                            boxShadow: 6,
                                            transform: "scale(1.02)",
                                            backgroundColor: "#fff7f0",
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h2" component="div">
                                            {data.flag}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            {data.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <div className={'fsdfsd'}>
                    <Grid container spacing={5}>
                        {allRecipes.map((value) => (
                            <Grid item>
                                <Card sx={{ width: 240, maxWidth: "100%", borderRadius: "16px", boxShadow: 3 }}>
                                    <Link
                                        to={{ pathname: `/RecipeInstruction/${value.id}` }}
                                        style={{ textDecoration: "none", color: "inherit", width: '200px' }}
                                    >
                                        <CardActionArea>
                                            <CardMedia
                                                sx={{ height: 140 }}
                                                image={value.image_url}
                                            />
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    sx={{
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {value.title}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
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
                                                fontWeight: "bold",
                                                borderRadius: "8px",
                                                textTransform: "none",
                                                px: 2,
                                                py: 1,
                                                "&:hover": {
                                                    backgroundColor: "#ffbb8a",
                                                },
                                            }}
                                        >
                                            Add to Favourite
                                        </Button>
                                        <Alert open={showalert} setOpen={setShowAlert} />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default World;

import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
    Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordConditions = {
        minLength: {
            test: (value) => value.length >= 8,
            message: "Password must be at least 8 characters",
        },
        uppercase: {
            test: (value) => /[A-Z]/.test(value),
            message: "Password must include at least one uppercase letter",
        },
        digit: {
            test: (value) => /\d/.test(value),
            message: "Password must include at least one digit",
        },
        specialChar: {
            test: (value) => /[!@#$%^&*()_\-+=<>?]/.test(value),
            message: "Password must include at least one special character",
        },
    };

    const peachColor = "#FAD6C4";
    const peachHover = "#F4A88B";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        const updatedErrors = { ...errors };

        if (name === "email") {
            updatedErrors.email = emailRegex.test(value) ? null : "Invalid email format";
        }

        if (name === "password") {
            const passwordErrors = [];

            for (const key in passwordConditions) {
                if (!passwordConditions[key].test(value)) {
                    passwordErrors.push(passwordConditions[key].message);
                }
            }

            updatedErrors.password = passwordErrors.length ? passwordErrors : null;

            if (form.confirmPassword && form.confirmPassword !== value) {
                updatedErrors.confirmPassword = "Passwords do not match";
            } else {
                updatedErrors.confirmPassword = null;
            }
        }

        if (name === "confirmPassword") {
            updatedErrors.confirmPassword =
                value === form.password ? null : "Passwords do not match";
        }

        setErrors(updatedErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!form.email || !emailRegex.test(form.email)) {
            validationErrors.email = "Invalid email format";
        }

        const passwordErrors = [];
        for (const key in passwordConditions) {
            if (!passwordConditions[key].test(form.password)) {
                passwordErrors.push(passwordConditions[key].message);
            }
        }

        if (!form.password) {
            passwordErrors.unshift("Password is required");
        }

        if (passwordErrors.length) {
            validationErrors.password = passwordErrors;
        }

        if (!form.confirmPassword) {
            validationErrors.confirmPassword = "Please confirm your password";
        } else if (form.password !== form.confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            navigate("/SearchList");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=3432&auto=format&fit=crop)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: 8,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.92)",
                    borderRadius: 4,
                    p: 5,
                    width: "100%",
                    maxWidth: 480,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    mr: 24, // <- форма трохи лівіше
                }}
            >

            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <span style={{ fontSize: 60 }} className="material-icons"></span>
                        <Typography
                            variant="h3"
                            sx={{
                                fontFamily: "'Brush Script MT', cursive",
                                fontStyle: "italic",
                                fontWeight: 400,
                                color: "#B85C38",
                                fontSize: "4.5rem",
                            }}
                        >
                            Recipe Finder
                        </Typography>
                        <span style={{ fontSize: 60}} className="material-icons"></span>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />
                <Typography variant="h6" align="center" fontFamily="italic">
                    Create Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: peachColor,
                                },
                            },
                            "& label.Mui-focused": {
                                color: peachHover,
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.password}
                        helperText={
                            Array.isArray(errors.password) ? (
                                <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                                    {errors.password.map((err, i) => (
                                        <li key={i} style={{ fontSize: "0.75rem" }}>{err}</li>
                                    ))}
                                </ul>
                            ) : (
                                errors.password
                            )
                        }
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: peachColor,
                                },
                            },
                            "& label.Mui-focused": {
                                color: peachHover,
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: peachColor,
                                },
                            },
                            "& label.Mui-focused": {
                                color: peachHover,
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            borderRadius: 2,
                            backgroundColor: peachColor,
                            color: "#5A2E2E",
                            fontWeight: 600,
                            "&:hover": {
                                backgroundColor: peachHover,
                            },
                        }}
                    >
                        REGISTER
                    </Button>

                </Box>
            </Paper>
        </Box>
    );
}

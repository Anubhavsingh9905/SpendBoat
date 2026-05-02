import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function setEveryThing() {
            if (token) {
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setAuthenticated(true);
                setIsLoading(false);
                
                const res = await getUser();
                setUser(res);
                getExpenses();
                // console.log(res);
            } else {
                setAuthenticated(false);
                setIsLoading(false);
            }
        }

        setEveryThing();
    }, []);

    const getUser = async () => {
        const response = await api.get("/user");
        const {user} = response.data;
        // console.log(user);
        return user;
    }

    const register = async (userData) => {

        try {
            setIsLoading(true);

            const response = await api.post("/register", userData);
            const { user, token} = response.data;

            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            setAuthenticated(true);
            setUser(user);
            // setBudget(budget);

            navigate("/dashboard");

            return true;
        } catch (error) {
            console.log(error)
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (loginCredentials) => {

        try {
            setIsLoading(true);

            const response = await api.post("/login", loginCredentials);
            const { user, token} = response.data;

            // console.log(loginCredentials);

            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            setAuthenticated(true);
            setUser(user);
            // setBudget(budget);
            console.log(user);

            navigate("/dashboard");
            
            return true;
        } catch (error) {
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const logout = () => {

        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];

        setAuthenticated(false);
        setUser(null);
        // setBudget(null);

        navigate("/");
    }

    const getExpenses = async() => {
        const now = new Date();
        const month = now.getMonth(), year = now.getFullYear();

        const response = await api.get(`/expense/myexpenses?month=${month}&year=${year}`);
        // console.log(response.data);
        setExpenses(response.data);
    }

    const value = {
        isLoading,
        user,
        isAuthenticated,
        getExpenses,
        expenses,
        register,
        login,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
import { useEffect, useState } from "react";

import axios from "axios";
import type { Dairy } from "../types/Dairy";

export default function dairyProducts() {
const [products, setProducts] = useState<Dairy[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
useEffect(() => { 
    async function fetchProducts() {
    try {
            const res = await axios.get("http://localhost:3000/dairy");
            setProducts(res.data);
        } catch {
            setError("Failed to load dairy products");
        } finally {
            setLoading(false);
        }
}
fetchProducts();
}, []);


return { products, loading, error };
}
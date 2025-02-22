import React, { useEffect, useState } from "react";
import { getAllFlowers } from "../API-Services/FlowerApi"; // Fetch flowers
import api from "../API-Services/axiosConfig"; // ✅ Import axios for posting data
import "../PagesCSS/FlowerPage.css"; // ✅ Import the CSS

const FlowerPage = () => {
    const [flowers, setFlowers] = useState([]);
    const [showForm, setShowForm] = useState(false); // ✅ Controls form visibility
    const [flowerName, setFlowerName] = useState("");
    const [flowerPrice, setFlowerPrice] = useState("");

    useEffect(() => {
        fetchFlowers();
    }, []);

    const fetchFlowers = async () => {
        try {
            const response = await getAllFlowers();
            console.log("Fetched Flowers:", response); 
            if (response.success) {
                setFlowers(response.data);
            } else {
                console.error("Error: Failed to fetch flowers");
            }
        } catch (error) {
            console.error("Error fetching flowers:", error);
        }
    };

    // ✅ Add new flower to the database
    const addFlower = async () => {
        if (!flowerName || !flowerPrice) {
            alert("Please enter both flower name and price.");
            return;
        }

        try {
            const newFlower = {
                flname: flowerName,
                price: parseFloat(flowerPrice),
            };

            const response = await api.post("/insertFlower", newFlower);
            console.log("Added Flower:", response.data);

            // ✅ Update flower list dynamically
            setFlowers([...flowers, response.data]);
            setShowForm(false); // Hide form after adding
            setFlowerName("");
            setFlowerPrice("");
        } catch (error) {
            console.error("Error adding flower:", error);
        }
    };

    return (
        <div className="flower-page">
           
            <h2>Flower List</h2>
            <div className="add-button-container">
            {/* ✅ Add Flower Button */}
            <button className="add-flower-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add Flower"}
            </button>
            </div>
            {/* ✅ Flower Form (Inside Red Container) */}
            {showForm && (
                <div className="flower-form-container">
                    <div className="flower-form">
                        <input 
                            type="text" 
                            placeholder="Flower Name" 
                            value={flowerName} 
                            onChange={(e) => setFlowerName(e.target.value)} 
                        />
                        <input 
                            type="number" 
                            placeholder="Price" 
                            value={flowerPrice} 
                            onChange={(e) => setFlowerPrice(e.target.value)} 
                        />
                        <button onClick={addFlower}>Add</button>
                    </div>
                </div>
            )}

            <ul className="flower-list">
                {flowers.length > 0 ? (
                    flowers.map((flower) => (
                        <li key={flower.fid} className="flower-card">
                            <span className="flower-name">{flower.flname}</span> - 
                            <span className="flower-price"> ₱ {flower.price}.00</span>
                        </li>
                    ))
                ) : (
                    <p>No flowers available.</p> 
                )}
            </ul>
        </div>
    );
};

export default FlowerPage;

import React, { useEffect, useState } from "react";
import { getAllFlowers } from "../API-Services/FlowerApi"; // Fetch flowers
import api from "../API-Services/axiosConfig"; // Import axios for API calls
import "../PagesCSS/FlowerPage.css"; // Import CSS

const FlowerPage = () => {
    const [flowers, setFlowers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [flowerName, setFlowerName] = useState("");
    const [flowerPrice, setFlowerPrice] = useState("");
    const [editingFlower, setEditingFlower] = useState(null); // Track the flower being edited

    useEffect(() => {
        fetchFlowers();
    }, []);

    const fetchFlowers = async () => {
        try {
            const response = await getAllFlowers();
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

            setFlowers([...flowers, response.data]);
            setShowForm(false);
            setFlowerName("");
            setFlowerPrice("");
        } catch (error) {
            console.error("Error adding flower:", error);
        }
    };

    // ✅ Start editing a flower
    const startEditing = (flower) => {
        setEditingFlower(flower);
        setFlowerName(flower.flname);
        setFlowerPrice(flower.price);
        setShowForm(true);
    };

    // ✅ Update flower details
    const updateFlower = async () => {
        if (!flowerName || !flowerPrice) {
            alert("Please enter both flower name and price.");
            return;
        }

        try {
            const updatedFlower = {
                flname: flowerName,
                price: parseFloat(flowerPrice),
            };

            const response = await api.put(`/updateFlower?fid=${editingFlower.fid}`, updatedFlower);

            setFlowers(
                flowers.map((flower) =>
                    flower.fid === editingFlower.fid ? response.data : flower
                )
            );

            setEditingFlower(null);
            setFlowerName("");
            setFlowerPrice("");
            setShowForm(false);
        } catch (error) {
            console.error("Error updating flower:", error);
        }
    };

    return (
        <div className="flower-page">
            <div className="add-button-container">
                <button className="add-flower-btn" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : editingFlower ? "Edit Flower" : "Add Flower"}
                </button>
            </div>

            {/* ✅ Flower Form */}
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
                        <button onClick={editingFlower ? updateFlower : addFlower}>
                            {editingFlower ? "Update" : "Add"}
                        </button>
                    </div>
                </div>
            )}

            {/* ✅ Display Flowers */}
            <ul className="flower-list">
                {flowers.length > 0 ? (
                    flowers.map((flower) => (
                        <li key={flower.fid} className="flower-card">
                            <span className="flower-name">{flower.flname}</span> - 
                            <span className="flower-price"> ₱ {flower.price}.00</span>
                            <button onClick={() => startEditing(flower)}>Edit</button>
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

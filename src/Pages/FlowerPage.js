import React, { useEffect, useState } from "react";
import { getAllFlowers,addFlower,updateFlower,deleteFlower } from "../API-Services/FlowerApi";
import api from "../API-Services/axiosConfig";
import "../PagesCSS/FlowerPage.css";

const FlowerPage = () => {
    const [flowers, setFlowers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false); // ✅ Add Flower Modal
    const [showEditModal, setShowEditModal] = useState(false); // ✅ Edit Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false); // ✅ Delete Modal
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [flowerName, setFlowerName] = useState(""); // ✅ For adding flower
    const [flowerPrice, setFlowerPrice] = useState("");
    const [editName, setEditName] = useState(""); // ✅ For editing flower
    const [editPrice, setEditPrice] = useState("");

    useEffect(() => {
        fetchFlowers();
    }, []);

    // ✅ Fetch all flowers
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

    // ✅ Open Add Flower Modal
    const handleAddClick = () => {
        setFlowerName("");
        setFlowerPrice("");
        setShowAddModal(true);
    };

    // ✅ Add new flower
    const addFlowerHandler = async () => { // Renamed to avoid conflict with imported `addFlower`
        if (!flowerName || !flowerPrice) {
            alert("Please enter both flower name and price.");
            return;
        }
    
        try {
            const newFlower = { flname: flowerName, price: parseFloat(flowerPrice) };
            const response = await addFlower(newFlower); // Using imported API function
    
            if (response.success) {
                setFlowers([...flowers, response.data]);
                setShowAddModal(false);
                console.error("new flower added!");
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Error adding flower:", error);
        }
    };
    

    // ✅ Open Edit Modal
    const handleEditClick = (flower) => {
        setSelectedFlower(flower);
        setEditName(flower.flname);
        setEditPrice(flower.price);
        setShowEditModal(true);
    };

    // ✅ Update flower
    const updateFlowerHandler = async () => {
        if (!selectedFlower) return;
    
        try {
            const updatedFlower = { flname: editName, price: parseFloat(editPrice) };
            const response = await updateFlower(selectedFlower.fid, updatedFlower); // Use API service
    
            if (response.success) {
                setFlowers(flowers.map((flower) => (flower.fid === selectedFlower.fid ? response.data : flower)));
                setShowEditModal(false);
                setSelectedFlower(null);
                console.error("THIS FLOWER IS SUCCESSFULLY UPDATED!");
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error("Error updating flower:", error);
        }
    };
    

    // ✅ Open Delete Confirmation Modal
    const handleDeleteClick = (flower) => {
        setSelectedFlower(flower);
        setShowDeleteModal(true);
    };

    // ✅ Confirm & delete flower
    const confirmDelete = async () => {
        if (!selectedFlower) return;
    
        try {
            const response = await deleteFlower(selectedFlower.fid); // Use the imported API function
    
            if (response.success) {
                setFlowers(flowers.filter((flower) => flower.fid !== selectedFlower.fid));
                setShowDeleteModal(false);
                setSelectedFlower(null);
                console.log("SUCCESSFULLY DELETED THE FLOWER!")
            } else {
                console.error(response.message);
                alert(response.message); // Notify the user if deletion fails
            }
        } catch (error) {
            console.error("Error deleting flower:", error);
        }
    };
    
    return (
        <div className="flower-page">
            <h2>Flower Shop</h2>

            {/* ✅ Add Flower Button */}
            <button className="add-flower-btn" onClick={handleAddClick}>Add Flower</button>

            {/* ✅ Flower List */}
            <ul className="flower-list">
                {flowers.length > 0 ? (
                    flowers.map((flower) => (
                        <li key={flower.fid} className="flower-card">
                            <span className="flower-name">{flower.flname}</span> - 
                            <span className="flower-price"> ₱ {flower.price}.00</span>
                            <button className="edit-btn" onClick={() => handleEditClick(flower)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteClick(flower)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No flowers available.</p>
                )}
            </ul>

            {/* ✅ Add Flower Modal */}
            {showAddModal && (
                <>
                    <div className="overlay"></div>
                    <div className="modal">
                        <h3>Add New Flower</h3>
                        <input 
                            type="text" 
                            value={flowerName} 
                            onChange={(e) => setFlowerName(e.target.value)} 
                            placeholder="Flower Name"
                        />
                        <input 
                            type="number" 
                            value={flowerPrice} 
                            onChange={(e) => setFlowerPrice(e.target.value)} 
                            placeholder="Price"
                        />
                        <button className="save-btn" onClick={addFlowerHandler}>Add</button>
                        <button className="cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>
                </>
            )}

            {/* ✅ Edit Flower Modal */}
            {showEditModal && (
                <>
                    <div className="overlay"></div>
                    <div className="modal">
                        <h3>Edit Flower</h3>
                        <input 
                            type="text" 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)} 
                            placeholder="Flower Name"
                        />
                        <input 
                            type="number" 
                            value={editPrice} 
                            onChange={(e) => setEditPrice(e.target.value)} 
                            placeholder="Price"
                        />
                        <button className="save-btn" onClick={updateFlowerHandler}>Save</button>
                        <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                    </div>
                </>
            )}

            {/* ✅ Delete Confirmation Modal */}
            {showDeleteModal && (
                <>
                    <div className="overlay"></div>
                    <div className="modal">
                        <h3>Are you sure you want to delete this flower?</h3>
                        <p>{selectedFlower?.flname}</p>
                        <button className="delete-confirm-btn" onClick={confirmDelete}>OK</button>
                        <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FlowerPage;

import api from "./axiosConfig"; // ✅ Import configured Axios instance

// ✅ Fetch all flowers from the backend
export const getAllFlowers = async () => {
    try {
        const response = await api.get(process.env.REACT_APP_SPRINGBOOT_GET_FLOWERS);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error fetching flowers: ", error);
        return { success: false, message: "Failed to fetch flowers" };
    }
};

// ✅ Add a new flower to the database
export const addFlower = async (flowerData) => {
    try {
        const response = await api.post(process.env.REACT_APP_SPRINGBOOT_INSERT_FLOWER, flowerData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error adding flower: ", error);
        return { success: false, message: "Failed to add flower" };
    }
};

// ✅ Update an existing flower (by ID)
export const updateFlower = async (fid, newFlowerData) => {
    try {
        const response = await api.put(
            `${process.env.REACT_APP_SPRINGBOOT_UPDATE_FLOWER}?fid=${fid}`, 
            newFlowerData
        );
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error updating flower: ", error);
        return { success: false, message: "Failed to update flower" };
    }
};

// ✅ Delete a flower from the database (by ID)
export const deleteFlower = async (fid) => {
    try {
        const response = await api.delete(`${process.env.REACT_APP_SPRINGBOOT_DELETE_FLOWER}/${fid}`);
        return { success: true, message: response.data };
    } catch (error) {
        console.error("Error deleting flower: ", error);
        return { success: false, message: "Failed to delete flower" };
    }
};

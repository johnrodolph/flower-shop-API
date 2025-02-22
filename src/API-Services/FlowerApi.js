import api from "./axiosConfig"; // ✅ Import configured Axios instance

export const getAllFlowers = async () => {
    try {
        const response = await api.get(process.env.REACT_APP_SPRINGBOOT_GET_FLOWERS);
        //console.log(response.data)
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error fetching flowers: ", error);
        return { success: false, message: "Failed to fetch flowers" };
    }
};

export const updateFlower = async (fid, updatedFlower) => {
    try {
        const response = await api.put(`${process.env.REACT_APP_SPRINGBOOT_UPDATE_FLOWER}?fid=${fid}`, updatedFlower);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error updating flower: ", error);
        return { success: false, message: "Failed to update flower" };
    }
};
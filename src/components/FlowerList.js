import React, { useEffect, useState } from "react";
import { getAllFlowers } from "../services/api";

const FlowerList = () => {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        fetchFlowers();
    }, []);

    const fetchFlowers = async () => {
        const data = await getAllFlowers();
        setFlowers(data);
    };

    return (
        <div>
            <h2>Flower List</h2>
            <ul>
                {flowers.length > 0 ? (
                    flowers.map(flower => (
                        <li key={flower.fid}>
                            {flower.flname} - ${flower.price}
                        </li>
                    ))
                ) : (
                    <p>No flowers available.</p>
                )}
            </ul>
        </div>
    );
};

export default FlowerList;

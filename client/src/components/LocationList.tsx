import { useEffect, useState } from 'react';
import { Location } from '../types/location';
import { locationService } from '../services/api';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const LocationList = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await locationService.getAllLocations();
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Địa điểm nổi bật</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location, index) => (
                    <motion.div
                        key={location._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative h-48">
                            <img
                                src={location.images[0] || 'https://via.placeholder.com/400x300'}
                                alt={location.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                                <FaMapMarkerAlt className="text-red-500" />
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">{location.name}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-2">{location.description}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-400 mr-1" />
                                    <span className="text-gray-700">{location.rating.toFixed(1)}</span>
                                </div>
                                <span className="text-sm text-gray-500">{location.address}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LocationList;
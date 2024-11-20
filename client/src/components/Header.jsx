import React from 'react';
import { motion } from 'framer-motion';
import './Header.css'
import carLogo from '../assets/logo.png';

export const Header = () => {
    return (
        <div className="navbar bg-base-300">
            <img
                    src={carLogo}
                    alt="logo"
                    className="ml-5 h-10"
                />
            <motion.div 
                className='animated-text text-4xl font-extrabold italic ml-24' 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.5 }}
            >
                ToDo App
            </motion.div>
        </div>
    )
}

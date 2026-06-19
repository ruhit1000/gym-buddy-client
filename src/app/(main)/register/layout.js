import React from 'react';

export const metadata = {
    title: 'Register - Gym Buddy',
    description: 'Create your account on Gym Buddy to access personalized workout plans, track your progress, and connect with a community of fitness enthusiasts.',
}

const RegisterLayout = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default RegisterLayout;
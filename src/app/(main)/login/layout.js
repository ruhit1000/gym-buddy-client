import React from 'react';

export const metadata = {
    title: 'Login - Gym Buddy',
    description: 'Access your Gym Buddy account to manage your fitness journey, track your progress, and connect with a community of fitness enthusiasts.',
}

const LoginPageLayout = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default LoginPageLayout;
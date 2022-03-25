import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Create context and set default values.
const UserContext = createContext({
	user: null,
	login: () => {},
});

export const UserContextProvider = ({ children }) => {
	const users = [
		{
			name: 'Rental Company',
			role: 'rental',
			color: '#8193E7',
		},
		{
			name: 'John',
			role: 'borrower',
			color: '#8193E7',
		},
	];

	const [user, setUser] = useState(users[1]);

	const router = useRouter();

	useEffect(() => {
		if (user.role === 'rental') {
			router.push('/common/rental');
		} else if (user.role === 'borrower') {
			router.push('/borrower/rent');
		} 
	}, [user]);

	const login = (role) => {
		if (role === 'rental') {
			setUser(users[0]);
		} else if (role === 'borrower') {
			setUser(users[1]);
		} 
	};

	const context = { user, login };

	return (
		<UserContext.Provider value={context}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;

import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';

import { useRouter } from 'next/router';

function BorrowerMenu() {
	const router = useRouter();

	return (
		<Menu
			mode="inline"
			defaultSelectedKeys={['/transfer']}
			style={{ height: '100%', borderRight: 0 }}
		>
			<Menu.Item key="/transfer" onClick={() => router.push('/borrower/rent')}>
				Rent Car
			</Menu.Item>
			<Menu.Item key="/bank-loans" onClick={() => router.push('/common/rental')}>
				Catalogue
			</Menu.Item>
		</Menu>
	);
}

export default BorrowerMenu;

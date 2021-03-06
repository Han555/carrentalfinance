import React from 'react';
import { Row, Col } from 'antd';
import BorrowersTable from '../../components/userManagement/BorrowersTable';

function BrokersManager() {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<BorrowersTable />
			</Col>
		</Row>
	);
}

export default BrokersManager;

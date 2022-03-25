import React from 'react';
import { Row, Col } from 'antd';
import LoansTable from '../../components/loan/LoansTable';
import PlansTable from '../../components/plan/PlansTable';

function Loans() {
	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<PlansTable />
			</Col>
		</Row>
	);
}

export default Loans;

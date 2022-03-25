import React from 'react';
import { Row, Col } from 'antd';
import TransferController from '../../components/transfer/TransferController';
import LoanPaymentForm from '../../components/payment/LoanPaymentForm';
import PlansTable from '../../components/plan/PlansTable';

function Transfer() {
	return (
		<>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<TransferController />
				</Col>
				<Col span={24}>
					<PlansTable />
				</Col>
			</Row>
		</>
	);
}

export default Transfer;

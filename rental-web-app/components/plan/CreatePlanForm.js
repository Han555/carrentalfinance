import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, InputNumber, Input, Button, message } from 'antd';
import { postApi } from '../../util/fetchApi';
import SmartContractContext from '../../stores/smartContractContext';

function CreatePlanForm({ togglePlan, setTogglePlan }) {
	const addPlan = async (values) => {
		try {
			const body = {
				minAmount: values.minAmount,
				maxAmount: values.maxAmount,
				minMonths: values.minMonths,
				maxMonths: values.maxMonths,
				interest: values.interest,			};

			const requestOptions = {
				method: 'POST',
				body: JSON.stringify(body),
			};

			const response = await postApi({
				url: 'loan-plans',
				options: requestOptions,
			});

			const result = await response;
			await console.log(result);

			message.success('Loan Plan added successfully');
			setTogglePlan(!togglePlan);
		} catch (err) {
			message.error('Error while adding the Loan Plan');
			console.log(err);
		}
	};

	const { CarRentalContract } = useContext(SmartContractContext);

	const addCar = async (values) => {
		try {
			const accounts = await window.ethereum.enable();
			console.log(accounts);
			await CarRentalContract.methods.addCar(values.carBrand, values.noSeaters, values.costPerDay).send({ from: accounts[0] });
			message.success('New Car Added successfully!');
		} catch (err) {
			message.error('Error occured while adding car');
			console.log(err);
		}
	};

	return (
		<Card title="Add New Car" style={{ margin: '0px' }}>
			<Form
				labelCol={{ lg: 4, xl: 3, xxl: 4 }}
				wrapperCol={{ lg: 14, xl: 12, xxl: 10 }}
				layout="horizontal"
				size="default"
				labelAlign="left"
				onFinish={addCar}
			>
				<Form.Item label="Number of seaters" name="noSeaters" rules={[{ required: true, message: 'Please enter number of seaters!' }]}>
					<InputNumber
						min="0"
						style={{ width: '100%' }}
						placeholder="Enter number of seaters"
					/>
				</Form.Item>
				<Form.Item label="Car brand" name="carBrand" rules={[{ required: true, message: 'Please enter car brand!' }]}>
					<Input
						style={{ width: '100%' }}
						placeholder="Enter car brand"
					/>
				</Form.Item>
				<Form.Item label="Cost per day" name="costPerDay" rules={[{ required: true, message: 'Please enter maximum duration in months!' }]}>
					<InputNumber
						min="0"
						style={{ width: '100%' }}
						placeholder="Enter cost per day"
					/>
				</Form.Item>
				<Form.Item wrapperCol={{
					lg: { span: 14, offset: 4 },
					xl: { span: 14, offset: 3 },
					xxl: { span: 14, offset: 4 } }}
				>
					<Button type="primary" htmlType="submit">Add New Car</Button>
				</Form.Item>
			</Form>
		</Card>
	);
}

CreatePlanForm.propTypes = {
	togglePlan: PropTypes.bool.isRequired,
	setTogglePlan: PropTypes.func.isRequired,
};

export default CreatePlanForm;

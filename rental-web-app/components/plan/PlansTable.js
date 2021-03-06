import React, { useState, useContext, useEffect } from 'react';
import { Table, Form, InputNumber, Card, Modal, Button, message, Space } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { getApi, patchApi, deleteApi } from '../../util/fetchApi';
import UserContext from '../../stores/userContext';
import SmartContractContext from '../../stores/smartContractContext';

function PlansTable({ togglePlan }) {
	const { user } = useContext(UserContext);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [data, setData] = useState([]);
	const { CarRentalContract } = useContext(SmartContractContext);

	const { confirm } = Modal;

	const [id, setId] = useState('');
	const [minAmount, setMinAmount] = useState('');
	const [maxAmount, setMaxAmount] = useState('');
	const [minMonths, setMinMonths] = useState('');
	const [maxMonths, setMaxMonths] = useState('');
	const [interest, setInterest] = useState('');

	const fetchCars = async () => {
		try {
			const response = await CarRentalContract.methods.getAllCars().call();

			setData([]);
			console.log(response)
			for (let i = 0; i < response.length; i++) {
				var carState;
				if(response[i]._carState == 0) {
					carState = "Available";
				} else if(response[i]._carState == 1) {
					carState = "Rented";
				} else {
					carState = "Damaged";
				}
				const row = {
					id: response[i]._id,
					_noOfSeaters: response[i]._noOfSeaters,
					_carBrand: response[i]._carBrand,
					_costPerDay: response[i]._costPerDay,
					_carState: carState,
				};

				setData((prev) => {
					return [...prev, row];
				});
			}
		} catch (err) {
			console.log(err);
			message.error('Error occured while loading cars');
		}
	};

	const fetchPlanById = async (planId) => {
		try {
			const response = await getApi({
				url: 'loan-plans/' + planId,
			});

			const plan = await response;
			setId(plan._id);
			setMinAmount(plan.minAmount);
			setMaxAmount(plan.maxAmount);
			setMinMonths(plan.minMonths);
			setMaxMonths(plan.maxMonths);
			setInterest(plan.interest);
		} catch (err) {
			console.log(err);
			message.error('Error occured while loading Loan Plan');
		}
	};

	const showModal = (value) => {
		fetchPlanById(value);
		setIsModalVisible(true);
	};

	const deletePlan = (planId) => {
		confirm({
			icon: <CloseCircleOutlined style={{ color: 'red' }} />,
			content: `Delete Loan Plan ${planId}`,
			onOk: async () => {
				try {
					const response = await deleteApi({
						url: 'loan-plans/' + planId,
					});
					if (response.status === 200) {
						await message.success('Sucsessfully delete the loan plan');
						fetchCars();
					} else {
						message.error('Error occured while deleting loan plan');
					}
				} catch (err) {
					console.log(err);
					message.error('Error occured while deleting loan plan');
				}
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			render: text => text,
		},
		{
			title: 'Number Of Seaters',
			dataIndex: '_noOfSeaters',
		},
		{
			title: 'Car Brand',
			dataIndex: '_carBrand',
		},
		{
			title: 'Cost Per Day',
			dataIndex: '_costPerDay',
			render: text => text + ' MFT',
		},
		{
			title: 'Status',
			dataIndex: '_carState',
		},
	];

	if (user.role === 'bank') {
		columns.push({
			title: 'Action',
			dataIndex: '',
			render: (record) => (
				<Space>
					<Button type='primary' ghost onClick={() => showModal(record.id)}>Edit</Button>
					<Button type="primary" danger ghost onClick={() => deletePlan(record.id)} style={{ color: 'red' }}>Delete</Button>
				</Space>
			),
		});
	}

	const handleOk = async () => {
		setIsModalVisible(false);

		try {
			const body = {
				minAmount,
				maxAmount,
				minMonths,
				maxMonths,
				interest,
			};

			const requestOptions = {
				// method: 'PATCH',
				body: JSON.stringify(body),
			};

			const response = await patchApi({
				url: 'loan-plans/' + id,
				options: requestOptions,
			});

			const result = await response;

			message.success('Loan Plan updated successfully');
			fetchCars();
		} catch (err) {
			message.error('Error while updating the Loan Plan');
			console.log(err);
		}
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		fetchCars();
	}, []);

	useEffect(() => {
		fetchCars();
	}, [togglePlan]);

	return (
		<>
			<Card
				title="Car Catalogue"
				extra={<Button type='primary' ghost onClick={fetchCars}>Refresh</Button>}
			>
				<Table columns={columns} dataSource={data} />
			</Card>
			<Modal
				title="Edit Loan Plan"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={handleOk}>
						Save Changes
					</Button>,
				]}
			>
				<Form
					labelCol={{
						span: 5,
					}}
					wrapperCol={{
						span: 18,
					}}
					layout="horizontal"
					size="default"
				>
					<Form.Item label="Id">
						<span className="ant-form-text">{id}</span>
					</Form.Item>
					<Form.Item label="Min amount">
						<InputNumber
							min="0"
							style={{ width: '100%' }}
							placeholder="Enter amount"
							value={minAmount}
							onChange={(e) => setMinAmount(e)}
						/>
					</Form.Item>
					<Form.Item label="Max amount">
						<InputNumber
							min="0"
							style={{ width: '100%' }}
							placeholder="Enter amount"
							value={maxAmount}
							onChange={(e) => setMaxAmount(e)}
						/>
					</Form.Item>
					<Form.Item label="Min months">
						<InputNumber
							min="0"
							style={{ width: '100%' }}
							placeholder="Enter deal period"
							value={minMonths}
							onChange={(e) => setMinMonths(e)}
						/>
					</Form.Item>
					<Form.Item label="Max months">
						<InputNumber
							min="0"
							style={{ width: '100%' }}
							placeholder="Enter deal period"
							value={maxMonths}
							onChange={(e) => setMaxMonths(e)}
						/>
					</Form.Item>
					<Form.Item label="Interest">
						<InputNumber
							min="0"
							style={{ width: '100%' }}
							placeholder="Enter interes rate"
							value={interest}
							onChange={(e) => setInterest(e)}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

PlansTable.propTypes = {
	togglePlan: PropTypes.bool,
};

export default PlansTable;

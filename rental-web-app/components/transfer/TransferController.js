import React, { useEffect, useState, useContext } from 'react';
import { Typography, Card, Divider, message, Steps, Col, Row, Button } from 'antd';
import { FileTextOutlined, FileDoneOutlined, AuditOutlined } from '@ant-design/icons';
import TransferForm from './TransferForm';
import TransactionSuccess from './TransactionSuccess';
import TransactionConfirm from './TransactionConfirm';
import TransactionFail from './TransactionFail';
import SmartContractContext from '../../stores/smartContractContext';

const { Title } = Typography;
const { Step } = Steps;

function TransferController() {
	const [balance, setBalance] = useState('0');
	const [symbol, setSymbol] = useState('');
	const [address, setAddress] = useState('');
	const [amount, setAmount] = useState('');
	const [days, setDays] = useState('');
	const [carId, setCarId] = useState('');
	const [transactionHash, setTransactionHash] = useState('');
	const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false);
	const { MicroTokenContract } = useContext(SmartContractContext);
	const { CarRentalContract } = useContext(SmartContractContext);

	const [current, setCurrent] = React.useState(0);

	const getBalance = async () => {
		try {
			const accounts = await window.ethereum.enable();
			const response = await MicroTokenContract.methods.balanceOf(accounts[0]).call();

			setBalance(response);
		} catch (err) {
			console.log(err);
			message.error('Error occured while reading balance');
		}
	};

	const getSymbol = async () => {
		try {
			const response = await MicroTokenContract.methods.symbol().call();
			setSymbol(response);
		} catch (err) {
			message.error('Error occured while reading symbol');
		}
	};

	const transferTokens = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
		setAmount('');
	};

	const backToHome = () => {
		setIsTransactionSuccessful(false);
		setCurrent(0);
		setAmount('');
	};

	const confirmTokenTransfer = async () => {
		try {
			const accounts = await window.ethereum.enable();
			const response = await MicroTokenContract.methods.transfer(address, amount).send({
				from: accounts[0] });

			setTransactionHash(response.transactionHash);
			setIsTransactionSuccessful(true);
			setCurrent(current + 1);
			message.success('Token transferred successfully');

			const response2 = await CarRentalContract.methods.rentCar(carId, days,amount).send({
				from: accounts[0] });
			message.success('Car Rented successfully');
		} catch (err) {
			console.log(err);
			message.error('Error occured while transferring tokens');
			setCurrent(current + 1);
			setAmount('');
			setIsTransactionSuccessful(false);
		}
	};

	useEffect(() => {
		getBalance();
		getSymbol();
	});

	useEffect(() => {
		console.log(amount);
		if (amount !== '') {
			transferTokens();
		}
	}, [amount]);

	const steps = [
		{
			title: 'Transfer details',
			icon: <FileTextOutlined />,
		},
		{
			title: 'Transfer confirm',
			icon: <FileDoneOutlined />,
		},
		{
			title: 'Transfer results',
			icon: <AuditOutlined />,
		},
	];

	return (
		<Card
			title="Rent Car"
			extra={<Button type="primary" ghost onClick={getBalance}>Refresh Balance</Button>}
		>
			<Title level={4}>Account Balance: {balance} {symbol}</Title>
			<Divider />

			{
				current === 0 &&
				<Row>
					<Col lg={24} xl={18} xxl={16}>
						<TransferForm
							setAddress={setAddress}
							setAmount={setAmount}
							setDays={setDays}
							setCarId={setCarId}
						/>
					</Col>
				</Row>
			}
			{
				current === 1 &&
				<Row>
					<Col lg={24} xl={18} xxl={16}>
						<TransactionConfirm
							address={address}
							amount={amount}
							transactionHash={transactionHash}
							confirmTokenTransfer={confirmTokenTransfer}
							prev={prev}
						/>
					</Col>
				</Row>
			}
			{
				current === 2 && isTransactionSuccessful &&
				<Row>
					<Col lg={24} xl={18} xxl={16}>
						<TransactionSuccess
							amount={amount}
							address={address}
							transactionHash={transactionHash}
							backToHome={backToHome}
						/>
					</Col>
				</Row>
			}
			{
				current === 2 && !isTransactionSuccessful &&
				<Row>
					<Col lg={24} xl={18} xxl={16}>
						<TransactionFail
							backToHome={backToHome}
						/>
					</Col>
				</Row>
			}
		</Card>

	);
}

export default TransferController;

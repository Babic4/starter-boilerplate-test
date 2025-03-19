import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Form, Avatar, Button, Input, Row, Col, message, Upload } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { ROW_GUTTER } from 'constants/ThemeConstant'
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import Flex from 'components/shared-components/Flex'
import Loading from 'components/shared-components/Loading'

export class InfoClient extends Component {
	avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'

	state = {
		avatarUrl: '/img/avatars/thumb-6.jpg',
		name: 'Charlie Howard',
		email: 'charlie.howard@themenate.com',
		phoneNumber: '+44 (1532) 135 7921',
		company: '',
		website: '',
		address: '',
		city: '',
		postcode: '',
		loading: true,
		isUpdating: false,
		error: null,
	}

	getBase64(img, callback) {
		const reader = new FileReader()
		reader.addEventListener('load', () => callback(reader.result))
		reader.readAsDataURL(img)
	}

	componentDidMount() {
		const clientId = this.props.match.params.clientId
		this.setState({ loading: true, error: null })
		this.fetchClient(clientId)
			.then(response => {
				console.log(response)
				const {
					name,
					email,
					phone,
					website,
					company: { name: companyName },
					address: { street, city, zipcode },
				} = response
				this.setState({
					name,
					email,
					phoneNumber: phone,
					company: companyName,
					website,
					address: street,
					city,
					postcode: zipcode,
				})
			})
			.catch(error => {
				this.setState({ error: error })
			})
			.finally(() => {
				setTimeout(() => {
					this.setState({ loading: false })
				}, 1500)
			})
	}

	componentWillUnmount() {
		message.destroy()
	}

	fetchClient = id => {
		return new Promise((resolve, reject) => {
			axios
				.get(`https://jsonplaceholder.typicode.com/users/${id}`)
				.then(response => resolve(response.data))
				.catch(error => reject(error))
		})
	}

	fetchUpdateClient = data => {
		return new Promise((resolve, reject) => {
			axios
				.post(`https://jsonplaceholder.typicode.com/users`, data)
				.then(response => {
					setTimeout(() => {
						resolve(response.data)
					}, 1000)
				})
				.catch(error => reject(error))
		})
	}

	render() {
		const onFinish = values => {
			const key = 'updatable'
			message.loading({ content: 'Updating...', key })
			const updateData = {
				name: values.name,
				email: values.email,
				company: values.company,
				phoneNumber: values.phoneNumber,
				website: values.website,
				address: values.address,
				city: values.city,
				postcode: values.postcode,
			}
			this.setState({ isUpdating: true })
			this.fetchUpdateClient(updateData)
				.then(response => {
					message.success({ content: 'Done!', key })
					setTimeout(() => {
						this.props.history.push(`${APP_PREFIX_PATH}/clients/client-list`)
					}, 1000)
				})
				.catch(error => {
					const errorMessage = error.message || 'Error!'
					message.error({ content: errorMessage, key, onClose: true })
				})
				.finally(() => {
					this.setState({ isUpdating: false })
				})
		}

		const onFinishFailed = errorInfo => {
			console.log('Failed:', errorInfo)
		}

		const onUploadAavater = info => {
			const key = 'updatable'
			if (info.file.status === 'uploading') {
				message.loading({ content: 'Uploading...', key, duration: 1000 })
				return
			}
			if (info.file.status === 'done') {
				this.getBase64(info.file.originFileObj, imageUrl =>
					this.setState({
						avatarUrl: imageUrl,
					})
				)
				message.success({ content: 'Uploaded!', key, duration: 1.5 })
			}
		}

		const onRemoveAvater = () => {
			this.setState({
				avatarUrl: '',
			})
		}

		const {
			name,
			email,
			phoneNumber,
			company,
			website,
			address,
			city,
			postcode,
			avatarUrl,
			loading,
			isUpdating,
			error,
		} = this.state

		if (loading) return <Loading cover='content' />

		if (error)
			return <div className='text-danger text-bold'>Произошла ошибка!</div>

		return (
			<>
				<Flex
					alignItems='center'
					mobileFlex={false}
					className='text-center text-md-left'
				>
					<Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
					<div className='ml-md-3 mt-md-0 mt-3'>
						<Upload
							onChange={onUploadAavater}
							showUploadList={false}
							action={this.avatarEndpoint}
						>
							<Button type='primary'>Change Avatar</Button>
						</Upload>
						<Button className='ml-2' onClick={onRemoveAvater}>
							Remove
						</Button>
					</div>
				</Flex>
				<div className='mt-4'>
					<Form
						name='basicInformation'
						layout='vertical'
						initialValues={{
							name: name,
							email: email,
							company: company,
							phoneNumber: phoneNumber,
							website: website,
							address: address,
							city: city,
							postcode: postcode,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={16}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label='Name'
											name='name'
											className='flex-col'
											rules={[
												{
													required: true,
													message: 'Please input your name!',
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label='Email'
											name='email'
											className='flex-col'
											rules={[
												{
													required: true,
													type: 'email',
													message: 'Please enter a valid email!',
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label='Company'
											name='company'
											className='flex-col'
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label='Phone Number'
											name='phoneNumber'
											className='flex-col'
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label='Website'
											name='website'
											className='flex-col'
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<Form.Item
											label='Address'
											name='address'
											className='flex-col'
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item label='City' name='city' className='flex-col'>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label='Post code'
											name='postcode'
											className='flex-col'
										>
											<Input />
										</Form.Item>
									</Col>
								</Row>
								<Button type='primary' htmlType='submit'>
									Save Change
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

export default withRouter(InfoClient)

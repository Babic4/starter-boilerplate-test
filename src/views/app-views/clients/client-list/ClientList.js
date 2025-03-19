import React, { Component } from 'react'
import { Card, Table, Tag } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import axios from 'axios'
import AvatarStatus from 'components/shared-components/AvatarStatus'
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export class ClientList extends Component {
	state = {
		clients: [],
		loading: true,
		error: null,
	}

	handleRowClick(clientId) {
		this.props.history.push(
			`${APP_PREFIX_PATH}/clients/client-list/${clientId}`
		)
	}

	componentDidMount() {
		this.setState({ loading: true, error: null })
		this.fetchClients()
			.then(response => {
				this.setState({ clients: response })
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

	fetchClients = () => {
		return new Promise((resolve, reject) => {
			axios
				.get('https://jsonplaceholder.typicode.com/users')
				.then(response => resolve(response.data))
				.catch(error => reject(error))
		})
	}

	render() {
		const { clients, loading, error } = this.state

		const tableColumns = [
			{
				title: 'User',
				dataIndex: 'name',
				render: (_, record) => (
					<div className='d-flex'>
						<AvatarStatus
							src={record.img}
							name={record.name}
							subTitle={record.email}
						/>
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase()
						b = b.name.toLowerCase()
						return a > b ? -1 : b > a ? 1 : 0
					},
				},
			},
			{
				title: 'Phone',
				dataIndex: 'phone',
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase()
						b = b.name.toLowerCase()
						return a > b ? -1 : b > a ? 1 : 0
					},
				},
			},
			{
				title: 'Company',
				dataIndex: 'company',
				render: (_, record) => (
					<div className='d-flex flex-column'>
						<span className='gap-1'>{record.company.name}</span>
						<span className='text-muted'>{record.company.catchPhrase}</span>
					</div>
				),
			},
			{
				title: 'Address',
				dataIndex: 'address',
				render: (_, record) => (
					<div className='d-flex flex-column'>
						<span className='gap-1'>
							{Object.values(record.address).slice(0, 4).join(', ')}
						</span>
					</div>
				),
			},
			{
				title: 'Website',
				dataIndex: 'website',
				render: (_, record) => (
					<div className='text-right'>
						<Tag icon={<LinkOutlined />} color='#108ee9'>
							<a href={`https://${record.website}`} target='_blank'>
								{record.website}
							</a>
						</Tag>
					</div>
				),
			},
		]

		if (error)
			return <div className='text-danger text-bold'>Произошла ошибка!</div>

		return (
			<Card bodyStyle={{ padding: '0px' }}>
				<Table
					loading={loading}
					columns={tableColumns}
					dataSource={clients}
					rowKey='id'
					onRow={(record, rowIndex) => {
						return {
							onClick: () => {
								this.handleRowClick(record.id)
							},
							style: { cursor: 'pointer' },
						}
					}}
				/>
			</Card>
		)
	}
}

export default ClientList

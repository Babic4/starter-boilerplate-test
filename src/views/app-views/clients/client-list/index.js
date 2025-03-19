import React from 'react'
import { Switch, Route } from 'react-router-dom'
import InfoClient from './ClientInfo.js'
import ClientList from './ClientList.js'

const ClientListContent = ({ match }) => (
	<Switch>
		<Route exact path={`${match.url}`} component={ClientList} />
		<Route path={`${match.url}/:clientId`} component={InfoClient} />
	</Switch>
)

export default ClientListContent

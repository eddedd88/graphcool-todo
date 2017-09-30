import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

const wsClient = new SubscriptionClient(process.env.REACT_APP_GRAPHCOOL_SUBSCRIPTION_URI, {
  reconnect: true,
  timeout: 20000
})

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHCOOL_SIMPLE_API,
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
})

export default client

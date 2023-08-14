import neo4j from 'neo4j-driver'

const USERNAME = process.env.NEO4J_USERNAME || ''
const PASSWORD = process.env.NEO4J_PASSWORD || ''

const driver = neo4j.driver(
  'neo4j+s://ff1af078.databases.neo4j.io',
  neo4j.auth.basic(USERNAME, PASSWORD),
  { disableLosslessIntegers: true },
)

export default driver

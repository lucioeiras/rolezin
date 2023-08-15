import jsonwebtoken from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ''

export default function validateToken(token: string) {
  return !!jsonwebtoken.verify(token, JWT_SECRET)
}

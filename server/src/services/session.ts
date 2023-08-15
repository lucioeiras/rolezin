/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'
import qs from 'qs'

const GOOGLE_OAUTH_CLIENT_ID = process.env
  .GOOGLE_OAUTH_CLIENT_ID as unknown as string
const GOOGLE_OAUTH_CLIENT_SECRET = process.env
  .GOOGLE_OAUTH_CLIENT_SECRET as unknown as string
const GOOGLE_OAUTH_REDIRECT = process.env
  .GOOGLE_OAUTH_REDIRECT as unknown as string

interface GoogleOauthToken {
  access_token: string
  id_token: string
  expires_in: number
  refresh_token: string
  token_type: string
  scope: string
}

export const getGoogleOauthToken = async ({
  code,
}: {
  code: string
}): Promise<GoogleOauthToken> => {
  const rootURl = 'https://oauth2.googleapis.com/token'

  const options = {
    code,
    client_id: GOOGLE_OAUTH_CLIENT_ID,
    client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: GOOGLE_OAUTH_REDIRECT,
    grant_type: 'authorization_code',
  }
  try {
    const { data } = await axios.post<GoogleOauthToken>(
      rootURl,
      qs.stringify(options),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    return data
  } catch (err: any) {
    console.log('Failed to fetch Google Oauth Tokens')
    throw new Error(err)
  }
}

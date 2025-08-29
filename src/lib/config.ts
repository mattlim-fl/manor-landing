export const SQUARE_APPLICATION_ID = 'sandbox-sq0idb-3EXjbaqIhbUVudgyl44spQ'
export const SQUARE_LOCATION_ID = 'LNNPG8BZ4VVMP'

// Use the sandbox SDK when the app ID is a sandbox one
export const SQUARE_SCRIPT_SRC = SQUARE_APPLICATION_ID.startsWith('sandbox-')
  ? 'https://sandbox.web.squarecdn.com/v1/square.js'
  : 'https://web.squarecdn.com/v1/square.js'


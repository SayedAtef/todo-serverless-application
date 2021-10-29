import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getTodos } from '../../helpers/todos'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('getTodo')

// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     logger.info('Processing Event ', event)
//     const authorization = event.headers.Authorization
//     const split = authorization.split(' ')
//     const jwtToken = split[1]

//     const toDos = await getTodos(jwtToken)

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         items: toDos
//       })
//     }
//   }
// )

// handler.use(
//   cors({
//     credentials: true
//   })
// )

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Processing Event ', event)
    const toDos = await getTodos(event)
    return {
      statusCode: 200,
      body: JSON.stringify({
        items: toDos
      })
    }
  }
)
handler.use(
  cors({
    credentials: true
  })
)

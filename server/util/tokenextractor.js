const tokenExtractor = async(request, response, next) => {
    const authorization = await request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token = authorization.substring(7)
      }
      next()
    }

module.exports = {tokenExtractor}
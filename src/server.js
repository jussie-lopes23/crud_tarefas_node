import http from 'node:http'
import { routes } from './route.js'
import { extractQueryParams } from './utils/extractQueryPath.js'
import { json } from './middlewares/json.js';

const server = http.createServer(async (req, res) => {
    const {method, url} = req
    console.log('URL que chegou no servidor:', url)
    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route){
        const routeParams = req.url.match(route.path)

        const {query, ...params} = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

          console.log(req.query);

        return route.handler(req, res)
    }
   
    return res.writeHead(404).end()

})

server.listen(3335, () => {
    console.log("servidor on ")
})
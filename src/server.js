import http from 'node:http'
import { routes } from './route.js'

const server = http.createServer(async (req, res) => {
    const {method, url} = req

    await json(req, res)

    const route = routes.find(route => {

    })
   
    return res.end("Olá, Jussie! O servidor respondeu.")

})

server.listen(3335, () => {
    console.log("servidor on ")
})
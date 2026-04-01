import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/buildRoutePath.js";
import { title } from "node:process";

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => { 
            const {search} = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            }: null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => { 
            console.log(req.body);
            const {title, description} = req.body
            
            
            if(!title || !description){
                return res
                    .setHeader('Content-Type', 'application/json')
                    .writeHead(400)
                    .end(
                    JSON.stringify({message: 'O titulo e a descrição são obrigatórios!'})
                )
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    }
]
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/buildRoutePath.js";

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => { 

        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => { 
            
        }
    }
]
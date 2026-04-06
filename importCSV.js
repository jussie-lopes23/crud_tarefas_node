import { parse } from 'csv-parse'
import fs from 'node:fs'
import { resolve } from 'node:path'

const csvPath = resolve(new URL('.', import.meta.url).pathname, 'tasks.csv')

const stream = fs.createReadStream(csvPath)

const csvParser = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2,
})

async function importTasks(){
    const linesParse = stream.pipe(csvParser)

    for await (const [title, description] of linesParse){
        await fetch('http://localhost:3335/tasks', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description })
        })

        console.log(`Tarefa importada: ${title}`)
    }
}

importTasks()
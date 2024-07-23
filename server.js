import { fastify } from 'fastify'
// import { DatabaseMemory } from './databaseMemory.js'
import { DatabasePostgres } from './databasePostgres.js'

// const database = new DatabaseMemory()
const database = new DatabasePostgres

const server = fastify()

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.get('/videos/:id', async (request) => {
    const searchById = request.params.id

    const videos = await database.listByID(searchById)
    
    return videos
})

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})


server.put('/videos/:id', async (request, reply) => {
    const videoID = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoID, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})
 

server.delete('/videos/:id', (request, reply) => {
    const videoID = request.params.id

    database.delete(videoID)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3232
})
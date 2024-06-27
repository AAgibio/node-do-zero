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
    port: 3333
})
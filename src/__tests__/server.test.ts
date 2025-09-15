import request from "supertest"
import server from "../server"
import { conectDB } from "../server"
import db from "../config/db"

describe('GET /api', () => {
    it('Should send back a json response', async () => {
        const res = await request(server).get('/api')
        
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})

jest.mock('../config/db', () => {
    const dbMock = {
        authenticate: jest.fn(),
        sync: jest.fn(),
    }
    return { __esModule: true, default: dbMock }
})

describe('connetcDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

        await conectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD'),
            expect.any(Error)
        )
        expect(db.authenticate).toHaveBeenCalled()
    })
})
const db = require("./db/connection");
const seed = require("./db/seeds/seed");
const data = require("./db/seeds/data/test-data/departments");
const request = require("supertest");
const app = require("./src/app");

beforeAll(() => seed(data))
afterAll(() => db.end())


describe("GET //departments", () => {
    test("should return an array of departments", () => {
        return request(app)
        .get('/departments')
        .expect(200)
        .then((responce) => {
            const department = responce.body;
            expect(typeof department).toBe('object')
        })
    })
    test("should return all departments", () => {
        return request(app)
        .get('/departments')
        .expect(200)
        .then((responce) => {
            const department = responce.body;
            expect(department.length).toBe(19)
        })
    })
})
// describe("GET /objects", () => {
//     test("should return all objects", () => {
//         return request(app)
//         .get('/objects')
//         .expect(200)
//         .then((responce) => {
//             const objects = responce.body
//         })
//     })})
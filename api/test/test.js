const assert = require('assert')
const request = require('supertest')('localhost:8000')

describe('Spots', () => {

    describe('rollback', () => {

        beforeEach(function (done) {
            setTimeout(function(){
              done();
            }, 250);
          });

        let spotId

        const putSpot = function (id, name, done) {
            const data = {
                'name': name
            }

            request.put('/api/spots/' + id)
                .set('Accept', 'application/json')
                .send(data)
                .expect(200)
                .end(done)
        }

        it('Create Spot', (done) => {

            const data = {
                'name': 'Spot1'
            }

            request.post('/api/spots')
                .set('Accept', 'application/json')
                .send(data)
                .expect(201)
                .expect(res => { spotId = res.body.id })
                .end(done)

        })

        it ('Create Version 2', (done) => {
            putSpot(spotId, "Spot2", done)
        })

        it ('Create Version 3', (done) => {
            putSpot(spotId, "Spot3", done)
        })

        it ('Create Version 4', (done) => {
            putSpot(spotId, "Spot4", done)
        })

        it ('Create Version 5', (done) => {
            putSpot(spotId, "Spot5", done)
        })

        it ('Get Version 5', (done) => {
            request.get('/api/spots/'+spotId)
                .expect(200)
                .expect(res => {
                    assert.equal(res.body.current_version.name, 'Spot5')
                })
                .end(done)
        })

        it ('Rollback', (done) => {
            request.delete('/api/spots/'+spotId)
                .expect(204)
                .end(done)
        })

        it ('Get Version 4', (done) => {
            request.get('/api/spots/'+spotId)
                .expect(200)
                .expect(res => {
                    assert.equal(res.body.current_version.name, 'Spot4')
                })
                .end(done)
        })

        it ('Rollback', (done) => {
            request.delete('/api/spots/'+spotId)
                .expect(204)
                .end(done)
        })

        it ('Get Version 3', (done) => {
            request.get('/api/spots/'+spotId)
                .expect(200)
                .expect(res => {
                    assert.equal(res.body.current_version.name, 'Spot3')
                })
                .end(done)
        })

        it ('Rollback', (done) => {
            request.delete('/api/spots/'+spotId)
                .expect(204)
                .end(done)
        })

        it ('Get Version 2', (done) => {
            request.get('/api/spots/'+spotId)
                .expect(200)
                .expect(res => {
                    assert.equal(res.body.current_version.name, 'Spot2')
                })
                .end(done)
        })

        it ('Rollback', (done) => {
            request.delete('/api/spots/'+spotId)
                .expect(204)
                .end(done)
        })

        it ('Get Version 1', (done) => {
            request.get('/api/spots/'+spotId)
                .expect(200)
                .expect(res => {
                    assert.equal(res.body.current_version.name, 'Spot1')
                })
                .end(done)
        })

        it ('Rollback', (done) => {
            request.delete('/api/spots/'+spotId)
                .expect(204)
                .end(done)
        })

        it ('Nothing left', (done) => {
            request.get('/api/spots/'+spotId)
                .expect(404)
                .end(done)
        })
    })

})
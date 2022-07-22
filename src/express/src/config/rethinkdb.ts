let rethinkdb = require('rethinkdb')

export let db = rethinkdb.connect({db: 'todos_app'})
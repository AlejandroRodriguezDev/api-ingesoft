const db = require('./db');

const User = {
    getAll: (callback) => {
        const query = "SELECT * FROM usuarios";
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    getById: (id, callback) => {
        const query = "SELECT * FROM usuarios WHERE id = ?";
        db.query(query, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },
    create: (user, callback) => {
        const query = "INSERT INTO usuarios SET ?";
        db.query(query, user, (err, results) => {
            if (err) return callback(err);
            callback(null, results.insertId);
        });
    }
};

module.exports = User;

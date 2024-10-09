const db = require('../config/db');

// CREATE User
exports.createUser = async function (req, res) {
    const { name, email, age } = req.body;
    try {
        const query = 'CALL sp_create_user($1, $2, $3)';
        await db.query(query, [name, email, age]); // Parameterized query to prevent SQL injection
        res.status(200).json({
            status: true,
            message: "User Created Successfully"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
};

// get All Users 
exports.getAllUsers = async function (req, res) {
    try {
        const query = 'SELECT * FROM get_users()';
        const result = await db.query(query); 

        res.status(200).json({
            success: true,
            message: "All Users Fetched Successfully",
            data: result.rows,
          });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
};

// UPDATE User
exports.updateUser = async function (req, res) {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const query = 'CALL sp_update_user($1, $2, $3, $4)';
        await db.query(query, [id, name, email, age]); 
        res.status(200).json({
            success: true,
            message: "User updated Successfully"
          });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
};

// DELETE User
exports.deleteUser = async function (req, res) {
    const { id } = req.params;
    try {
        const query = 'SELECT delete_user($1)';
        await db.query(query, [id]); 
        res.status(200).json({
            success: true,
            message: "User deleted Successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
};

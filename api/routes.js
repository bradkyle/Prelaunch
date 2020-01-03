const AWS = require('aws-sdk');
const express = require('express');
const uuid = require('uuid');

const IS_OFFLINE = process.env.NODE_ENV !== 'production';
const USER_TABLE = process.env.TABLE;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const USER_ROUTE = "users"
const REFERRAL_ROUTE = "referrals"

const dynamoDb = IS_OFFLINE === true ?
    new AWS.DynamoDB.DocumentClient({
        region: 'us-west-1',
        endpoint: 'http://127.0.0.1:8080',
    }) :
    new AWS.DynamoDB.DocumentClient();

const router = express.Router();

/* 
Retrieves a list of all users (must secure)
*/
router.get('/'+ USER_ROUTE, (req, res) => {
    const params = {
        TableName: USER_TABLE
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error fetching the users' });
        }
        res.json(result.Items);
    });
});

/* 
Retrieves a single user by id
*/
router.get('/'+USER_ROUTE+'/:id', (req, res) => {
    const id = req.params.id;
    const params = {
        TableName: USER_TABLE,
        Key: {
            id
        }
    };
    dynamoDb.get(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error retrieving User' });
        }
        if (result.Item) {
            res.json(result.Item);
        } else {
            res.status(404).json({ error: `User with id: ${id} not found` });
        }
    });
});

/* 
Creates a new user
*/
router.post('/'+USER_ROUTE, (req, res) => {
    const name = req.body.name;
    const id = uuid.v4();
    const params = {
        TableName: USER_TABLE,
        Item: {
            id,
            name
        },
    };
    dynamoDb.put(params, (error) => {
        if (error) {
            res.status(400).json({ error: 'Could not create User' });
        }
        res.json({
            id,
            name
        });
    });
});

/* 
Deactivates a user
*/
router.delete('/'+USER_ROUTE+'/:id', (req, res) => {
    const id = req.body.id;
    const params = {
        TableName: USER_TABLE,
        Key: {
            id
        },
        UpdateExpression: 'set #disabled = :disabled',
        ExpressionAttributeNames: { '#disabled': 'disabled' },
        ExpressionAttributeValues: { ':disabled': True },
        ReturnValues: "ALL_NEW"
    }
    dynamoDb.update(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Could not deactivate User' });
        }
        res.json(result.Attributes);
    })
});

/* 
Updates a user
*/
router.put('/'+USER_ROUTE, (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const params = {
        TableName: USER_TABLE,
        Key: {
            id
        },
        UpdateExpression: 'set #name = :name',
        ExpressionAttributeNames: { '#name': 'name' },
        ExpressionAttributeValues: { ':name': name },
        ReturnValues: "ALL_NEW"
    }
    dynamoDb.update(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Could not update User' });
        }
        res.json(result.Attributes);
    })
});

/* 
Increments a users referral count
*/
router.post('/'+USER_ROUTE+'/inc/:id', (req, res) => {
    const name = req.body.name;
    const id = uuid.v4();
    const params = {
        TableName: USER_TABLE,
        Item: {
            id,
            name
        },
    };
    dynamoDb.put(params, (error) => {
        if (error) {
            res.status(400).json({ error: 'Could not create User' });
        }
        res.json({
            id,
            name
        });
    });
});

/* 
Retrieves a list of top users by referral count with a limit and a maximum of 100
*/
router.get('/'+USER_ROUTE+'/top', (req, res) => {
    const params = {
        TableName: USER_TABLE
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error fetching the users' });
        }
        res.json(result.Items);
    });
});


/* 
Retrieves a single users position in the waiting list.
*/
router.get('/'+USER_ROUTE+'/position', (req, res) => {
    const params = {
        TableName: USER_TABLE
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error fetching the users' });
        }
        res.json(result.Items);
    });
});

/* 
Retrieves the total referrals count.
*/
router.get('/'+REFERRAL_ROUTE+'/count', (req, res) => {
    const params = {
        TableName: USER_TABLE
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error fetching the users' });
        }
        res.json(result.Items);
    });
});

module.exports = router;
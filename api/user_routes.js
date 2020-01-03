const AWS = require('aws-sdk');
const express = require('express');
const uuid = require('uuid');


const IS_OFFLINE = process.env.NODE_ENV !== 'production';
const EMPLOYEES_TABLE = process.env.TABLE;
const BASE_ROUTE = "users"

const dynamoDb = IS_OFFLINE === true ?
    new AWS.DynamoDB.DocumentClient({
        region: 'us-west-1',
        endpoint: 'http://127.0.0.1:8080',
    }) :
    new AWS.DynamoDB.DocumentClient();

const router = express.Router();


router.get('/'+ BASE_ROUTE, (req, res) => {
    const params = {
        TableName: EMPLOYEES_TABLE
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error fetching the users' });
        }
        res.json(result.Items);
    });
});

router.get('/'+BASE_ROUTE+'/:id', (req, res) => {
    const id = req.params.id;
    const params = {
        TableName: EMPLOYEES_TABLE,
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

router.post('/'+BASE_ROUTE, (req, res) => {
    const name = req.body.name;
    const id = uuid.v4();
    const params = {
        TableName: EMPLOYEES_TABLE,
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

router.delete('/'+BASE_ROUTE+'/:id', (req, res) => {
    const id = req.params.id;
    const params = {
        TableName: EMPLOYEES_TABLE,
        Key: {
            id
        }
    };
    dynamoDb.delete(params, (error) => {
        if (error) {
            res.status(400).json({ error: 'Could not delete User' });
        }
        res.json({ success: true });
    });
});

router.put('/'+BASE_ROUTE, (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const params = {
        TableName: EMPLOYEES_TABLE,
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

router.post('/'+BASE_ROUTE+'/inc/:id', (req, res) => {
    const name = req.body.name;
    const id = uuid.v4();
    const params = {
        TableName: EMPLOYEES_TABLE,
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

router.get('/'+BASE_ROUTE+'/top', (req, res) => {
    const name = req.body.name;
    const id = uuid.v4();
    const params = {
        TableName: EMPLOYEES_TABLE,
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

router.get('/'+BASE_ROUTE+'/position', (req, res) => {
    const name = req.body.name;
    const id = uuid.v4();
    const params = {
        TableName: EMPLOYEES_TABLE,
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

router.get('/'+BASE_ROUTE+'/top', (req, res) => {
    const name = req.body.name;
    const id = uuid.v4();
    const params = {
        TableName: EMPLOYEES_TABLE,
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

module.exports = router;
// frontend/src/components/CoinTossSimulation.js

import React, { useState } from 'react';
import { Card, Form, Button, Tooltip, OverlayTrigger, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const CoinTossSimulation = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [n, setN] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await axios.post(`${backendUrl}/api/coin_toss`, {
                n: parseInt(n)
            });
            setResult(response.data.result);
        } catch (err) {
            setError('An error occurred while processing the simulation.');
        } finally {
            setLoading(false);
        }
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Number of coin flips to simulate.
        </Tooltip>
    );

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>
                    <i className="fas fa-coins"></i> Coin Toss Simulation
                </Card.Title>
                <Card.Text>
                    Simulates flipping a coin and shows how often you get heads or tails.
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="n">
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip id="tooltip-n">Number of coin flips to simulate.</Tooltip>}
                        >
                            <Form.Label>Number of Tosses</Form.Label>
                        </OverlayTrigger>
                        <Form.Control
                            type="number"
                            value={n}
                            onChange={(e) => setN(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Simulate'}
                    </Button>
                </Form>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {result && <Alert variant="success" className="mt-3">{result}</Alert>}
            </Card.Body>
        </Card>
    );
};

export default CoinTossSimulation;

// frontend/src/components/ChanceSimulation.js

import React, { useState } from 'react';
import { Card, Form, Button, Tooltip, OverlayTrigger, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const ChanceSimulation = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [chance, setChance] = useState('');
    const [attempts, setAttempts] = useState('');
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
            const response = await axios.post(`${backendUrl}/api/chance_simulation`, {
                chance: parseFloat(chance),
                attempts: parseInt(attempts),
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
            The probability (in %) that the event will happen on each attempt.
        </Tooltip>
    );

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>
                    <i className="fas fa-dice-one"></i> Chance Simulation
                </Card.Title>
                <Card.Text>
                    Simulates whether an event will succeed based on a given chance and attempts. Perfect for testing probability!
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="chance">
                        <Form.Label>
                            <OverlayTrigger placement="right" overlay={renderTooltip}>
                                <span>Chance (%)</span>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.0001"
                            value={chance}
                            onChange={(e) => setChance(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="attempts">
                        <OverlayTrigger
                            placement="right"
                            overlay={
                                <Tooltip id="tooltip-attempts">The number of attempts to simulate.</Tooltip>
                            }
                        >
                            <Form.Label>Attempts</Form.Label>
                        </OverlayTrigger>
                        <Form.Control
                            type="number"
                            step='1'
                            value={attempts}
                            onChange={(e) => setAttempts(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="n">
                        <OverlayTrigger
                            placement="right"
                            overlay={
                                <Tooltip id="tooltip-n">How many times to repeat the simulation.</Tooltip>
                            }
                        >
                            <Form.Label>Number of Simulations</Form.Label>
                        </OverlayTrigger>
                        <Form.Control
                            type="number"
                            value={n}
                            step='1'
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

export default ChanceSimulation;

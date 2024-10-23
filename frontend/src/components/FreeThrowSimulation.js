import React, { useState } from 'react';
import { Card, Form, Button, Tooltip, OverlayTrigger, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const FreeThrowSimulation = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [attempts, setAttempts] = useState('');
    const [chance, setChance] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await axios.post(`${backendUrl}/api/free_throw`, {
                attempts: parseInt(attempts),
                chance: parseFloat(chance)
            });
            setResult(response.data.result);
        } catch (err) {
            setError('An error occurred while processing the simulation.');
        } finally {
            setLoading(false);
        }
    };

    const renderTooltipAttempts = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            How many shots you take, bro.
        </Tooltip>
    );

    const renderTooltipChance = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Your chance of hitting each shot, bro.
        </Tooltip>
    );

    return (
        <Card className="mb-4 bg-dark text-white">
            <Card.Body>
                <Card.Title>Free Throw Simulation</Card.Title>
                <Card.Text>
                    Take your best shot. Can you drain those free throws like a pro?
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="attempts">
                        <OverlayTrigger
                            placement="right"
                            overlay={renderTooltipAttempts}
                        >
                            <Form.Label>Number of Free Throws</Form.Label>
                        </OverlayTrigger>
                        <Form.Control
                            type="number"
                            value={attempts}
                            onChange={(e) => setAttempts(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="chance">
                        <OverlayTrigger
                            placement="right"
                            overlay={renderTooltipChance}
                        >
                            <Form.Label>Chance (%)</Form.Label>
                        </OverlayTrigger>
                        <Form.Control
                            type="number"
                            step="0.000000001"
                            value={chance}
                            onChange={(e) => setChance(e.target.value)}
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

export default FreeThrowSimulation;

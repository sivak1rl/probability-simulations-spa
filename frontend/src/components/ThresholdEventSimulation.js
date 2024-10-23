import React, { useState } from 'react';
import { Card, Form, Button, Tooltip, OverlayTrigger, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const ThresholdEventSimulation = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [chance, setChance] = useState('');
    const [attempts, setAttempts] = useState('');
    const [threshold, setThreshold] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await axios.post(`${backendUrl}/api/threshold_event`, {
                chance: parseFloat(chance),
                attempts: parseInt(attempts),
                threshold: parseInt(threshold)
            });
            setResult(response.data.result);
        } catch (err) {
            setError('An error occurred while processing the simulation.');
        } finally {
            setLoading(false);
        }
    };

    const renderTooltipChance = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            The chance (in %) of success per attempt.
        </Tooltip>
    );

    const renderTooltipAttempts = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Number of attempts to simulate.
        </Tooltip>
    );

    const renderTooltipThreshold = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            The number of successful outcomes needed to reach the threshold.
        </Tooltip>
    );

    return (
        <Card className="mb-4 bg-dark text-white">
            <Card.Body>
                <Card.Title>Threshold Event Simulation</Card.Title>
                <Card.Text>
                    Simulates whether you reach a success threshold given a certain probability and number of attempts.
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="chance">
                        <Form.Label>
                            <OverlayTrigger placement="right" overlay={renderTooltipChance}>
                                <span>Chance (%)</span>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={chance}
                            onChange={(e) => setChance(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="attempts">
                        <OverlayTrigger
                            placement="right"
                            overlay={renderTooltipAttempts}
                        >
                            <Form.Label>Attempts</Form.Label>
                        </OverlayTrigger>
                        <Form.Control
                            type="number"
                            value={attempts}
                            onChange={(e) => setAttempts(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="threshold">
                        <OverlayTrigger
                            placement="right"
                            overlay={renderTooltipThreshold}
                        >
                            <Form.Label>Threshold</Form.Label>
                        </OverlayTrigger>
                        <Form.Control
                            type="number"
                            value={threshold}
                            onChange={(e) => setThreshold(e.target.value)}
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

export default ThresholdEventSimulation;

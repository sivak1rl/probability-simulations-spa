import React, { useState } from 'react';
import { Card, Form, Button, Tooltip, OverlayTrigger, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const BeerPongSimulation = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [throws, setThrows] = useState('');
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
            const response = await axios.post(`${backendUrl}/api/beer_pong`, {
                throws: parseInt(throws),
                chance: parseFloat(chance)
            });
            setResult(response.data.result);
        } catch (err) {
            setError('An error occurred while processing the simulation.');
        } finally {
            setLoading(false);
        }
    };

    const renderTooltipThrows = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Number of throws to make.
        </Tooltip>
    );

    const renderTooltipChance = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Your chance of making a cup, bro.
        </Tooltip>
    );

    return (
        <Card className="mb-4 bg-dark text-white">
            <Card.Body>
                <Card.Title>Beer Pong Simulation</Card.Title>
                <Card.Text>
                    See how many cups you can drain in a beer pong game, bro.
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="throws">
                        <OverlayTrigger placement="right" overlay={renderTooltipThrows}>
                            <Form.Label>Number of Throws</Form.Label>
                        </OverlayTrigger>
                        <Form.Control
                            type="number"
                            value={throws}
                            onChange={(e) => setThrows(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="chance">
                        <OverlayTrigger placement="right" overlay={renderTooltipChance}>
                            <Form.Label>Chance (%)</Form.Label>
                        </OverlayTrigger>
                        <Form.Control
                            type="number"
                            step="0.01"
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

export default BeerPongSimulation;

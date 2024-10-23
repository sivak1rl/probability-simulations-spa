import React, { useState } from 'react';
import { Card, Form, Button, Tooltip, OverlayTrigger, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const RouletteSimulation = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [color, setColor] = useState('Red');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await axios.post(`${backendUrl}/api/roulette`, {
                color: color
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
            Pick red or black for the roulette spin.
        </Tooltip>
    );

    return (
        <Card className="mb-4 bg-dark text-white">
            <Card.Body>
                <Card.Title>Roulette Spin Simulation</Card.Title>
                <Card.Text>
                    Choose red or black and see if the wheel has your back, bro!
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="color">
                        <OverlayTrigger placement="right" overlay={renderTooltip}>
                            <Form.Label>Choose Color</Form.Label>
                        </OverlayTrigger>
                        <Form.Select
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                        >
                            <option value="Red">Red</option>
                            <option value="Black">Black</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : 'Spin the Wheel'}
                    </Button>
                </Form>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {result && <Alert variant="success" className="mt-3">{result}</Alert>}
            </Card.Body>
        </Card>
    );
};

export default RouletteSimulation;

import React, { useState } from 'react';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const SlotMachineSimulation = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const response = await axios.post(`${backendUrl}/api/slot_machine`);
            setResult(response.data.result);
        } catch (err) {
            setError('An error occurred while processing the simulation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mb-4 bg-dark text-white">
            <Card.Body>
                <Card.Title>Slot Machine Simulation</Card.Title>
                <Card.Text>
                    Pull the lever and see if you hit the jackpot, bro!
                </Card.Text>
                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Spin the Slots'}
                </Button>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {result && <Alert variant="success" className="mt-3">{result}</Alert>}
            </Card.Body>
        </Card>
    );
};

export default SlotMachineSimulation;

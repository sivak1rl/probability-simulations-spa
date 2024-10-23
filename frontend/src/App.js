import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import ChanceSimulation from './components/ChanceSimulation';
import CoinTossSimulation from './components/CoinTossSimulation';
import DiceRollSimulation from './components/DiceRollSimulation';
import ThresholdEventSimulation from './components/ThresholdEventSimulation';
import BeerPongSimulation from './components/BeerPongSimulation';
import RouletteSimulation from './components/RouletteSimulation';
import SlotMachineSimulation from './components/SlotMachineSimulation';
import ArmWrestlingSimulation from './components/ArmWrestlingSimulation';
import FreeThrowSimulation from './components/FreeThrowSimulation';

function App() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#">Probability Simulations</Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Row>
                    <Col md={6}>
                        <ChanceSimulation />
                    </Col>
                    <Col md={6}>
                        <CoinTossSimulation />
                    </Col>
                    <Col md={6}>
                        <DiceRollSimulation />
                    </Col>
                    <Col md={6}>
                        <ThresholdEventSimulation />
                    </Col>
                    <Col md={6}>
                        <BeerPongSimulation />
                    </Col>
                    <Col md={6}>
                        <RouletteSimulation />
                    </Col>
                    <Col md={6}>
                        <SlotMachineSimulation />
                    </Col>
                    <Col md={6}>
                        <ArmWrestlingSimulation />
                    </Col>
                    <Col md={6}>
                        <FreeThrowSimulation />
                    </Col>
                </Row>
            </Container>
            <footer className="bg-dark text-white text-center py-3 mt-4">
                &copy; 2024 Probability Simulations
            </footer>
        </>
    );
}

export default App;


from random import randint, random


# Function to simulate success over multiple attempts, chance simulation style
def chance_simulation(chance: float, attempts: int) -> bool:
    while attempts > 0:
        if random() < chance:
            return True
        attempts -= 1
    return False

# Function to simulate flipping a coin n times
def coin_toss(n: int) -> dict:
    results = {"Heads": 0, "Tails": 0}
    for _ in range(n):
        if random() > 0.5:
            results["Heads"] += 1
        else:
            results["Tails"] += 1
    return results

# Function to simulate rolling a dice n times
def dice_roll(n: int) -> dict:
    results = {i: 0 for i in range(1, 7)}
    for _ in range(n):
        result = randint(1, 6)
        results[result] += 1
    return results

# Function to simulate hitting a success threshold
def threshold_event(chance: float, attempts: int, threshold: int) -> bool:
    successes = 0
    for _ in range(attempts):
        if random() < chance:
            successes += 1
    return successes >= threshold

# Function to simulate beer pong shots
def beer_pong(throws: int, chance: float) -> int:
    cups_made = 0
    for _ in range(throws):
        if random() < chance:
            cups_made += 1
    return cups_made

# Function to simulate roulette spin
def roulette_spin(choice: str) -> bool:
    colors = ["Red", "Black"]
    spin_result = colors[randint(0, 1)]
    return spin_result == choice

# Function to simulate slot machine spin
def slot_machine() -> bool:
    slots = [randint(1, 7) for _ in range(3)]
    return len(set(slots)) == 1

# Function to simulate arm wrestling match
def arm_wrestling() -> str:
    bro_power = randint(1, 10)
    opponent_power = randint(1, 10)
    return "You win, bro!" if bro_power > opponent_power else "You lost, bro! Hit the gym!"

# Function to simulate basketball free throws
def free_throw(attempts: int, chance: float) -> int:
    baskets = 0
    for _ in range(attempts):
        if random() < chance:
            baskets += 1
    return baskets

from backend.app import app
from flask import jsonify, request
from backend.util.chance_sim import (
    arm_wrestling,
    beer_pong,
    chance_simulation,
    coin_toss,
    dice_roll,
    free_throw,
    roulette_spin,
    slot_machine,
    threshold_event,
)


# API Routes
@app.route("/api/chance_simulation", methods=["POST"])
def chance_simulation_route():
    data = request.get_json()
    chance = float(data["chance"]) / 100
    attempts = int(data["attempts"])
    n = int(data["n"])

    success = [chance_simulation(chance, attempts) for _ in range(n)]
    success_count = success.count(True)
    success_rate = (success_count / n) * 100

    return jsonify(
        {
            "result": f"Out of {n} attempts, {success_count} hit the mark. That's a {success_rate}% chance of success."
        }
    )


@app.route("/api/coin_toss", methods=["POST"])
def coin_toss_route():
    data = request.get_json()
    n = int(data["n"])
    results = coin_toss(n)

    return jsonify(
        {
            "result": f"You flipped {n} times: Heads {results['Heads']}, Tails {results['Tails']}."
        }
    )


@app.route("/api/dice_roll", methods=["POST"])
def dice_roll_route():
    data = request.get_json()
    n = int(data["n"])
    results = dice_roll(n)

    result_text = ", ".join([f"{key}: {value}" for key, value in results.items()])
    return jsonify({"result": f"You rolled the dice {n} times: {result_text}."})


@app.route("/api/threshold_event", methods=["POST"])
def threshold_event_route():
    data = request.get_json()
    chance = float(data["chance"]) / 100
    attempts = int(data["attempts"])
    threshold = int(data["threshold"])

    success = threshold_event(chance, attempts, threshold)
    result_text = "successful" if success else "unsuccessful"
    return jsonify(
        {"result": f"The event was {result_text} with a threshold of {threshold}."}
    )


@app.route("/api/beer_pong", methods=["POST"])
def beer_pong_route():
    data = request.get_json()
    throws = int(data["throws"])
    chance = float(data["chance"]) / 100
    cups_made = beer_pong(throws, chance)

    return jsonify({"result": f"You made {cups_made} out of {throws} cups."})


@app.route("/api/roulette", methods=["POST"])
def roulette_route():
    data = request.get_json()
    choice = data["color"]
    spin_result = roulette_spin(choice)
    result = (
        "You hit it! The wheel's in your favor!"
        if spin_result
        else "No luck this time. The wheel's cold."
    )
    return jsonify({"result": result})


@app.route("/api/slot_machine", methods=["POST"])
def slot_machine_route():
    jackpot = slot_machine()
    result = (
        "JACKPOT!!! All three matched!"
        if jackpot
        else "Close, but no jackpot. Spin again!"
    )
    return jsonify({"result": result})


@app.route("/api/arm_wrestling", methods=["POST"])
def arm_wrestling_route():
    result = arm_wrestling()
    return jsonify({"result": result})


@app.route("/api/free_throw", methods=["POST"])
def free_throw_route():
    data = request.get_json()
    attempts = int(data["attempts"])
    chance = float(data["chance"]) / 100
    baskets = free_throw(attempts, chance)

    return jsonify({"result": f"You made {baskets} out of {attempts} free throws."})

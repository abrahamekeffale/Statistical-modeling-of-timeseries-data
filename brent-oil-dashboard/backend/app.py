from flask import Flask, jsonify, request
import pandas as pd
import json

app = Flask(__name__)

# Load pre-processed data and model results (assuming saved as CSV/JSON)
historical_data = pd.read_csv("data/historical_brent_prices.csv")  # Replace with actual data path
model_results = pd.read_json("data/model_results.json")            # Replace with actual results path
metrics = {
    "RMSE": 2.5,
    "MAE": 1.8,
    "Accuracy": 0.85  # Example metrics
}

@app.route('/api/historical_data', methods=['GET'])
def get_historical_data():
    return jsonify(historical_data.to_dict(orient="records"))

@app.route('/api/model_results', methods=['GET'])
def get_model_results():
    return jsonify(model_results.to_dict())

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    return jsonify(metrics)

@app.route('/api/events', methods=['GET'])
def get_events():
    events = [
        {"date": "2021-10-20", "event": "Economic sanctions on oil exporting country"},
        {"date": "2022-02-24", "event": "Start of major geopolitical conflict"},
    ]
    return jsonify(events)

if __name__ == "__main__":
    app.run(debug=True)

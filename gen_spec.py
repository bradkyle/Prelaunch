from webapp import create_app
import json

_, spec = create_app("conf/config.yml")

if __name__ == "__main__":
    with open("./spec.json", 'w') as f:
        json.dump(spec.to_dict(), f)

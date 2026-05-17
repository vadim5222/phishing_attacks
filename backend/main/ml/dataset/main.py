from pathlib import Path
import sys

try:
    from ml.dataset.url_model import train_and_save_model
except ImportError:
    sys.path.append(str(Path(__file__).resolve().parent))
    from url_model import train_and_save_model


if __name__ == '__main__':
    train_and_save_model()
from pathlib import Path
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / 'phishing_url_model.pkl'
DATA_PATH = BASE_DIR / 'phishing.csv'


def load_dataset():
    df = pd.read_csv(DATA_PATH)
    if 'URL' not in df.columns or 'label' not in df.columns:
        raise ValueError('Dataset must contain URL and label columns')
    return df


def build_pipeline():
    return Pipeline([
        ('tfidf', TfidfVectorizer(analyzer='char_wb', ngram_range=(3, 5), max_features=10000)),
        ('clf', LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42))
    ])


def train_and_save_model():
    df = load_dataset()
    X = df['URL'].astype(str)
    y = df['label'].astype(int)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = build_pipeline()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print('Модуль обучена:')
    print(classification_report(y_test, y_pred, digits=4))

    joblib.dump(model, MODEL_PATH)
    print('Saved model to', MODEL_PATH)
    return model


def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f'Модель не найдена. Запустите обучение: python {Path(__file__).name} или импортируйте и запустите файл.'
        )
    return joblib.load(MODEL_PATH)


def predict_url(url: str):
    model = load_model()
    label = int(model.predict([url])[0])
    probability = None
    if hasattr(model, 'predict_proba'):
        probability = float(model.predict_proba([url])[0, 1])
    return {
        'label': label,
        'probability': probability,
        'raw_url': url
    }


if __name__ == '__main__':
    train_and_save_model()

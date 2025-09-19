import numpy as np
import pandas as pd

df =pd.read_csv("Crop_recommendation.csv")

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline


prep1={}
X = df.drop('label', axis=1)
y = df['label']

# Label encode the target variable
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)


numerical_features = X.select_dtypes(include=np.number).columns
categorical_features = X.select_dtypes(include='object').columns

numerical_transformer = StandardScaler()
categorical_transformer = OneHotEncoder(handle_unknown='ignore')

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_features),
        ('cat', categorical_transformer, categorical_features)
    ])


prep1['num_featr']=numerical_features
prep1['cat_feature']=categorical_features
prep1['label_encoder']=label_encoder


pipeline = Pipeline(steps=[('preprocessor', preprocessor)])

X_processed = pipeline.fit_transform(X)
prep1['ColumnTransformer']=preprocessor

try:
    ohe_categories = preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_features)
    processed_feature_names = list(numerical_features) + list(ohe_categories)
except AttributeError:
     processed_feature_names = list(numerical_features) + list(categorical_features)

X_processed_df = pd.DataFrame(X_processed, columns=processed_feature_names)

X_train, X_test, y_train, y_test = train_test_split(X_processed_df, y_encoded, test_size=0.2, random_state=42)
prep1['feature_names']=processed_feature_names

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from xgboost import XGBClassifier

# Instantiate the models with default hyperparameters
log_reg_model = LogisticRegression(max_iter=1000) # Increased max_iter for convergence
dt_model = DecisionTreeClassifier()
rf_model = RandomForestClassifier()
svm_model = SVC()
nb_model = GaussianNB()
knn_model = KNeighborsClassifier()
Xgb=XGBClassifier()

# Train each model
log_reg_model.fit(X_train, y_train)
dt_model.fit(X_train, y_train)
rf_model.fit(X_train, y_train)
svm_model.fit(X_train, y_train)
nb_model.fit(X_train, y_train)
knn_model.fit(X_train, y_train)
Xgb.fit(X_train, y_train)

print("All models trained successfully.")

from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

models = [
    ("Logistic Regression", log_reg_model),
    ("Decision Tree", dt_model),
    ("Random Forest", rf_model),
    ("SVM", svm_model),
    ("Naive Bayes", nb_model),
    ("K-Nearest Neighbors", knn_model)
]

for model_name, model in models:
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')


    print(f"Accuracy: {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall: {recall:.4f}")
    print(f"F1-score: {f1:.4f}")

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))


from sklearn.metrics import classification_report

# Print the classification report for K-Nearest Neighbors again
print("--- K-Nearest Neighbors ---")
print("\nClassification Report:")
print(classification_report(y_test, knn_model.predict(X_test)))
print("-" * 30)


from sklearn.model_selection import GridSearchCV


param_grid = {
    'n_neighbors': [3, 5, 7, 9, 11],
    'weights': ['uniform', 'distance'],
    'metric': ['euclidean', 'manhattan', 'minkowski']
}


grid_search = GridSearchCV(knn_model, param_grid, cv=5, scoring='f1_weighted')


grid_search.fit(X_train, y_train)


best_params = grid_search.best_params_

print("Best hyperparameters found:")
print(best_params)



from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report


tuned_knn_model = KNeighborsClassifier(**best_params)


tuned_knn_model.fit(X_train, y_train)


y_pred_tuned = tuned_knn_model.predict(X_test)

accuracy_tuned = accuracy_score(y_test, y_pred_tuned)
precision_tuned = precision_score(y_test, y_pred_tuned, average='weighted')
recall_tuned = recall_score(y_test, y_pred_tuned, average='weighted')
f1_tuned = f1_score(y_test, y_pred_tuned, average='weighted')


print(f"Accuracy: {accuracy_tuned:.4f}")
print(f"Precision: {precision_tuned:.4f}")
print(f"Recall: {recall_tuned:.4f}")
print(f"F1-score: {f1_tuned:.4f}")

# Print the classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred_tuned))
print("-" * 30)



import pickle

# save the model and prep1
with open('tuned_knn_model.pkl', 'wb') as f:
    pickle.dump(tuned_knn_model, f)

with open('prep1.pkl', 'wb') as f:
    pickle.dump(prep1, f)

print("Tuned KNN model and prep1 object saved successfully.")
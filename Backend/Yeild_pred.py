df2 = pd.read_csv('/content/price_data.csv')


crops_df1 = set(df['label'].str.lower().unique())
crops_df2 = set(df2['Crop'].str.lower().unique())

common_crops = list(crops_df1.intersection(crops_df2))

print("Common crops in both dataframes:")
print(common_crops)


X_filtered = df2_filtered.drop(['Crop', 'Production','Crop_Year'], axis=1)
y_filtered_production = df2_filtered['Production']


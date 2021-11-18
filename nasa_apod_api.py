import requests
import  json
import webbrowser

#API KEY

API_KEY='rlCEAXjqD1MV3KemE089QpV6r6j5gBeorm8GSWB3'

#API URL

url = 'https://nasa.api.gov/planetary/apod'

#Parameteres

params={
    'api_key':API_KEY,
    'hd':'True',
    'data':'2021-15-21'
}


response = requests.get(url, params=params)
json_data = json.loads(response.text)
print(json_data)
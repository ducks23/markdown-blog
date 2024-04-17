---
title: "Semantic Search Using Open AI Embeddings and Elastic Search"
date: "2024-04-01"
---

# How To implement Semantic Search Using Open AI Embeddings and Elastic Search

In this tutorial we will use embeddings from Open AI to embed our data set. We
will learn how to use cosine search to find similarities in our data. Then we
will speed up our process of searching by using elastic search to index our
data.

### First we set up a virtual environment

```python
python3 -m venv venv
source venv/bin/activate
pip install pandas numpy openai elasticsearch
```

### Load data using pandas

First we want to be able to load a csv of whatever you would like into a python
varaiable

```python
import pandas as pd
import numpy as np

df = pd.read_csv("/Users/jesseleonard/Downloads/AG_news_samples.csv")
df = df.head(1000)
```

```python
>>> df.head(5)
                                               title                                        description  label_int     label
0                                    World Briefings  BRITAIN: BLAIR WARNS OF CLIMATE THREAT Prime M...          1     World
1  Nvidia Puts a Firewall on a Motherboard (PC Wo...  PC World - Upcoming chip set will include buil...          4  Sci/Tech
2                Olympic joy in Greek, Chinese press  Newspapers in Greece reflect a mixture of exhi...          2    Sports
3                          U2 Can iPod with Pictures  SAN JOSE, Calif. -- Apple Computer (Quote, Cha...          4  Sci/Tech
4                                  The Dream Factory  Any product, any shape, any size -- manufactur...          4  Sci/Tech
```

### Apply Embeddings by Calling Open AI client

Now we want to use the open ai client to embed our data. We will use the
text-embedding-3-small model to embed our data. The second to last line will
apply the get embeddigns1 function to every row in the dataframe. This will take
a while so we are just going to do it with a small data set of 100 rows.
The last line will save the dataframe to a csv file.

```python
from openai import OpenAI

client = OpenAI(
  max_retries=5,
)

def get_embedding(text: str, model="text-embedding-3-small", **kwargs):
    # replace newlines, which can negatively affect performance.
    text = text.replace("\n", " ")
    response = client.embeddings.create(input=[text], model=model, **kwargs)
    print("embedding received")
    return response.data[0].embedding


df["embedding"] = df["title"].apply(lambda x: get_embedding(x))
df.to_csv("word_embeddings.csv")
```

### Create a Search Term & Embed it

Now we want to create a search term and embed it using the same model as before.

```python
search_term = "stock market crash"
search_term_vector = get_embedding(search_term)
```

### Prepare the data for cosine similarity

We need to prepare the data by running this numpy function to prep the data before applying cosine
search.

```python
df = pd.read_csv("word_embeddings.csv")
df["embedding"] = df["embedding"].apply(eval).apply(np.array)
```

### Apply search term cosine similarities

This applies cosine similarity between search term and every item in dataframe and places it in the similarities row. Then writes this file to csv

```python
def cosine_similarity(a, b):
      return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

df["similarities"] = df["embedding"].apply(
    lambda x: cosine_similarity(x, search_term_vector)
)
df = df.sort_values("similarities", ascending=False).head(20)
df.to_csv("similarities.csv")
```

Our problem is that this takes a long time to run these calculations just using the pandas library. We can speed up this process by using elastic search to
index our data.

### Set up Elasticsearch with docker

```
docker network create elastic
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.12.2
docker run --name es01 --net elastic -p 9200:9200 -it -m 1GB docker.elastic.co/elasticsearch/elasticsearch:8.12.2
```

# Set up elasticsearch client

```python
password = "elasticsearch_password"
ssl_assert_fingerprint = "fingerprint"
es = Elasticsearch(
  "http://localhost:9200",
  basic_auth=("elastic", password),
  ssl_assert_fingerprint=ssl_assert_fingerprint,
)

index_mapping = {
  "properties": {
    "id": {
      "type": "text"
    },
    "chapter_number": {
      "type": "long"
    },
    "book_name": {
      "type": "text"
    },
    "verse_number": {
      "type": "long"
    },
    "text": {
      "type": "text"
    },
    "chapter_id": {
      "type": "text"
    },
    "version_id": {
      "type": "text"
    },
    "embedding": {
      "type": "dense_vector",
      "dims": 1536,
      "index": True,
      "similarity": "l2_norm",
    },
  }
}

es.indices.create(index="bible_verses", mappings=index_mapping)

```

### Populate Elastic search with rows from dataframe

```python
# conver dataframe to json objects
record_list = df.to_dict("records")

#print(record_list[0])

for record in record_list:
  try:
    es.index(index="bible_verses", document=record, id=record["id"])
  except Exception as e:
    print(e)

# indexes = es.count(index="bible_verses")
```

### Make a search query

```python
search_term = "What is the meaning of life"

search_term_vector = get_embedding(search_term)
query = {
  "field": "embedding",
  "query_vector": search_term_vector,
  "k": 20,
  "num_candidates": 10000,
}

res = es.knn_search(index="bible_verses", knn=query, source=["text"])

response = dict(res)["hits"][ "hits" ]
```

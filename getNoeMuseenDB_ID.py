
# coding: utf-8

# In[1]:


import requests
from lxml import html
import re

#Downloaded the Search Result of all 745 museums in Lower Austria.
with open(r'noemuseen.html', "r") as f:
    page = f.read()
    
tree = html.fromstring(page)
#Parse Div-Container with all museums
toc = tree.xpath("//div[@id='dmliste']/div")
tocText = tree.xpath("//div[@id='dmliste']/div/text()") #Location-Textstring isn't a child-element

                
i = 2 #Iterator for unstructured Locationinfo in Main-Div-Tagf

print("ID\tURL\tLocation\tName") #building output-tsv-header
for div in toc:
    #parse the necessary information (id, url, location, label)
    noemuseum_id = re.sub("dmlisteo","",div.attrib["id"])
    noemuseum_url = "https://datenbank.noemuseen.at/db/museum-detail.asp?oid="+noemuseum_id
    noemuseum_location = tocText[i].strip()
    i = i +5 #add 5 for location_iterator
    children = list(div)

    for child in children:
        
        if(child.tag=='h2'):
            granchildren = list(child)
            for granchild in granchildren:
                noemuseum_name = granchild.text
    
    print(noemuseum_id+"\t"+noemuseum_url+"\t"+noemuseum_location+"\t"+noemuseum_name)


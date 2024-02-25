from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import GroceryItem, GroceryRequest




app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173",
    "http://localhost:5173/",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
    
)






groceries = [GroceryItem(id=500, name="Bread", brand="Hy-Vee", amount=1)]





@app.get("/groceries")
async def get_groceries()-> list[GroceryItem]:
    
    print(groceries)
    
    return groceries


@app.post("/groceries")
async def add_grocery_item(item: GroceryRequest) -> GroceryItem:
    new_item: GroceryItem = {}
    if len(groceries) == 0:
        new_item = GroceryItem(id=0, name=item.name, brand=item.brand, amount=item.amount)
    else:
        new_item = GroceryItem(id=len(groceries), name=item.name, brand=item.brand, amount=item.amount)
        
    groceries.append(new_item)
    
    return new_item


@app.delete("/groceries/{id}")
async def delete_grocery_item_by_id(id: int) -> GroceryItem:
    
    for idx, item in enumerate(groceries):
        if item.id == id:
            item = item
            del groceries[idx]
            
            return item
    else:
        return HTTPException(404, f"Item with id of {id} not found")
    
    
@app.delete("/groceries")
async def delete_all_items():
    
    groceries.clear()
    
    
@app.put("/groceries/{id}")
async def update_grocery_item_by_id(id: int, updated_item: GroceryRequest) -> GroceryItem:
    for idx, item in enumerate(groceries):
        if item.id == id:
            groceries[idx] = GroceryItem(id=item.id, name=updated_item.name, amount=updated_item.amount, brand=updated_item.brand)
            
            return item
    else:
        return HTTPException(404, f"Item with id of {id} not found")
    
            
    
                    
    


@app.get("/")
async def welcome():
    return {"msg": "hello"}

    

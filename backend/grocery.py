


from typing import Annotated
from fastapi import APIRouter, Path



from fastapi import HTTPException

from model import GroceryItem, GroceryRequest
from fastapi import HTTPException, status

grocery_router = APIRouter(tags=["Grocery"])

max_id = 0
groceries = [GroceryItem(id=500, name="Bread", brand="Hy-Vee", amount=1)]



@grocery_router.get("/groceries")
async def get_groceries()-> list[GroceryItem]:
    
    
    return groceries

@grocery_router.get("/groceries/{id}")
async def get_grocery_item_by_id(id: Annotated[int, Path("This is the id of the item to get")]) -> GroceryItem:
    for item in groceries:
        if item.id == id:
            return item
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Grocery item with id = {id} not found")


@grocery_router.post("/groceries", status_code=status.HTTP_201_CREATED)
async def add_grocery_item(item: GroceryRequest) -> GroceryItem:
    global max_id
    max_id += 1
    new_item = GroceryItem(**item.model_dump(), id=max_id)
        
    groceries.append(new_item)
    
    return new_item


@grocery_router.delete("/groceries/{id}")
async def delete_grocery_item_by_id(id: Annotated[int, Path(title="ID of the item to delete")]) -> GroceryItem:
    
    for idx, item in enumerate(groceries):
        if item.id == id:
            item = item
            del groceries[idx]
            
            return item
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Item with id of {id} not found")
    
    
@grocery_router.delete("/groceries", status_code=status.HTTP_204_NO_CONTENT)
async def delete_all_items() -> None:
    
    groceries.clear()
    
    
@grocery_router.put("/groceries/{id}")
async def update_grocery_item_by_id(id: Annotated[int, Path(title="ID of the item to update")], updated_item: GroceryRequest) -> GroceryItem:
    for idx, item in enumerate(groceries):
        if item.id == id:
            groceries[idx] = GroceryItem(**updated_item.model_dump(), id=item.id)
            
            return groceries[idx]
    else:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Item with id of {id} not found")
    
            
    
                    

    

from pydantic import BaseModel

class GroceryItem(BaseModel):
    id: int
    name: str
    brand: str
    amount: int
    
class GroceryRequest(BaseModel):
    name: str
    brand: str
    amount: int
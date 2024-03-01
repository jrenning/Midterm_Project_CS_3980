from enum import Enum
from typing import Optional
from pydantic import BaseModel


class TypeEnum(str, Enum):
    TV = "TV"
    Movie = "Movie"
    Book = "Book"
    Video_Game = "Video Game"
    Other = "Other"

class Recommendation(BaseModel):
    id: int
    name: str
    type: TypeEnum
    link: Optional[str] = None
    description: Optional[str] = None
    
class RecommendationRequest(BaseModel):
    name: str
    type: TypeEnum
    link: str
    description: Optional[str] = None
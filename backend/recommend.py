from typing import Annotated
from fastapi import APIRouter, Path


from fastapi import HTTPException

from model import Recommendation, RecommendationRequest, TypeEnum
from fastapi import HTTPException, status

rec_router = APIRouter(tags=["Recommendation"])

max_id = 0
recommendations = [
    Recommendation(
        id=500,
        name="The Office",
        type=TypeEnum.TV,
        link="https://www.google.com/search?q=the+office&rlz=1C1CHBF_enUS917US917&oq=the+office&gs_lcrp=EgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyBwgBEC4YgAQyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEC4YgAQyBwgHEAAYgAQyBwgIEC4YgAQyBwgJEAAYgATSAQgxMTEzajBqN6gCALACAA&sourceid=chrome&ie=UTF-8",
    )
]


@rec_router.get("/recs")
async def get_recs() -> list[Recommendation]:

    return recommendations


@rec_router.get("/recs/{id}")
async def get_rec_by_id(
    id: Annotated[int, Path(title="This is the id of the item to get")]
) -> Recommendation:
    for item in recommendations:
        if item.id == id:
            return item
    else:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND, f"Recommendation with id = {id} not found"
        )


@rec_router.post("/recs", status_code=status.HTTP_201_CREATED)
async def add_rec(item: RecommendationRequest) -> Recommendation:
    global max_id
    max_id += 1
    new_item = Recommendation(**item.model_dump(), id=max_id)

    recommendations.append(new_item)

    return new_item


@rec_router.delete("/recs/{id}")
async def delete_rec_by_id(
    id: Annotated[int, Path(title="ID of the item to delete")]
) -> Recommendation:

    for idx, item in enumerate(recommendations):
        if item.id == id:
            item = item
            del recommendations[idx]

            return item
    else:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND, f"Item with id of {id} not found"
        )


@rec_router.delete("/recs", status_code=status.HTTP_204_NO_CONTENT)
async def delete_all_recs() -> None:

    recommendations.clear()


@rec_router.put("/recs/{id}")
async def update_rec_by_id(
    id: Annotated[int, Path(title="ID of the item to update")],
    updated_item: RecommendationRequest,
) -> Recommendation:
    for idx, item in enumerate(recommendations):
        if item.id == id:
            recommendations[idx] = Recommendation(
                **updated_item.model_dump(), id=item.id
            )

            return recommendations[idx]
    else:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND, f"Recommendation with id of {id} not found"
        )

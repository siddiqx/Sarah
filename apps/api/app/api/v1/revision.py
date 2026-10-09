from fastapi import APIRouter

router = APIRouter()


@router.get("/queue")
async def get_revision_queue():
    return {"message": "Get revision queue - to be implemented"}


@router.get("/items/{item_id}")
async def get_revision_item(item_id: str):
    return {"message": f"Get revision item {item_id} - to be implemented"}


@router.post("/items/{item_id}/complete")
async def complete_revision_item(item_id: str):
    return {"message": f"Complete revision item {item_id} - to be implemented"}

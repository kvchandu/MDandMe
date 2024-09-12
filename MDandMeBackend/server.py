from datetime import datetime
from http.client import HTTPException
from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
import uvicorn

JSON_FILE = "data.json"


class HugUpdate(BaseModel):
    post_url: str
    num_hugs: int


class CommentCreate(BaseModel):
    # post_id: str
    post_url: str
    parent_id: int
    display_name: str
    text: str


async def read_data():
    with open(JSON_FILE, "r") as f:
        return json.load(f)


async def write_data(data):
    with open(JSON_FILE, "w") as f:
        json.dump(data, f, indent=2)


app = FastAPI()


@app.post("/items/hug")
async def update_hug_count(hug_update: HugUpdate):
    try:
        data = await read_data()

        # Find the post and update its hug count
        for item in data:
            print(item)
            if item["post_url"] == hug_update.post_url:
                item["num_hugs"] = hug_update.num_hugs
                break
        else:
            raise HTTPException(status_code=404, detail="Post not found")

        # Write the updated data back to the file
        await write_data(data)

        return {"message": "Hug count updated successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/items")
async def get_items(
    page: int = Query(1, ge=1), items_per_page: int = Query(10, ge=1, le=100)
):
    data = await read_data()
    start_index = (page - 1) * items_per_page
    end_index = start_index + items_per_page

    paginated_data = data[start_index:end_index]

    return JSONResponse(
        {
            "items": paginated_data,
            "total_items": len(data),
            "page": page,
            "items_per_page": items_per_page,
        }
    )


@app.get("/get-post")
async def get_post(post_url: str):
    print("POST URL", post_url)
    data = await read_data()
    for item in data:

        if item["post_url"] == post_url:
            print(item)
            return item


@app.post("/add-comment")
async def add_comment(comment: CommentCreate):
    print("Here", comment.parent_id)
    try:
        data = await read_data()
        for item in data:
            if item["post_url"] == comment.post_url:
                if "comments" not in item:
                    item["comments"] = {}
                new_comment_id = (
                    max([int(k) for k in item["comments"].keys()] + [0]) + 1
                )
                item["comments"][str(new_comment_id)] = {
                    "id": new_comment_id,
                    "parent_id": None if comment.parent_id == 0 else comment.parent_id,
                    "display_name": comment.display_name,
                    "text": comment.text,
                    "created_at": datetime.now().isoformat(),
                }
                await write_data(data)
                return {
                    "message": "Comment added successfully",
                    "comment_id": new_comment_id,
                }
        raise HTTPException(status_code=404, detail="Post not found")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

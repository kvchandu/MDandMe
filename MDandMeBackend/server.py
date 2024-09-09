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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

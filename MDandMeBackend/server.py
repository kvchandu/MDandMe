from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
import json
import uvicorn

app = FastAPI()

# Load data from JSON file
with open("data.json", "r") as f:
    data = json.load(f)


@app.get("/items")
async def get_items(
    page: int = Query(1, ge=1), items_per_page: int = Query(10, ge=1, le=100)
):
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

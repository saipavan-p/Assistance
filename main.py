from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from assistance import generate_response  # Ensure this imports correctly

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Static values for wa_id and name
WA_ID = "123"
NAME = "user"

@app.get("/", response_class=HTMLResponse)
async def get_form(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/response", response_class=JSONResponse)
async def post_form(message_body: str = Form(...)):
    response = generate_response(message_body, WA_ID, NAME)
    return JSONResponse(content={"message": response})

import os
from urllib.parse import unquote

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .db import Base, engine, get_db, SessionLocal
from .seed import seed_defaults

Base.metadata.create_all(bind=engine)

with SessionLocal() as initial_db:
    seed_defaults(initial_db)

app = FastAPI(title="Netsoft CMS API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEFAULTS = {
    "hero": {"title": "", "subtitle": "", "badge": "", "ctaText": "", "ctaHref": "", "phone": ""},
    "about": {"title": "", "description": "", "location": ""},
    "contact": {"title": "", "address": "", "phone": "", "email": ""},
}


@app.get("/api/content", response_model=schemas.HomePayload)
def get_content(db: Session = Depends(get_db)):
    return schemas.HomePayload(
        hero=crud.get_section(db, "hero", DEFAULTS["hero"]),
        about=crud.get_section(db, "about", DEFAULTS["about"]),
        contact=crud.get_section(db, "contact", DEFAULTS["contact"]),
        courses=db.query(models.Course).order_by(models.Course.id.desc()).all(),
        gallery=db.query(models.GalleryImage).order_by(models.GalleryImage.id.desc()).all(),
    )


@app.put("/api/sections/{section}", response_model=schemas.SectionPayload)
def update_section(section: str, payload: schemas.SectionPayload, db: Session = Depends(get_db)):
    if section not in DEFAULTS:
        raise HTTPException(status_code=404, detail="Unknown section")
    updated = crud.upsert_section(db, section, payload.content)
    return schemas.SectionPayload(content=updated)


@app.post("/api/courses", response_model=schemas.CourseOut)
def create_course(payload: schemas.CourseCreate, db: Session = Depends(get_db)):
    row = models.Course(**payload.model_dump())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@app.delete("/api/courses/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    row = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(row)
    db.commit()
    return {"ok": True}


@app.delete("/api/gallery/{image_id}")
def delete_gallery_item(image_id: int, db: Session = Depends(get_db)):
    row = db.query(models.GalleryImage).filter(models.GalleryImage.id == image_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Image not found")
    db.delete(row)
    db.commit()
    return {"ok": True}


@app.get("/media/{file_name:path}")
def media_file(file_name: str):
    images_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "images"))
    decoded = unquote(file_name)
    file_path = os.path.abspath(os.path.join(images_dir, decoded))
    if not file_path.startswith(images_dir):
        raise HTTPException(status_code=400, detail="Invalid path")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Not found")
    return FileResponse(file_path)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/branding/logo")
def branding_logo():
    logo_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "netsoft.jpeg"))
    if not os.path.exists(logo_path):
        raise HTTPException(status_code=404, detail="Logo not found")
    return FileResponse(logo_path)

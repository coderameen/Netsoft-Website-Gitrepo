from typing import Any

from pydantic import BaseModel


class SectionPayload(BaseModel):
    content: dict[str, Any]


class CourseBase(BaseModel):
    title: str
    category: str
    description: str = ""


class CourseCreate(CourseBase):
    pass


class CourseOut(CourseBase):
    id: int

    class Config:
        from_attributes = True


class GalleryImageBase(BaseModel):
    title: str
    image_url: str


class GalleryImageCreate(GalleryImageBase):
    pass


class GalleryImageOut(GalleryImageBase):
    id: int

    class Config:
        from_attributes = True


class HomePayload(BaseModel):
    hero: dict[str, Any]
    about: dict[str, Any]
    contact: dict[str, Any]
    courses: list[CourseOut]
    gallery: list[GalleryImageOut]

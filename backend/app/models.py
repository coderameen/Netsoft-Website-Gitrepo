from sqlalchemy import Column, Integer, String, Text

from .db import Base


class SiteContent(Base):
    __tablename__ = "site_content"

    id = Column(Integer, primary_key=True, index=True)
    section = Column(String(100), unique=True, nullable=False, index=True)
    content_json = Column(Text, nullable=False)


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    category = Column(String(120), nullable=False)
    description = Column(Text, default="")


class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    image_url = Column(String(500), nullable=False)

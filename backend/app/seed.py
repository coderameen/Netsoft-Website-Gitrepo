import os

from sqlalchemy.orm import Session

from .crud import upsert_section
from .models import Course, GalleryImage


def seed_defaults(db: Session):
    upsert_section(
        db,
        "hero",
        {
            "badge": "NeTSOFT IT Computer Education",
            "title": "Enhance your excellence skills",
            "subtitle": "Professional training institute in Chitradurga focused on practical IT and programming education.",
            "ctaText": "Contact Us",
            "ctaHref": "#contact",
            "phone": "9916574927",
        },
    )
    upsert_section(
        db,
        "about",
        {
            "title": "About Netsoft",
            "description": "Netsoft IT Computer Education aims to enhance student skills through hands-on training in trending tools and technologies.",
            "location": "Beside Neelankanteshwara Temple, Chitradurga, Karnataka",
        },
    )
    upsert_section(
        db,
        "contact",
        {
            "title": "Contact Us",
            "address": "Beside Neelankanteshwara Temple, Chitradurga-577501, Karnataka, India",
            "phone": "9916574927",
            "email": "netsofteducation@yahoo.co.in",
        },
    )

    if db.query(Course).count() == 0:
        db.add_all(
            [
                Course(title="Basic Computer", category="IT Courses", description="Computer fundamentals and office tools."),
                Course(title="Tally & GST", category="IT Courses", description="Accounting workflow with GST practice."),
                Course(title="Python", category="Programming", description="Python fundamentals to web development."),
                Course(title="Full Stack Web Development", category="Development", description="Frontend and backend project-based learning."),
                Course(title="Spoken English", category="IT Courses", description="Communication skill improvement for students."),
            ]
        )

    if db.query(GalleryImage).count() == 0:
        images_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "images"))
        if os.path.isdir(images_dir):
            for file_name in sorted(os.listdir(images_dir))[:12]:
                if file_name.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
                    db.add(
                        GalleryImage(
                            title="Netsoft Gallery",
                            image_url=f"/media/{file_name}",
                        )
                    )
    db.commit()

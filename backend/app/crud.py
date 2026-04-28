import json

from sqlalchemy.orm import Session

from . import models


def get_section(db: Session, section: str, default: dict) -> dict:
    row = db.query(models.SiteContent).filter(models.SiteContent.section == section).first()
    if not row:
        return default
    return json.loads(row.content_json)


def upsert_section(db: Session, section: str, content: dict) -> dict:
    row = db.query(models.SiteContent).filter(models.SiteContent.section == section).first()
    payload = json.dumps(content)
    if row:
        row.content_json = payload
    else:
        row = models.SiteContent(section=section, content_json=payload)
        db.add(row)
    db.commit()
    db.refresh(row)
    return json.loads(row.content_json)

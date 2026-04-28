# Netsoft Website (FastAPI + Next.js)

Modern training institute website with an admin panel.

## Stack
- Backend: FastAPI + SQLite
- Frontend: Next.js (App Router, TypeScript)
- CMS: Admin panel at `/admin` to manage website content

## Features
- Professional landing page with AI-inspired visual style
- Dynamic sections: Hero, About, Contact
- Course management (add/delete)
- Gallery management (add/delete)
- Local image serving from `images` folder via backend `/media/*`

## Run backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

Backend runs on `http://localhost:8000`.

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Admin usage
- Open `http://localhost:3000/admin`
- Edit Hero, About, Contact and click save
- Add or delete courses
- Add gallery items using local image path like:
  - `/media/WhatsApp Image 2026-04-27 at 12.46.46.jpeg`

## Reference content sources
- Netsoft content inspired by: [HOME | Mysite](https://mail2ameenjnn.wixsite.com/netsoft)
- UI inspiration: [Dribbble shot](https://dribbble.com/shots/27263764-SAIA-Information-Hub-Website-for-Medical-Intern?utm_source=Clipboard_Shot&utm_campaign=uxshahid&utm_content=SAIA%20%E2%80%93%20Information%20Hub%20Website%20for%20Medical%20Intern&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=uxshahid&utm_content=SAIA%20%E2%80%93%20Information%20Hub%20Website%20for%20Medical%20Intern&utm_medium=Social_Share)

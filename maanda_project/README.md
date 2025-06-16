
# Maanda Project

🌍 **Maanda Project** is a modular Django platform featuring multiple apps to manage ETL processes, invoicing, budgeting, inventory, job tracking, and learner analytics — designed to help businesses handle data, finance, and workflows seamlessly.

---

## Project Overview

This project consists of Two main applications:

| App Name                  | Description                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------------------|
| **ETL App**               | Extracts, cleans, validates, and loads Excel data into a structured database format.              |
| **Invoice System**        | Handles invoice creation, management, and tracking of billing.                                   |


---

## Features

- **Modular design:** Each app is independent yet integrates seamlessly.
- **Robust data handling:** ETL processes ensure clean, validated data in the database.
- **User-friendly dashboards:** Real-time reporting and data visualization.
- **Role-based access:** Secure login with user roles for admins, auditors, and staff.
- **Docker support:** Easy containerized deployment for consistent environments.

---

## Getting Started

### Prerequisites

- Python 3.10+
- PostgreSQL database
- Docker (optional, recommended for easy setup)
- Node.js and npm (if you use front-end build tools)
- Virtual environment tool (e.g., `venv` or `virtualenv`)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/maanda_project.git
cd maanda_project
```

2. **Create and activate a virtual environment**

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

3. **Install dependencies**

```bash
pip install -r requirements.txt
```

4. **Set up environment variables**

Create a `.env` file in the project root:

```
SECRET_KEY=your-secret-key
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
```

5. **Run migrations**

```bash
python manage.py makemigrations
python manage.py migrate
```

6. **Run the development server**

```bash
python manage.py runserver
```

---

## Using Docker (Optional)

You can run the project using Docker with the provided `docker-compose.yml`.

```bash
docker-compose up --build
```

This will build and start the web and database containers.

---

## Project Structure

```
maanda_project/
├── etl_app/                 # ETL application
├── invoice_app/             # Invoice System
├── maanda_project/          # Main project settings and urls
├── static/                  # Static files (CSS, JS, images)
├── templates/               # Global templates
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
```

---

## How It Works

- **ETL App:** Upload Excel files through the web interface, which are validated and transformed into database records.
- **Invoice System:** Generate and manage invoices, view history, and track payments.


---

## Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and submit a pull request.

---


## Contact
 MaandaMufamadi@gmail.com
Project Link: 

---

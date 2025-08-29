# Budget Dashboard App

A Django-based web app to upload budget and expenditure data, track allocations vs actual spend, visualize trends, and forecast upcoming quarters with interactive charts.

## Features

- Upload Excel files containing:
  - Departments
  - Projects
  - Budget lines (year, quarter, allocated amount)
  - Expenditures (date, amount, description)
  - Location for File(File Upload)
- View dashboard with:
  - Allocated vs spent per department, year, and quarter
  - Remaining budget calculation
- Interactive charts:
  - Yearly trend of allocated vs spent
  - Pie chart of spent by department
  - Forecast of next quarter spend per department
- Filter dashboard by year, quarter, and department
- AJAX support for dynamic chart updates
- Responsive UI with Bootstrap 5
- CSRF protection and secure POST requests for Excel upload

## Requirements

- Python 3.8+
- Django 4.x+
- openpyxl (`pip install openpyxl`)
- Bootstrap 5 (loaded via static files or CDN)

## Installation

1. Clone the repo and navigate into it:

   ```bash
   git clone <repo-url>
   cd budget-dashboard-app
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:

   ```bash
   python manage.py migrate
   ```

5. Run the development server:

   ```bash
   python manage.py runserver
   ```

6. Open `http://localhost:8000/dashboard/` in your browser.

## Usage

- Navigate to the **Dashboard** page to view allocations vs spend.  
- Use filters to select year, quarter, or department.  
- Upload Excel files via the **Upload Data** page:
  - Upload departments, projects, budget lines, and expenditures.
  - Validation ensures no duplicates or invalid data.
- Charts update dynamically via AJAX for filtered data.
- Forecast chart predicts next quarter spend per department and highlights potential overspending risks.

## Important Files

- `templates/dashboard.html` — Main dashboard with filters and charts.
- `templates/upload_excel.html` — Page for uploading Excel files.
- `views.py` — Contains views for dashboard, summaries, project-level data, and Excel upload.
- `models.py` — Contains `Department`, `Project`, `BudgetLine`, `Expenditure`.
- `static/js/dashboard.js` — JavaScript handling AJAX filtering and chart updates.

## Customization

- Modify `dashboard.html` to change layout or add new charts.  
- Extend forecast logic in `dashboard_view` to use advanced ML models.  
- Adjust Excel template sheets to match your data format.

## Troubleshooting

- **CSRF Errors**: Ensure CSRF token is present and included in POST requests.  
- **Excel Upload Issues**: Ensure the uploaded file has correct sheets (`Departments`, `Projects`, `BudgetLines`, `Expenditures`) and no duplicates.  
- **Chart Rendering Issues**: Verify AJAX requests return valid JSON and chart libraries are loaded.  
- Use browser dev tools (Console & Network) and Django logs for debugging.


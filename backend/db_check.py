from app.database import SessionLocal
from app.models import Employee

db = SessionLocal()
employees = db.query(Employee).all()
print(f"Total Employees: {len(employees)}")
for emp in employees:
    print(f"ID: {emp.employee_id}, Name: {emp.full_name}")

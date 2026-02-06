from app.database import SessionLocal
from app.models import Employee

db = SessionLocal()
emp = db.query(Employee).filter(Employee.employee_id == '02 ').first()
if emp:
    print(f"Found employee: '{emp.employee_id}'")
    emp.employee_id = '02'
    db.commit()
    print("Fixed to '02'")
else:
    print("Employee '02 ' not found (maybe already fixed)")

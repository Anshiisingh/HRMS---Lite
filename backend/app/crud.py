from sqlalchemy.orm import Session
from . import models, schemas
from datetime import date

# Employee CRUD
def get_employee(db: Session, employee_id: str):
    return db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()

def get_employee_by_email(db: Session, email: str):
    return db.query(models.Employee).filter(models.Employee.email == email).first()

def get_employees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Employee).offset(skip).limit(limit).all()

def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def delete_employee(db: Session, employee_id: str):
    db_employee = db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()
    if db_employee:
        db.delete(db_employee)
        db.commit()
    return db_employee

# Attendance CRUD
def create_attendance(db: Session, attendance: schemas.AttendanceCreate):
    db_attendance = models.Attendance(
        employee_id=attendance.employee_id,
        date=attendance.date,
        status=attendance.status
    )
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

def get_attendance(db: Session, employee_id: str):
    return db.query(models.Attendance).filter(models.Attendance.employee_id == employee_id).all()

def get_attendance_by_date(db: Session, employee_id: str, date: date):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.date == date
    ).first()

def get_dashboard_stats(db: Session):
    today = date.today()
    total_employees = db.query(models.Employee).count()
    total_present = db.query(models.Attendance).filter(
        models.Attendance.date == today, 
        models.Attendance.status == 'Present'
    ).count()
    # Absent logic: Either explicitly marked absent, 
    # OR we can just say "Absent today" = explicitly marked Absent for simplicity.
    # Requirement: "Simulate a basic internal HR tool". 
    # Let's count explicitly marked absent for now, or we can do total_employees - total_present?
    # Usually HRMS marks absent if not present, but let's stick to explicit records first.
    # Actually, a better metric for "Absent" in a dashboard might be explicit absentees. 
    # Let's count explicit 'Absent' status.
    total_absent = db.query(models.Attendance).filter(
        models.Attendance.date == today,
        models.Attendance.status == 'Absent'
    ).count()
    
    return {
        "total_employees": total_employees,
        "total_present": total_present,
        "total_absent": total_absent
    }

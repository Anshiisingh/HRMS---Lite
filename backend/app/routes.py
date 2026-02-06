from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from . import crud, models, schemas
from .database import get_db

router = APIRouter()

# --- Employee Endpoints ---

@router.post("/employees", response_model=schemas.Employee, status_code=status.HTTP_201_CREATED)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    db_employee = crud.get_employee(db, employee_id=employee.employee_id)
    if db_employee:
        raise HTTPException(status_code=400, detail="Employee with this ID already exists")
    
    db_employee_email = crud.get_employee_by_email(db, email=employee.email)
    if db_employee_email:
        raise HTTPException(status_code=400, detail="Employee with this email already exists")
        
    return crud.create_employee(db=db, employee=employee)

@router.get("/employees", response_model=List[schemas.Employee])
def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    employees = crud.get_employees(db, skip=skip, limit=limit)
    return employees

@router.delete("/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    db_employee = crud.get_employee(db, employee_id=employee_id)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    crud.delete_employee(db=db, employee_id=employee_id)
    return None

# --- Attendance Endpoints ---

@router.post("/attendance", response_model=schemas.Attendance, status_code=status.HTTP_201_CREATED)
def create_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    # Check if employee exists
    db_employee = crud.get_employee(db, employee_id=attendance.employee_id)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Check if attendance already marked for this date
    db_attendance = crud.get_attendance_by_date(db, employee_id=attendance.employee_id, date=attendance.date)
    if db_attendance:
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")

    return crud.create_attendance(db=db, attendance=attendance)

@router.get("/attendance/{employee_id}", response_model=List[schemas.Attendance])
def read_attendance(employee_id: str, db: Session = Depends(get_db)):
    db_employee = crud.get_employee(db, employee_id=employee_id)
    if not db_employee:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    return crud.get_attendance(db, employee_id=employee_id)

@router.get("/dashboard", response_model=schemas.DashboardStats)
def read_dashboard_stats(db: Session = Depends(get_db)):
    return crud.get_dashboard_stats(db)

from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
from datetime import date

# Employee Schemas
class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeCreate(EmployeeBase):
    @field_validator('employee_id')
    def strip_whitespace(cls, v):
        return v.strip()


class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True

# Attendance Schemas
class AttendanceBase(BaseModel):
    employee_id: str
    date: date
    status: str # "Present" or "Absent"

class AttendanceCreate(AttendanceBase):
    pass

class Attendance(AttendanceBase):
    id: int

    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_employees: int
    total_present: int
    total_absent: int

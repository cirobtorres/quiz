from typing import TypedDict
from datetime import datetime


class QuizUser(TypedDict):
    id: int
    username: str
    score_user: list[int]
    avatar: str
    is_active: bool
    is_staff: bool
    is_superuser: bool
    last_login: datetime
    created_at: datetime
    updated_at: datetime

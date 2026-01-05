from typing import Optional

# Line 31 fix - use Optional[str] and forward reference
def __init__(self, ..., field_name: Optional[str] = None, user: Optional["User"] = None):
    # ...existing code...

# Lines 51 and 53 fix - use Optional[str] and forward reference
def __init__(self, ..., field_name: Optional[str] = None, user: Optional["User"] = None):
    # ...existing code...
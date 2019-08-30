from flask_admin.contrib.sqla import ModelView

from flask_security import current_user

from src import admin, db

from src.user.models import User, Device, UserDevice, Role, UserRole


class MyModel(ModelView):
    page_size = 100
    can_set_page_size = True
    can_view_details = True

    def is_accessible(self):
        return current_user.has_role('admin')


admin.add_view(MyModel(User, session=db.session))
admin.add_view(MyModel(Role, session=db.session))
admin.add_view(MyModel(UserRole, session=db.session))
admin.add_view(MyModel(Device, session=db.session))
admin.add_view(MyModel(UserDevice, session=db.session))

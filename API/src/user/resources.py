from flask_security import current_user

from src.utils import ModelResource, operators as ops
from .models import Device, User, Rider, Group, Role
from .schemas import UserSchema, DeviceSchema, RiderSchema, GroupSchema, RoleSchema

class RoleResource(ModelResource):
    model = Role
    schema = RoleSchema

    auth_required = True

    optional = ()


    filters ={
        'name': [ops.Equal, ops.Contains],
        'id': [ops.Equal,ops.In],
    }


    related_resource={}

    order_by = ['id', 'name']

    export = True

    default_limit = 25

    max_export_limit = 5000

    export_columns = ('name', 'description', 'users')

    exclude = ('exteral_identity', 'description')

    def has_read_permission(self, qs):
        return qs

    def has_change_permission(self, obj):
        return True

    def has_delete_permission(self, obj):
        return True

    def has_add_permission(self, objects):
        return True


class GroupResource(ModelResource):
    model = Group
    schema = GroupSchema

    auth_required = True

    roles_accepted = ('admin', 'owner', 'staff')

    optional = ()

    exclude = ('updated_on', 'created_on')

    filters = {
        'name': [ops.Equal, ops.Contains],
        #'active': [ops.Boolean],
        'id': [ops.Equal],
    }

    related_resource = {
    }

    order_by = ['id', 'name']


    def has_read_permission(self, qs):
        return qs

    def has_change_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        elif current_user.has_role('staff'):
            if current_user.id == obj.id:
                return True
        return False

    def has_delete_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        return False

    def has_add_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        return False




class DeviceResource(ModelResource):
    model = Device
    schema = DeviceSchema

    auth_required = True

    roles_accepted = ('admin', 'owner', 'staff')

    optional = ()

    exclude = ('updated_on', 'created_on')

    filters = {
        'name': [ops.Equal, ops.Contains],
        'active': [ops.Boolean],
        'id': [ops.Equal],
    }

    related_resource = {

    }

    order_by = ['id', 'name']


    def has_read_permission(self, qs):
        return qs

    def has_change_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        elif current_user.has_role('staff'):
            if current_user.id == obj.id:
                return True
        return False

    def has_delete_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        return False

    def has_add_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            if current_user.brand_id == obj.brand_id:
                return True
        return False




class RiderResource(ModelResource):
    model = Rider
    schema = RiderSchema

    auth_required = True

    optional = ('current_login_at', 'current_login_ip', 'created_on', 'last_login_at', 'last_login_ip', 
                'login_count', 'confirmed_at', 'permissions', 'company_name')

    exclude = ()

    filters = {
#       'username': [ops.Equal, ops.Contains],
#        'name': [ops.Equal, ops.Contains],
        'active': [ops.Boolean],
        'id': [ops.Equal],
        'first_name': [ops.Equal, ops.StartsWith],

    }

    related_resource={

    }

    order_by = ['email', 'id', 'first_name']

    only = ()


    def has_read_permission(self, qs):
        return qs

    def has_change_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        elif current_user.has_role('staff'):
            if current_user.id == obj.id:
                return True
        return False

    def has_delete_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        return False

    def has_add_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        return False


class UserResource(ModelResource):
    model = User
    schema = UserSchema

    auth_required = True

    roles_accepted = ('admin', 'owner', 'staff')

    optional = ('stores', 'current_login_at', 'current_login_ip', 'created_on', 'fixed_dues', 'subscriptions',
                'last_login_at', 'last_login_ip', 'login_count', 'confirmed_at', 'permissions', 'retail_brand')

    exclude = ('password', 'roles', 'active')

    filters = {
        'username': [ops.Equal, ops.Contains],
        'name': [ops.Equal, ops.Contains],
        'active': [ops.Boolean],
        'id': [ops.Equal],
        'first_name': [ops.Equal, ops.StartsWith],
        'created_on': [ops.DateGreaterEqual, ops.Contains],
        'active': [ops.Boolean],


    }

    export_columns = ('id', 'name', 'mobile_number', 'email')

    related_resource = {

    }

    order_by = ['email', 'id', 'first_name']

    only = ()

    def has_read_permission(self, qs):
        return qs

    def has_change_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        elif current_user.has_role('staff'):
            if current_user.id == obj.id:
                return True
        return False

    def has_delete_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        return False

    def has_add_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            return True
        return False

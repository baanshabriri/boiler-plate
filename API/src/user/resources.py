from flask_security import current_user

from src.utils import ModelResource, operators as ops
from .models import Device, User, Rider
from .schemas import User, UserSchema, DeviceSchema, RiderSchema


class DeviceResource(ModelResource):
    model = Device
    schema = DeviceSchema

    auth_required = True

    roles_accepted = ('admin', 'owner', 'staff')

    optional = ()

    exclude = ()

    filters = {
        'name': [ops.Equal, ops.Contains],
        'active': [ops.Boolean],
        'id': [ops.Equal],
    }

    related_resource = {

    }

    order_by = ['id', 'name']


    def has_read_permission(self, qs):
        return qs.filter(Device.id == current_user.id)

    def has_change_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            if current_user.brand_id == obj.brand_id:
                return True
        elif current_user.has_role('staff'):
            if current_user.id == obj.id:
                return True
        return False

    def has_delete_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            if current_user.brand_id == obj.brand_id:
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
        'name': [ops.Equal, ops.Contains],
        'active': [ops.Boolean],
        'id': [ops.Equal],
        'first_name': [ops.Equal, ops.StartsWith],

    }

    related_resource={

    }

    order_by = ['email', 'id', 'first_name']

    only = ()


    def has_read_permission(self, qs):
        return qs.filter(Rider.id == current_user.id)

    def has_change_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            if current_user.brand_id == obj.brand_id:
                return True
        elif current_user.has_role('staff'):
            if current_user.id == obj.id:
                return True
        return False

    def has_delete_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            if current_user.brand_id == obj.brand_id:
                return True
        return False

    def has_add_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            if current_user.brand_id == obj.brand_id:
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

    }

    related_resource = {

    }

    order_by = ['email', 'id', 'first_name']

    only = ()

    def has_read_permission(self, qs):
        return qs.filter(User.id == current_user.id)

    def has_change_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            if current_user.brand_id == obj.brand_id:
                return True
        elif current_user.has_role('staff'):
            if current_user.id == obj.id:
                return True
        return False

    def has_delete_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            if current_user.brand_id == obj.brand_id:
                return True
        return False

    def has_add_permission(self, obj):
        if current_user.has_role('admin') or current_user.has_role('owner'):
            if current_user.brand_id == obj.brand_id:
                return True
        return False

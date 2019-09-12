from src import ma, BaseSchema
from .models import User, Role, UserRole, Device, UserDevice, Rider, RiderDevice, Group, DeviceGroup



class GroupSchema(BaseSchema):
    class Meta:
        model=Group
        #exclude=('updated_on', 'created_on')

    id = ma.Integer(dump_only=True)
    name = ma.String(Load=True)
    devices = ma.Nested('DeviceSchema', unique=True, dump_only=True, only=('id','name'))


class DeviceGroup(BaseSchema):
    class Meta:
        model=DeviceGroup
        #exclude=('updated_on','created_on')
    
    id = ma.UUID(Load=True)
    group_id = ma.UUID(Load=True)
    device_id = ma.UUID(Load=True)
    group = ma.Nested('GroupSchema', many=False)
    device = ma.Nested('DeviceSchema', many=False)



class DeviceSchema(BaseSchema):
    class Meta:
        model = Device
        exclude = ('updated_on', 'created_on')

    id = ma.Integer(dump_only=True)
    name = ma.String(Load=True)
    users = ma.Nested('UserSchema', unique=True, dump_only=True, only=('id', 'first_name'))
    riders = ma.Nested('RiderSchema', unique=True, dump_only=True, only=('id', 'first_name'))
    groups = ma.Nested('GroupSchema', unique=True, dump_only=True, only=('id', 'name'))




class RiderSchema(BaseSchema):
    class Meta:
        model = Rider
        #exclude = ('updated_on')

    id = ma.Integer(dump_only=True)
    email = ma.Email(required=False)
    first_name = ma.String(Load=True)
    devices = ma.Nested('DeviceSchema', many=False, dump_only=True, only=('id', 'name'))
    dues = ma.Integer(dump_only=True)


class RiderDeviceScehma(BaseSchema):
    class Meta:
        model = RiderDevice
        #exclude = ()
    id = ma.UUID(Load=True)
    rider_id = ma.UUID(Load=True)
    device_id = ma.UUID(Load=True)
    rider = ma.Nested('RiderSchema', many=False)
    device = ma.Nested('DeviceSchema', many=False)


class UserSchema(BaseSchema):
    class Meta:
        model = User
        exclude = ('updated_on', 'my_payments', 'my_dues')

    id = ma.Integer(dump_only=True)
    email = ma.Email(required=False)
    # username = ma.String(required=True)
    first_name = ma.String(load=True)
    roles = ma.Nested('RoleSchema', many=True, dump_only=True, only=('id', 'name'))
    devices = ma.Nested('DeviceSchema', many=True, dump_only=True, only=('id', 'name'))
    fixed_dues = ma.Integer(dump_only=True)
    subscriptions = ma.Integer(dump_only=True)


class RoleSchema(BaseSchema):
    class Meta:
        model = Role
        exclude = ('updated_on', 'created_on', 'users')

    id = ma.UUID()
    name = ma.String()
    permissions = ma.Nested('PermissionSchema', many=True, dump_only=True, only=('id', 'name'))


class UserRoleSchema(BaseSchema):
    class Meta:
        model = UserRole
        exclude = ('created_on', 'updated_on')

    id = ma.UUID(load=True)
    user_id = ma.UUID(load=True)
    role_id = ma.UUID(load=True)
    user = ma.Nested('UserSchema', many=False)
    role = ma.Nested('RoleSchema', many=False)


class UserDeviceSchema(BaseSchema):
    class Meta:
        model = UserDevice
        #exclude = ('created_on', 'updated_on')

    id = ma.UUID(Load=True)
    user_id = ma.UUID(Load=True)
    device_id = ma.UUID(Load=True)
    user = ma.Nested('UserSchema', many=False)
    device = ma.Nested('DeviceSchema', many=False)

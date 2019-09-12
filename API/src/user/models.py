from flask_login import current_user
from flask_security import RoleMixin, UserMixin
from sqlalchemy import UniqueConstraint, func
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method

from src import db, ReprMixin, BaseMixin
from datetime import datetime


class UserRole(BaseMixin, db.Model):
    user_id = db.Column(db.ForeignKey('user.id', ondelete='CASCADE'), index=True)
    role_id = db.Column(db.ForeignKey('role.id', ondelete='CASCADE'), index=True)

    user = db.relationship('User', foreign_keys=[user_id])
    role = db.relationship('Role', foreign_keys=[role_id])

    UniqueConstraint(user_id, role_id)


class UserDevice(BaseMixin, db.Model):
    user_id = db.Column(db.ForeignKey('user.id', ondelete='CASCADE'), index=True)
    device_id = db.Column(db.ForeignKey('device.id', ondelete='CASCADE'), index=True)

    user = db.relationship('User', foreign_keys=[user_id])
    device = db.relationship('Device', foreign_keys=[device_id])

    UniqueConstraint(user_id, device_id)


class Role(BaseMixin, RoleMixin, ReprMixin, db.Model):
    name = db.Column(db.String(80), unique=True, index=True)
    description = db.Column(db.String(255))
    is_hidden = db.Column(db.Boolean(), default=False, index=True)

    users = db.relationship('User', back_populates='roles', secondary='user_role')


class Group(BaseMixin, RoleMixin, ReprMixin, db.Model):
    name = db.Column(db.String(80), unique=True, index=True)
    description = db.Column(db.String(255))

    devices = db.relationship('Device', back_populates='groups', secondary='device_group')


class DeviceGroup(BaseMixin, ReprMixin, db.Model):
    group_id = db.Column(db.ForeignKey('group.id', ondelete='CASCADE'), index=True)
    device_id = db.Column(db.ForeignKey('device.id', ondelete='CASCADE'), index=True)

    group = db.relationship('Group', foreign_keys=[group_id])
    device = db.relationship('Device', foreign_keys=[device_id])

    UniqueConstraint(group_id, device_id)


class Device(BaseMixin, RoleMixin, ReprMixin, db.Model):

    name = db.Column(db.String(80), unique=True, index=True)
    active = db.Column(db.Boolean(), default=False, index=True)

    users = db.relationship('User', back_populates='devices', secondary='user_device')
    riders = db.relationship('Rider', back_populates='devices', secondary='rider_device')
    groups = db.relationship('Group', back_populates='devices', secondary='device_group')


class RiderDevice(BaseMixin, db.Model):
    rider_id = db.Column(db.ForeignKey('rider.id', ondelete='CASCADE'), index=True)
    device_id = db.Column(db.ForeignKey('device.id', ondelete='CASCADE'), index=True)

    rider = db.relationship('Rider', foreign_keys=[rider_id])
    device =db.relationship('Device', foreign_keys=[device_id])

    UniqueConstraint(rider_id, device_id)


class Rider(BaseMixin, ReprMixin, UserMixin, db.Model):
    __repr_fields__ = ['id', 'first_name']
    email = db.Column(db.String(127), unique=True, nullable=True, index=True)
    password = db.Column(db.String(255), nullable=True)
    first_name = db.Column(db.String(55), nullable=False)
    last_name = db.Column(db.String(55), nullable=True)
    mobile_number = db.Column(db.String(20), unique=True, nullable=False, index=True)
    company_name = db.Column(db.String(55), nullable=True)
    counter = db.Column(db.Integer, nullable=True, default=0)

    picture = db.Column(db.Text(), nullable=True, index=True)
    active = db.Column(db.Boolean(), default=False)
    confirmed_at = db.Column(db.DateTime(), default=datetime.utcnow)
    last_login_at = db.Column(db.DateTime())
    current_login_at = db.Column(db.DateTime())

    last_login_ip = db.Column(db.String(45))
    current_login_ip = db.Column(db.String(45))
    login_count = db.Column(db.Integer)


    devices = db.relationship('Device', back_populates='riders', secondary='rider_device')


class User(BaseMixin, ReprMixin, UserMixin, db.Model):
    __repr_fields__ = ['id', 'first_name']

    email = db.Column(db.String(127), unique=True, nullable=True, index=True)
    password = db.Column(db.String(255), nullable=True)
    first_name = db.Column(db.String(55), nullable=False)
    last_name = db.Column(db.String(55), nullable=True)
    mobile_number = db.Column(db.String(20), unique=True, nullable=False, index=True)
    business_name = db.Column(db.String(55), nullable=True)
    counter = db.Column(db.Integer, nullable=True, default=0)

    picture = db.Column(db.Text(), nullable=True, index=True)
    active = db.Column(db.Boolean(), default=False)
    confirmed_at = db.Column(db.DateTime(), default=datetime.utcnow)
    last_login_at = db.Column(db.DateTime())
    current_login_at = db.Column(db.DateTime())

    last_login_ip = db.Column(db.String(45))
    current_login_ip = db.Column(db.String(45))
    login_count = db.Column(db.Integer)

    parent_id = db.Column(db.ForeignKey('user.id'), nullable=True)

    parent = db.relationship('User', foreign_keys=[parent_id], uselist=False, remote_side='User.id')
    children = db.relationship('User', remote_side='User.parent_id', lazy='dynamic',
                               order_by="User.first_name", )

    roles = db.relationship('Role', back_populates='users', secondary='user_role')
    devices = db.relationship('Device', back_populates='users', secondary='user_device')

    @hybrid_property
    def get_children_list(self):
        beginning_getter = User.query.with_entities(User.id) \
            .filter(User.id == self.id).cte(name='children_for', recursive=True)
        with_recursive = beginning_getter.union_all(
            User.query.with_entities(User.id).filter(User.parent_id == beginning_getter.c.id)
        )
        return [i[0] for i in db.session.query(with_recursive).all()]

    @hybrid_property
    def get_immediate_children_list(self):
        return [i[0] for i in self.children.with_entities(User.id).all()]

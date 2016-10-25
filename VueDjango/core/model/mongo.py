import datetime
from mongoengine import *
from VueDjango import env
from ..decorator.mongo import update_system_info

# register connection for mongoengine
connect(env.DB_CONFIG.get('mongodb').get('db')
        , host=env.DB_CONFIG.get('mongodb').get('host')
        , read_preference=True)


class UpdateDocument:
    createTime = DateTimeField(default=datetime.datetime.utcnow())
    updateTime = DateTimeField(default=datetime.datetime.utcnow())
    version = IntField(default=0)


@update_system_info.apply
class UserCredential(Document, UpdateDocument):
    password = StringField()
    encryptionKey = StringField()
    identificationID = StringField()
    remark = StringField()

    meta = {
        'collection': 'fm_user_credential',
        'indexes': [
            {'fields': ['identificationID']},
        ],
    }


@update_system_info.apply
class UserDataStore(Document, UpdateDocument):
    identificationID = StringField()
    context = StringField()
    dataID = UUIDField()

    meta = {
        'collection': 'fm_user_credential',
        'indexes': [
            {'fields': ['dataID']},
            {'fields': ['identificationID']},
        ],
    }

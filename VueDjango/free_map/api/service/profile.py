from core.model.mongo import *
from core.enum.signal import ServiceSignal
from core.tool.encryption_tools import encryp_psw


class ProfileService:
    def store_profile(self, identification_id, password, data, key):
        is_success, check_key = self.__check_identification(identification_id, password)

        if is_success:
            is_success = self.__store_data(identification_id, data, key)

            if is_success:
                return ServiceSignal.SUCCESS
            else:
                return ServiceSignal.FAILED
        else:
            return check_key

    @staticmethod
    def __check_identification(identification_id, password):
        db_record = UserCredential.objects(Q(identificationID=identification_id)).first()
        if db_record is None:
            return False, ServiceSignal.NO_FOUND

        encryption_key = db_record.encryptionKey
        db_password = db_record.password

        test_password, salt = encryp_psw(pw=password, salt=encryption_key)

        if test_password == db_password:
            return True, None
        else:
            return False, ServiceSignal.KEY_ERROR

    @staticmethod
    def __store_data(identification_id, data, key):
        db_record = UserDataStore.objects(Q(identificationID=identification_id)).first()

        if db_record is None:
            db_record = UserDataStore()
            db_record.identificationID = identification_id
            db_record.dataStore = []

        new_data = UserData()
        new_data.data = data
        new_data.key = key
        db_record.dataStore.append(new_data)

        return True

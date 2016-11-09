vessel_list = [{
    'vesselName': 'vessel One',
    'imo': '9999999',
    'mmsi': '99999999'
}]


class VesselService:
    @staticmethod
    def get_all():
        return vessel_list

    @staticmethod
    def save(data):
        vessel_list.append(data)

    @staticmethod
    def valid(data):
        if data.get('vesselName') is None or data.get('imo') is None or data.get('mmsi') is None:
            return False
        else:
            return True

    @staticmethod
    def get_by(imo=None):
        for tmp in vessel_list:
            if tmp.get('imo') == imo:
                return tmp

        return None

    def update_by(self, imo=None, data=None):
        info = self.get_by(imo=imo)
        if info is not None and data is not None:
            info.update(data)
            return True
        else:
            return False

    def delete_by(self, imo=None):
        info = self.get_by(imo=imo)
        if info is not None:
            vessel_list.remove(info)
            return True
        else:
            return False

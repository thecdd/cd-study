vessel_list = [{
    'vesselName': 'vessel One',
    'imo': '9999999',
    'mmsi': '99999999'
}]


class VesselService:
    def get_all(self):
        return vessel_list

    def save(self, data):
        vessel_list.append(data)

    def valid(self, data):
        if data.get('vesselName') is None or data.get('imo') is None or data.get('mmsi') is None:
            return False
        else:
            return True

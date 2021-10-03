from skyfield.api import load , wgs84, datetime

def model_func(year = datetime.now().year, month =  datetime.now().month, day = datetime.now().day, hour = datetime.now().hour, minute = datetime.now().minute, second = datetime.now().second):
      stations_url = ['cosmos-2251-debris.txt', 'iridium-33-debris.txt', '1999-025.txt']
      key_1 = []
      keys_2 = []
      keys_3 = []
      keys=[key_1,keys_2,keys_3]
      with open("key-c.txt", "r") as f:
            for line in f:
                  for word in line.split():
                        key_1.append(word)
      with open("key-i.txt", "r") as f:
            for line in f:
                  for word in line.split():
                        keys_2.append(word)
      with open("key-f.txt", "r") as f:
            for line in f:
                  for word in line.split():
                        keys_3.append(word)
      ts = load.timescale()
      current_time = ts.tt(year, month, day,hour,minute,second)
      my_dict1 = {}
      my_dict2 = {}
      my_dict3 = {}
      for i,file in enumerate(stations_url):
            debris = load.tle_file(file)
            print('Loaded', len(debris), 'debris : ',i+1)
            for j , deb in enumerate(debris):
                  geocentric = deb.at(current_time)
                  subpoint = wgs84.subpoint(geocentric)
                  s = [f'{subpoint.latitude.degrees}',f'{subpoint.longitude.degrees}',f'{subpoint.elevation.m}']
                  if i == 0 and  s != ["nan", "nan", "nan"]:
                        my_dict1[keys[0][j]]=s
                  if i == 1:
                        my_dict2[keys[1][j]]=s
                  if i == 2:
                        my_dict3[keys[2][j]]=s
      output = {"cosmos-2251-debris": my_dict1, "iridium-33-debris": my_dict2, "fengyun-1c": my_dict3}
      return output

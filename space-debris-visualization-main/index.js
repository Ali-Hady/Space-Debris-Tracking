// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token from your ion account

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2Mzc2MzdjNy05ZDc3LTRlM2ItYmYwMS0yMTY1Mjc2MGM1YTYiLCJpZCI6Njg5MjksInNjb3BlcyI6WyJsZ24iLCJwciIsImFjdyIsImFzbCIsImFzciIsImFzdyIsImFzcyIsImdjIiwibHIiLCJsdyIsInRyIiwidHciLCJ1c2ciXSwiaWF0IjoxNjMzMDEyMDYwLCJleHAiOjE2MzM2MTY4NjB9.hhL2YK3VKUbH2p89QkDzn5d3B0PMEP4p2ht9khzWZ5U';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer');    

function create_debris(type, name, long, lat, h) {
  let color_d = {
    "cosmos-2251-debris": Cesium.Color.WHITE, 
    "iridium-33-debris": Cesium.Color.GREEN,
    "fengyun-1c": Cesium.Color.YELLOW,
  }

  viewer.entities.add({
  type: type,
  name: name,
  position: Cesium.Cartesian3.fromDegrees(long, lat, h),
  ellipsoid: {
  radii: new Cesium.Cartesian3(45000.0, 45000.0, 90000.0),
  outline: true,
  outlineColor: color_d[type],
  outlineWidth: 2,
  material: Cesium.Color.fromRandom({ alpha: 0.5 }),
  },
  });
}

function drawDebris() {
  const getData = async () => {
  const response = await fetch('http://example.com/movies.json');
  const debrisData = await response.json(); //extract JSON from the http response
  // do something with myJson
}


//let debrisData = JSON.parse(data);

for (let key in debrisData) {
  for (let debris in debrisData[key]) {
    create_debris(key, debris, debrisData[key][debris][0], debrisData[key][debris][1], debrisData[key][debris][2]);
  }
}
}

drawDebris()


setTimeout(function() {
  viewer.entities.removeAll();
  drawDebris()
}, 10000);


//create_debris("iridium-33-debris", "random", 78, 46, 750000);


/*
viewer.entities.add({
name: "random",
position: Cesium.Cartesian3.fromDegrees(-102.0, 45.0, 750000),
ellipsoid: {
  radii: new Cesium.Cartesian3(45000.0, 45000.0, 90000.0),
  outline: true,
  outlineColor: Cesium.Color.WHITE,
  outlineWidth: 2,
  material: Cesium.Color.fromRandom({ alpha: 0.5 }),
},
});
viewer.entities.add({
position: Cesium.Cartesian3.fromDegrees(-76.0, -98.7, 750000),
ellipsoid: {
  radii: new Cesium.Cartesian3(45000.0, 45000.0, 90000.0),
  outline: true,
  outlineColor: Cesium.Color.WHITE,
  outlineWidth: 2,
  material: Cesium.Color.fromRandom({ alpha: 0.5 }),
  },
});
*/
